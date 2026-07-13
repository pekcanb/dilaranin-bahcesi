import { useCallback, useState } from "react";
import { CompletionScreen } from "./components/CompletionScreen";
import { ExerciseScreen } from "./components/ExerciseScreen";
import { HomeScreen } from "./components/HomeScreen";
import { gardenSlots } from "./data/gardenSlots";
import { completionQuotes, getNextCompletionQuote } from "./data/completionQuotes";
import { exercisePrograms, getNextExerciseProgram } from "./data/exerciseSteps";
import type { GardenFlower, Screen } from "./types";
import { loadGarden, saveGarden } from "./utils/storage";

function variation(index: number, min: number, max: number): number {
  const value = Math.abs(Math.sin((index + 1) * 12.9898) * 43758.5453) % 1;
  return min + value * (max - min);
}

function makeFlower(flowers: GardenFlower[]): GardenFlower | null {
  const usedSlots = new Set(flowers.map((flower) => flower.slotIndex));
  const slotIndex = gardenSlots.findIndex((_, index) => !usedSlots.has(index));
  if (slotIndex === -1) return null;
  const slot = gardenSlots[slotIndex];
  return {
    id: crypto.randomUUID(), type: "daisy", slotIndex, x: slot.x,
    y: slot.y + variation(slotIndex, -2, 2), scale: variation(slotIndex + 4, 0.9, 1.08),
    rotation: variation(slotIndex + 9, -4, 4), createdAt: new Date().toISOString(),
  };
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [flowers, setFlowers] = useState<GardenFlower[]>(loadGarden);
  const [newFlowerId, setNewFlowerId] = useState("");
  const [exerciseSteps, setExerciseSteps] = useState<readonly string[]>(exercisePrograms[0]);
  const [completionQuote, setCompletionQuote] = useState(completionQuotes[0]);

  const startExercise = () => {
    setExerciseSteps(getNextExerciseProgram());
    setScreen("exercise");
  };

  const completeExercise = useCallback(() => {
    const flower = makeFlower(flowers);
    if (flower) {
      const next = [...flowers, flower];
      setFlowers(next);
      saveGarden(next);
      setNewFlowerId(flower.id);
    }
    setCompletionQuote(getNextCompletionQuote());
    setScreen("completion");
  }, [flowers]);

  return (
    <main className="app-shell">
      {screen === "home" && <HomeScreen flowers={flowers} onStart={startExercise} />}
      {screen === "exercise" && <ExerciseScreen steps={exerciseSteps} onComplete={completeExercise} onExit={() => setScreen("home")} />}
      {screen === "completion" && <CompletionScreen flowers={flowers} newFlowerId={newFlowerId} quote={completionQuote} onHome={() => setScreen("home")} />}
    </main>
  );
}
