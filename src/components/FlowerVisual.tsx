import type { CSSProperties } from "react";

type FlowerVisualProps = { className?: string; style?: CSSProperties };

export function FlowerVisual({ className, style }: FlowerVisualProps) {
  return (
    <img
      className={className}
      style={style}
      src={`${import.meta.env.BASE_URL}assets/garden/daisy.png`}
      alt=""
      aria-hidden="true"
      draggable={false}
    />
  );
}
