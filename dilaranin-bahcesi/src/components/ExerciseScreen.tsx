import { useCallback, useEffect, useRef, useState } from "react";
import { STEP_DURATION_MS } from "../data/exerciseSteps";

type ExerciseScreenProps = { steps: readonly string[]; onComplete: () => void; onExit: () => void };

export function ExerciseScreen({ steps, onComplete, onExit }: ExerciseScreenProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const sentenceRef = useRef<HTMLHeadingElement>(null);
  const completedRef = useRef(false);
  const isLastStep = stepIndex === steps.length - 1;

  const goForward = useCallback(() => {
    if (isLastStep) {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
      return;
    }
    setStepIndex((current) => current + 1);
  }, [isLastStep, onComplete]);

  useEffect(() => { sentenceRef.current?.focus(); }, [stepIndex]);
  useEffect(() => {
    const timer = window.setTimeout(goForward, STEP_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [goForward]);

  return (
    <section className="screen exercise-screen" aria-labelledby="exercise-sentence">
      <div className="progress" aria-label={`${steps.length} adımın ${stepIndex + 1}. adımı`}>
        {steps.map((_, index) => <span key={index} aria-hidden="true"
          className={`progress__dot ${index === stepIndex ? "progress__dot--active" : ""}`} />)}
      </div>
      <div className="exercise-screen__message" key={stepIndex}>
        <h1 id="exercise-sentence" ref={sentenceRef} tabIndex={-1}>{steps[stepIndex]}</h1>
        <button
          className="next-step-button"
          type="button"
          onClick={goForward}
          aria-label={isLastStep ? "Yönlendirmeyi tamamla" : "Sonraki adıma geç"}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <button className="text-button" type="button" onClick={onExit}>Şimdilik bitir</button>
    </section>
  );
}
