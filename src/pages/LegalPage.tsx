import { ArrowUpRight, CodeXml, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type LegalSection = {
  title: string;
  paragraphs: string[];
};

type LegalDocument = {
  title: string;
  eyebrow: string;
  intro: string;
  sections: LegalSection[];
};

const contactLinks = [
  {
    label: "Profilo GitHub · Noylah",
    href: "https://github.com/Noylah",
    icon: CodeXml,
  },
  {
    label: "Portfolio · noyla.vercel.app",
    href: "https://noyla.vercel.app",
    icon: Globe,
  },
];

const legalContent: Record<string, LegalDocument> = {
  "/privacy": {
    title: "Privacy policy",
    eyebrow: "I tuoi dati, spiegati chiaramente",
    intro:
      "Questa informativa descrive i trattamenti che risultano dal codice attuale di Silicon Lab. Il fornitore di hosting e gli eventuali servizi aggiunti alla pubblicazione possono trattare dati tecnici secondo le proprie informative.",
    sections: [
      {
        title: "Chi gestisce il progetto",
        paragraphs: [
          "Il progetto è mantenuto da Noylah (username GitHub). Per richieste relative alla privacy puoi usare il profilo GitHub qui sotto o il portfolio. Il profilo online non sostituisce i dati anagrafici o di sede eventualmente richiesti dalla normativa applicabile: il gestore deve integrarli quando dovuti.",
        ],
      },
      {
        title: "Quali dati usa l'applicazione",
        paragraphs: [
          "Non è necessario creare un account e l'applicazione non include moduli di contatto. Per ricordare le personalizzazioni, il browser salva sul dispositivo i valori `products` e `useCases` in localStorage: rispettivamente il catalogo modificato e i profili d'uso.",
          "Questi dati restano nel browser e, nel funzionamento attuale, non vengono inviati a un server dall'applicazione. Non hanno una scadenza automatica: puoi rimuoverli cancellando i dati del sito dalle impostazioni del browser.",
        ],
      },
      {
        title: "Finalità e base giuridica",
        paragraphs: [
          "L'archiviazione locale serve a mantenere le preferenze e le modifiche fatte dall'utente tra una visita e l'altra. Il gestore deve verificare la base giuridica e gli eventuali obblighi informativi applicabili alla propria situazione e alle regole del paese in cui il servizio viene offerto.",
        ],
      },
      {
        title: "Hosting e servizi esterni",
        paragraphs: [
          "Il frontend attuale non integra strumenti di analytics, pubblicità o account. Il provider che ospita il sito può comunque ricevere dati tecnici necessari a servire le pagine, per esempio richieste e indirizzi IP: consulta l'informativa del provider effettivamente utilizzato e aggiungi qui i suoi dettagli prima della pubblicazione.",
        ],
      },
      {
        title: "I tuoi diritti e come contattarmi",
        paragraphs: [
          "Puoi chiedere informazioni sul trattamento o esercitare i diritti previsti dalla normativa applicabile tramite i contatti qui sotto. Evita di pubblicare dati personali o sensibili nelle issue pubbliche del repository; indica invece che desideri un canale privato.",
        ],
      },
    ],
  },
  "/cookie": {
    title: "Cookie e archiviazione locale",
    eyebrow: "Cosa viene salvato sul tuo dispositivo",
    intro:
      "L'applicazione e la piattaforma che la ospita sono componenti distinti. Questa pagina descrive il comportamento del frontend; verifica anche cookie e strumenti introdotti dall'hosting prima di pubblicare il sito.",
    sections: [
      {
        title: "Cookie",
        paragraphs: [
          "Il codice dell'applicazione non crea né legge cookie. Il provider di hosting o servizi integrati successivamente potrebbero comportarsi in modo diverso: fa fede una verifica del sito pubblicato e dell'informativa del provider.",
        ],
      },
      {
        title: "LocalStorage",
        paragraphs: [
          "Silicon Lab salva nel localStorage del browser le chiavi `products` (catalogo personalizzato) e `useCases` (profili d'uso). È una memoria locale del browser, non un cookie e non un account online. I dati non hanno una scadenza automatica e restano sul dispositivo finché non li cancelli dalle impostazioni del browser o del sito.",
        ],
      },
      {
        title: "Scelte e aggiornamenti",
        paragraphs: [
          "Se vengono aggiunti strumenti di analisi, pubblicità, contenuti incorporati o altri servizi, l'informativa andrà aggiornata e il gestore dovrà valutare gli eventuali obblighi di consenso previsti per il pubblico e la giurisdizione interessati.",
        ],
      },
    ],
  },
  "/termini": {
    title: "Termini d'uso",
    eyebrow: "Regole semplici per usare Silicon Lab",
    intro:
      "Usando Silicon Lab accedi a uno strumento informativo per confrontare laptop. Questi termini descrivono il funzionamento attuale del progetto e vanno letti insieme alle condizioni dei produttori e dei venditori.",
    sections: [
      {
        title: "Risultati e informazioni",
        paragraphs: [
          "Il confronto calcola punteggi usando le specifiche presenti nel catalogo e le priorità selezionate. Il risultato è un'indicazione, non una raccomandazione professionale, una garanzia di idoneità o un impegno all'acquisto.",
          "Prezzi, disponibilità e caratteristiche possono essere incompleti o cambiare. Prima di acquistare, verifica sempre i dati aggiornati con il produttore o il venditore.",
        ],
      },
      {
        title: "Uso responsabile",
        paragraphs: [
          "Puoi usare il servizio per confronti personali e contribuire al suo miglioramento. Non tentare di compromettere il servizio o di usarlo in modo illecito. Le personalizzazioni salvate nel browser sono gestite sul tuo dispositivo e possono essere cancellate dalle impostazioni del browser.",
        ],
      },
      {
        title: "Progetto aperto e contributi",
        paragraphs: [
          "Il codice del progetto è consultabile pubblicamente e i contributi sono benvenuti tramite issue e pull request su GitHub. Al momento il repository non pubblica un file di licenza: la visibilità pubblica e la possibilità di contribuire non concedono automaticamente il diritto di riutilizzare o ridistribuire il codice. Prima di farlo, verifica la licenza o chiedi al maintainer.",
        ],
      },
      {
        title: "Contatti e aggiornamenti",
        paragraphs: [
          "Per segnalazioni, proposte e richieste, visita il repository del progetto o il profilo GitHub di Noylah. I termini possono essere aggiornati quando cambiano le funzioni o le modalità di gestione del servizio.",
        ],
      },
    ],
  },
};

const legalLinks = [
  { label: "Privacy policy", to: "/privacy" },
  { label: "Cookie e archiviazione", to: "/cookie" },
  { label: "Termini d'uso", to: "/termini" },
];

export default function LegalPage() {
  const { pathname } = useLocation();
  const page = legalContent[pathname] ?? legalContent["/privacy"];

  return (
    <article className="mx-auto my-12 max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/45 shadow-2xl shadow-black/20 backdrop-blur-sm sm:my-16">
      <div className="border-b border-white/10 bg-gradient-to-br from-cyan-300/[0.08] via-transparent to-blue-400/[0.06] px-6 py-9 sm:px-10 sm:py-12">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
          Silicon Lab · {page.eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
          {page.title}
        </h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-slate-300">
          {page.intro}
        </p>
      </div>

      <div className="grid gap-8 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="space-y-8">
          {page.sections.map((section, index) => (
            <section key={section.title} className="flex gap-4">
              <span
                aria-hidden="true"
                className="mt-0.5 font-mono text-xs font-bold text-cyan-300/60"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-lg font-bold text-white">
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-2 leading-relaxed text-slate-300/75"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.035] p-5">
          <h2 className="text-sm font-bold text-white">Parliamone</h2>
          <div className="mt-4 flex flex-col gap-3">
            {contactLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between gap-2 text-sm text-slate-300 transition-colors hover:text-cyan-200"
              >
                <span className="inline-flex items-center gap-2">
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ))}
            <a
              href="https://github.com/Noylah/silicon"
              target="_blank"
              rel="noreferrer"
              className="mt-2 rounded-xl border border-cyan-200/20 bg-cyan-200/[0.06] px-4 py-3 text-sm font-semibold text-cyan-100 transition-colors hover:bg-cyan-200/10"
            >
              Contribuisci al progetto
              <ArrowUpRight className="ml-1 inline" size={15} aria-hidden="true" />
            </a>
          </div>
        </aside>
      </div>

      <nav
        aria-label="Altre pagine legali"
        className="flex flex-wrap gap-x-5 gap-y-3 border-t border-white/10 px-6 py-5 sm:px-10"
      >
        {legalLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-sm transition-colors hover:text-cyan-200 ${
              pathname === link.to ? "text-cyan-200" : "text-slate-400"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <p className="px-6 pb-6 text-xs leading-relaxed text-slate-500 sm:px-10">
        Informazioni generali sul funzionamento attuale del progetto; non
        costituiscono consulenza legale. Gli obblighi applicabili dipendono dal
        gestore, dai servizi di hosting e dai paesi in cui il sito è offerto.
      </p>
    </article>
  );
}
