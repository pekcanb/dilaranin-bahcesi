import { useEffect, useRef, useState } from "react";
import type { CompletionQuote } from "../data/completionQuotes";
import type { GardenFlower } from "../types";
import { FlowerVisual } from "./FlowerVisual";
import { Garden } from "./Garden";

type Props = { flowers: GardenFlower[]; newFlowerId: string; quote: CompletionQuote; onHome: () => void };

export function CompletionScreen({ flowers, newFlowerId, quote, onHome }: Props) {
  const [showGarden, setShowGarden] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => { titleRef.current?.focus(); }, [showGarden]);

  if (showGarden) {
    return (
      <section className="screen garden-screen" aria-labelledby="garden-title">
        <header className="brand">Dilara'nın Bahçesi</header>
        <div className="garden-screen__heading">
          <h1 id="garden-title" ref={titleRef} tabIndex={-1}>Bahçen</h1>
          <p>Bahçen seni kaldığın yerden karşılıyor.</p>
        </div>
        <Garden flowers={flowers} newFlowerId={newFlowerId} />
        <button className="text-button" type="button" onClick={onHome}>Ana ekrana dön</button>
      </section>
    );
  }

  return (
    <section className="screen completion-screen" aria-labelledby="completion-title">
      <div className="completion-screen__content">
        <FlowerVisual className="new-flower" />
        <div className="completion-quote">
          <h1 id="completion-title" ref={titleRef} tabIndex={-1}>“{quote.text}”</h1>
          <a className="completion-quote__source" href={quote.sourceUrl} target="_blank" rel="noreferrer" aria-label={`${quote.author} alıntısının kaynağını aç`}>
            — {quote.author}
          </a>
        </div>
        <p>Bahçene bir papatya eklendi.</p>
        <button className="button button--primary" type="button" onClick={() => setShowGarden(true)}>Bahçeme bak</button>
      </div>
    </section>
  );
}
