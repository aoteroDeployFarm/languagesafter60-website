"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Pronunciation playback via the browser's built-in speech synthesis.
 *
 * This is a first-pass implementation: no audio files, no third-party service.
 * Support varies a great deal between browsers and operating systems, so the
 * hook reports three distinct states rather than assuming success:
 *
 *   status "unsupported"  — no speechSynthesis at all; controls are disabled
 *   status "no-russian"   — synthesis works, but no ru-* voice is installed
 *   status "ready"        — a Russian voice is available
 *
 * Voices load asynchronously in most browsers, hence the voiceschanged listener.
 */

export type SpeechStatus = "checking" | "unsupported" | "no-russian" | "ready";

const RUSSIAN_LANG = "ru-RU";

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

export function useRussianSpeech() {
  const [status, setStatus] = useState<SpeechStatus>("checking");
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const synth = getSynth();
    if (!synth) {
      setStatus("unsupported");
      return;
    }

    const evaluateVoices = () => {
      const voices = synth.getVoices();
      // Some browsers report an empty list until voiceschanged fires.
      if (voices.length === 0) return;
      const russian =
        voices.find((voice) => voice.lang.replace("_", "-") === RUSSIAN_LANG) ??
        voices.find((voice) => voice.lang.toLowerCase().startsWith("ru"));
      voiceRef.current = russian ?? null;
      setStatus(russian ? "ready" : "no-russian");
    };

    evaluateVoices();
    synth.addEventListener("voiceschanged", evaluateVoices);

    // If voiceschanged never fires and the list stayed empty, stop "checking"
    // rather than leaving the controls in limbo.
    const timeout = window.setTimeout(() => {
      setStatus((current) => (current === "checking" ? "no-russian" : current));
    }, 1500);

    return () => {
      synth.removeEventListener("voiceschanged", evaluateVoices);
      window.clearTimeout(timeout);
      synth.cancel();
    };
  }, []);

  const cancel = useCallback(() => {
    const synth = getSynth();
    if (!synth) return;
    synth.cancel();
    setSpeakingId(null);
  }, []);

  const speak = useCallback((text: string, id: string) => {
    const synth = getSynth();
    if (!synth) return;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = RUSSIAN_LANG;
    if (voiceRef.current) utterance.voice = voiceRef.current;
    // Slightly under normal pace: this is a pronunciation model, not speech.
    utterance.rate = 0.85;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    synth.speak(utterance);
  }, []);

  const available = status === "ready" || status === "no-russian";

  return { status, available, speakingId, speak, cancel };
}
