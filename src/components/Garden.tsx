import type { CSSProperties } from "react";
import type { GardenFlower } from "../types";
import { useTimeOfDay } from "../hooks/useTimeOfDay";
import { FlowerVisual } from "./FlowerVisual";

type GardenProps = { flowers: GardenFlower[]; compact?: boolean; newFlowerId?: string };

const tuftSlots = [
  { x: 8, y: 76, scale: 0.8, delay: -1.2 },
  { x: 21, y: 68, scale: 0.65, delay: -3.7 },
  { x: 40, y: 79, scale: 0.9, delay: -2.1 },
  { x: 57, y: 66, scale: 0.7, delay: -4.4 },
  { x: 73, y: 78, scale: 0.85, delay: -0.8 },
  { x: 91, y: 70, scale: 0.72, delay: -3 },
] as const;

export function Garden({ flowers, compact = false, newFlowerId }: GardenProps) {
  const timeOfDay = useTimeOfDay();
  const gardenAssetUrl = `${import.meta.env.BASE_URL}assets/garden/`;

  return (
    <div className={`garden garden--${timeOfDay} ${compact ? "garden--compact" : ""}`} role="img"
      aria-label={flowers.length ? `${flowers.length} papatyalı bahçe` : "Henüz çiçeği olmayan bahçe"}>
      <img
        className="garden__scene"
        src={`${gardenAssetUrl}${timeOfDay}.png`}
        alt=""
        aria-hidden="true"
        draggable={false}
      />
      <div className="garden__light" aria-hidden="true" />
      {tuftSlots.map((tuft, index) => (
        <img
          className="garden-tuft"
          src={`${gardenAssetUrl}tuft.png`}
          alt=""
          aria-hidden="true"
          draggable={false}
          key={index}
          style={{
            left: `${tuft.x}%`,
            top: `${tuft.y}%`,
            "--tuft-scale": tuft.scale,
            "--tuft-delay": `${tuft.delay}s`,
          } as CSSProperties}
        />
      ))}
      {flowers.map((flower) => {
        const displayY = 58 + (flower.y - 39) * 0.85;
        const depthScale = 0.72 + Math.min(1, Math.max(0, (displayY - 58) / 30)) * 0.28;
        const style = {
          left: `${flower.x}%`, top: `${displayY}%`,
          "--flower-scale": flower.scale * depthScale,
          "--flower-rotation": `${flower.rotation}deg`,
          "--flower-delay": `${-((flower.slotIndex * 0.83) % 5)}s`,
          "--flower-duration": `${3.2 + (flower.slotIndex % 4) * 0.42}s`,
          zIndex: Math.round(displayY),
        } as CSSProperties;
        return (
          <span
            className={`garden-plant ${flower.id === newFlowerId ? "garden-plant--new" : ""}`}
            style={style}
            key={flower.id}
            aria-hidden="true"
          >
            <FlowerVisual className="garden-flower" />
          </span>
        );
      })}
    </div>
  );
}
