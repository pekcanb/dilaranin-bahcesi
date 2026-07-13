import { useEffect, useRef } from "react";
import type { GardenFlower } from "../types";
import { Garden } from "./Garden";

type HomeScreenProps = { flowers: GardenFlower[]; onStart: () => void };

export function HomeScreen({ flowers, onStart }: HomeScreenProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => { titleRef.current?.focus(); }, []);

  return (
    <section className="screen home-screen" aria-labelledby="home-title">
      <header className="brand">Dilara'nın Bahçesi</header>
      <div className="home-screen__intro">
        <h1 id="home-title" ref={titleRef} tabIndex={-1}>Merhaba Dilara. Şu an biraz durmak ister misin?</h1>
        <button className="button button--primary" type="button" onClick={onStart}>Gel bakalım.</button>
      </div>
      <div className="garden-preview">
        <Garden flowers={flowers} compact />
        {flowers.length === 0 && <p>Bahçen burada büyüyecek.</p>}
      </div>
    </section>
  );
}
