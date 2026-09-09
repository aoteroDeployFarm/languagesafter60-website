"use client";

import { useEffect, useId, useState } from "react";
import type { KnowledgeCheck as Check } from "@/lib/course/types";

type KnowledgeCheckProps = {
  check: Check;
  /** Changing this resets the check — used when the learner switches lessons. */
  lessonSlug: string;
  isComplete: boolean;
  onPass: () => void;
};

type Result = "unanswered" | "correct" | "incorrect";

export function KnowledgeCheck({
  check,
  lessonSlug,
  isComplete,
  onPass,
}: KnowledgeCheckProps) {
  const groupName = useId();
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<Result>("unanswered");

  useEffect(() => {
    setSelected(null);
    setResult("unanswered");
  }, [lessonSlug]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selected) return;
    if (selected === check.correctChoiceId) {
      setResult("correct");
      onPass();
    } else {
      setResult("incorrect");
    }
  };

  return (
    <section
      aria-labelledby={`${groupName}-heading`}
      className="card border-brand-200 bg-brand-50 p-5 sm:p-6"
    >
      <p className="eyebrow">Knowledge check</p>
      <h2
        id={`${groupName}-heading`}
        className="mt-2 font-display text-xl text-ink-900"
      >
        {check.question}
      </h2>

      <form onSubmit={handleSubmit} className="mt-5">
        <fieldset>
          <legend className="sr-only">{check.question}</legend>
          <ul className="space-y-2.5">
            {check.choices.map((choice) => {
              const inputId = `${groupName}-${choice.id}`;
              const chosen = selected === choice.id;
              return (
                <li key={choice.id}>
                  <label
                    htmlFor={inputId}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border bg-surface-raised px-4 py-3 transition-colors ${
                      chosen
                        ? "border-brand-600 ring-1 ring-brand-600"
                        : "border-line hover:border-brand-400"
                    }`}
                  >
                    <input
                      type="radio"
                      id={inputId}
                      name={groupName}
                      value={choice.id}
                      checked={chosen}
                      onChange={() => {
                        setSelected(choice.id);
                        setResult("unanswered");
                      }}
                      className="size-[1.15rem] shrink-0 accent-brand-600"
                    />
                    <span lang={choice.lang} className="text-ink-900">
                      {choice.label}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!selected || result === "correct"}
          >
            Check answer
          </button>
          {result === "incorrect" ? (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setSelected(null);
                setResult("unanswered");
              }}
            >
              Try again
            </button>
          ) : null}
        </div>
      </form>

      <div aria-live="polite" className="mt-4 empty:mt-0">
        {result === "correct" ? (
          <div className="rounded-lg border border-success-700/25 bg-success-50 px-4 py-3">
            <p className="font-semibold text-success-700">
              <span aria-hidden="true">✓ </span>
              Correct — this lesson is marked complete.
            </p>
            <p className="mt-1 text-[0.97rem] text-muted-700">
              {check.explanation}
            </p>
          </div>
        ) : null}
        {result === "incorrect" ? (
          <div className="rounded-lg border border-caution-700/25 bg-caution-50 px-4 py-3">
            <p className="font-semibold text-caution-700">
              <span aria-hidden="true">↻ </span>
              Not quite — worth another listen.
            </p>
            <p className="mt-1 text-[0.97rem] text-muted-700">
              Play the phrases above once more, then try again. Getting this
              wrong costs nothing, and there is no score being kept.
            </p>
          </div>
        ) : null}
        {result === "unanswered" && isComplete ? (
          <p className="text-[0.97rem] text-muted-600">
            You have already completed this lesson. Answering again is good
            practice and will not undo your progress.
          </p>
        ) : null}
      </div>
    </section>
  );
}
