const steps = [
  {
    number: "01",
    title: "Scegli due prodotti",
    description:
      "Il confronto usa i prodotti e le specifiche presenti nel catalogo, comprese eventuali modifiche salvate nel browser.",
  },
  {
    number: "02",
    title: "Imposta le tue priorità",
    description:
      "Puoi confrontare i dati senza un profilo oppure scegliere un caso d'uso. Nei profili, ogni specifica può essere lasciata neutra o marcata come da minimizzare o massimizzare.",
  },
  {
    number: "03",
    title: "Somma i punteggi",
    description:
      "Per una specifica neutra si assegna 1 punto al valore considerato migliore (prezzo più basso, valore più alto per le altre specifiche). Con una preferenza esplicita, il prodotto migliore riceve +2,5 punti e l'altro −2,5.",
  },
  {
    number: "04",
    title: "Leggi il risultato",
    description:
      "Vince il prodotto con il totale più alto. Se i punteggi sono uguali, il confronto non indica un vincitore.",
  },
];

export default function Algorithm() {
  return (
    <article className="mx-auto mt-12 max-w-4xl pb-8">
      <p className="font-mono text-sm font-bold uppercase tracking-widest text-apple-blue">
        Silicon Lab · trasparenza
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
        Come funziona il confronto
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/60">
        Il risultato nasce da un sistema di punteggi semplice e verificabile.
        Non è una valutazione assoluta: riflette i dati inseriti e le priorità
        selezionate.
      </p>

      <ol className="mt-10 grid gap-4 sm:grid-cols-2">
        {steps.map((step) => (
          <li
            key={step.number}
            className="rounded-2xl border border-apple-elevated/30 bg-apple-card/40 p-6"
          >
            <span className="font-mono text-sm font-bold text-apple-blue">
              {step.number}
            </span>
            <h2 className="mt-3 text-xl font-bold text-white">{step.title}</h2>
            <p className="mt-2 leading-relaxed text-white/60">
              {step.description}
            </p>
          </li>
        ))}
      </ol>

      <section className="mt-8 rounded-2xl border border-apple-blue/20 bg-apple-blue/5 p-6">
        <h2 className="text-xl font-bold text-white">Da tenere a mente</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 leading-relaxed text-white/60">
          <li>
            Le priorità esplicite pesano più dei criteri lasciati neutri; criteri
            neutri continuano comunque a contribuire al totale.
          </li>
          <li>
            Nei confronti neutri, le specifiche numeriche più alte sono
            considerate migliori, tranne il prezzo. Per questo il risultato è
            indicativo e non sostituisce una valutazione personale.
          </li>
          <li>
            L'algoritmo non considera fattori non presenti nel catalogo, come
            qualità costruttiva, autonomia reale, assistenza o offerte
            aggiornate.
          </li>
          <li>
            Controlla sempre le specifiche e il prezzo finale direttamente
            presso il venditore: i dati possono essere incompleti o non
            aggiornati.
          </li>
        </ul>
      </section>
    </article>
  );
}
