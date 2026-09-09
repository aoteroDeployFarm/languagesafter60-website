"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SpeechConfig } from "./types";

/**
 * Pronunciation playback via the browser's built-in speech synthesis.
 *
 * No audio files and no third-party service. Support varies a great deal
 * between browsers and operating systems, so the hook reports three distinct
 * states rather than assuming success:
 *
 *   status "unsupported" — no speechSynthesis at all; controls are disabled
 *   status "no-voice"    — synthesis works, but no voice for this language
 *   status "ready"       — a suitable voice is available
 *
 * Voices load asynchronously in most browsers, hence the voiceschanged listener.
 */

export type SpeechStatus = "checking" | "unsupported" | "no-voice" | "ready";

/**
 * Returns the speech synthesis API, or null when it is unusable.
 *
 * Deliberately not an `in` check: `"speechSynthesis" in window` is true even
 * when the property exists with an undefined value, which would let a null
 * reference through. Testing the value itself is the only guard that holds.
 */
function getSynth(): SpeechSynthesis | null {
  if (typeof window === "undefined") return null;
  const synth = window.speechSynthesis;
  if (!synth || typeof synth.speak !== "function") return null;
  return synth;
}

function normalise(lang: string): string {
  return lang.replace("_", "-").toLowerCase();
}

/**
 * Pick the best available voice for a course.
 *
 * The exact locale wins. Failing that, prefixes are tried in the order the
 * course declares them — which is what keeps a Cantonese `zh-HK` voice from
 * being chosen ahead of a Mandarin one for the Mandarin course.
 */
function selectVoice(
  voices: SpeechSynthesisVoice[],
  config: SpeechConfig,
): SpeechSynthesisVoice | null {
  const wanted = normalise(config.lang);
  const exact = voices.find((voice) => normalise(voice.lang) === wanted);
  if (exact) return exact;

  for (const prefix of config.voiceLangPrefixes) {
    const match = voices.find((voice) => normalise(voice.lang).startsWith(prefix));
    if (match) return match;
  }
  return null;
}

/**
 * @param config  Locale and voice preferences for this course.
 * @param rate    Speech synthesis rate. Defaults to the pace the courses have
 *                always used, so callers that do not care keep today's
 *                behaviour exactly.
 */
export function useCourseSpeech(config: SpeechConfig, rate = 0.85) {
  const [status, setStatus] = useState<SpeechStatus>("checking");
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  const { lang } = config;
  // Depend on the joined prefixes rather than the array identity, so a course
  // object rebuilt on render does not re-run voice detection endlessly.
  const prefixKey = config.voiceLangPrefixes.join(",");

  useEffect(() => {
    const synth = getSynth();
    if (!synth) {
      setStatus("unsupported");
      return;
    }

    const resolved: SpeechConfig = {
      lang,
      voiceLangPrefixes: prefixKey ? prefixKey.split(",") : [],
    };

    const evaluateVoices = () => {
      const voices = synth.getVoices();
      // Some browsers report an empty list until voiceschanged fires.
      if (voices.length === 0) return;
      const voice = selectVoice(voices, resolved);
      voiceRef.current = voice;
      setStatus(voice ? "ready" : "no-voice");
    };

    evaluateVoices();
    synth.addEventListener("voiceschanged", evaluateVoices);

    // If voiceschanged never fires and the list stayed empty, stop "checking"
    // rather than leaving the controls in limbo.
    const timeout = window.setTimeout(() => {
      setStatus((current) => (current === "checking" ? "no-voice" : current));
    }, 1500);

    return () => {
      synth.removeEventListener("voiceschanged", evaluateVoices);
      window.clearTimeout(timeout);
      // Leaving the course (or switching languages) must not leave a voice
      // talking over the next page.
      synth.cancel();
    };
  }, [lang, prefixKey]);

  const cancel = useCallback(() => {
    const synth = getSynth();
    if (!synth) return;
    synth.cancel();
    setSpeakingId(null);
  }, []);

  const speak = useCallback(
    (text: string, id: string) => {
      const synth = getSynth();
      if (!synth) return;
      // Cancel first: never let two phrases overlap.
      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      if (voiceRef.current) utterance.voice = voiceRef.current;
      // Under conversational pace: this is a pronunciation model, not speech.
      // Clamped because a rate outside this range makes synthesised voices
      // stop sounding like the language at all.
      utterance.rate = Math.min(1.2, Math.max(0.5, rate));
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);

      setSpeakingId(id);
      synth.speak(utterance);
    },
    [lang, rate],
  );

  const available = status === "ready" || status === "no-voice";

  return { status, available, speakingId, speak, cancel };
}
