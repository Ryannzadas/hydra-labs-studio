import { ButtonLink } from "@/components/button";
import { CopyButton } from "@/components/copy-button";
import { Logo, LogoMark } from "@/components/logo";
import { ProjectCard } from "@/components/project-card";
import { HudRing } from "@/components/hud-ring";
import { Orb } from "@/components/orb";
import { getProjects, githubProfileUrl } from "@/lib/github";
import { site, siteUrl } from "@/lib/site";

const nav = [
  { href: "#projetos", label: "Projetos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#selo", label: "Selo" },
];

const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet";

const headline = "Produtos web feitos com cuidado, do primeiro pixel ao deploy.";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Projects />
        <About />
        <Badge />
      </main>
      <Footer />
    </>
  );
}

function Header() {
  return (
    <header className="site-header sticky top-0 z-20 border-b border-transparent bg-bg/60 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#topo" className={`logo-link rounded-md ${focus}`} aria-label="Hydra Labs, voltar ao topo">
          <Logo />
        </a>
        <nav aria-label="Seções" className="flex items-center gap-1 text-sm">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link hidden rounded-md px-3 py-1.5 font-mono text-xs tracking-[0.12em] text-muted uppercase transition-colors hover:text-ink sm:block ${focus}`}
            >
              {item.label}
            </a>
          ))}
          <span className="ml-2">
            <ButtonLink href={githubProfileUrl} target="_blank" rel="noopener noreferrer" variant="outline" size="sm" arrow="out">
              GitHub
            </ButtonLink>
          </span>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="topo"
      data-spotlight
      className="spotlight relative overflow-hidden [--spot-alpha:0.1] [--spot-size:620px]"
    >
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-blob top-[-10%] right-[5%] size-[28rem] bg-violet/20" aria-hidden="true" />
      <div
        className="hero-blob bottom-[-20%] left-[-10%] size-[30rem] bg-deep/40 [animation-delay:-9s]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid min-h-[calc(100dvh-4rem)] max-w-6xl items-center gap-6 px-4 pt-10 pb-24 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:pt-6">
        <div className="order-2 lg:order-1">
          <p className="rise mb-6 inline-flex items-center gap-2 rounded-md border border-line bg-surface/70 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-lilac uppercase">
            <span className="relative flex size-1.5" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet opacity-70 motion-reduce:hidden" />
              <span className="relative inline-flex size-1.5 rounded-full bg-violet" />
            </span>
            Estúdio independente de {site.owner}
          </p>
          <h1
            className="font-display text-[2.6rem] leading-[0.98] font-bold tracking-[-0.045em] text-balance sm:text-6xl lg:text-[4.4rem]"
            aria-label={headline}
          >
            {headline.split(" ").map((word, i) => (
              <span key={i} aria-hidden="true">
                <span className="word">
                  <span
                    style={{ "--i": i } as React.CSSProperties}
                    className={
                      word.startsWith("cuidado")
                        ? "bg-gradient-to-r from-lilac to-violet bg-clip-text text-transparent"
                        : undefined
                    }
                  >
                    {word}
                  </span>
                </span>{" "}
              </span>
            ))}
          </h1>
          <p className="rise mt-6 max-w-lg text-lg leading-relaxed text-muted text-pretty [animation-delay:500ms]">
            Hydra Labs é onde eu publico o que construo: sites, ferramentas e experimentos. Tudo
            rápido, acessível e pensado nos detalhes.
          </p>
          <div className="rise mt-9 flex flex-wrap gap-3 [animation-delay:650ms]">
            <ButtonLink href="#projetos" arrow="down">
              Ver projetos
            </ButtonLink>
            <ButtonLink href={site.portfolio} target="_blank" rel="noopener noreferrer" variant="outline" arrow="out">
              Quem está por trás
            </ButtonLink>
          </div>
        </div>

        <div className="rise relative order-1 mx-auto aspect-square w-full max-w-[min(100%,34rem)] [animation-delay:150ms] lg:order-2">
          <HudRing className="absolute inset-0 size-full" />
          <Orb className="absolute inset-[9%] size-[82%]" />
          <LogoMark className="absolute top-1/2 left-1/2 size-[17%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_24px_rgb(139_92_246/0.7)]" />
        </div>
      </div>

      <a
        href="#projetos"
        className={`scroll-cue absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 rounded-md font-mono text-[11px] tracking-[0.2em] text-muted uppercase transition-colors hover:text-ink ${focus}`}
      >
        Rolar
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}

async function Projects() {
  const result = await getProjects();

  return (
    <section id="projetos">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionTitle
          eyebrow="Projetos"
          title="O que já saiu do laboratório"
          text="Atualizado sozinho a partir do GitHub: cada repositório marcado com o tópico hydra-labs aparece aqui."
        />

        {result.status === "error" ? (
          <EmptyState>
            Não deu pra carregar os projetos do GitHub agora.{" "}
            <a href={githubProfileUrl} className="text-lilac underline underline-offset-4">
              Veja direto no GitHub
            </a>
            .
          </EmptyState>
        ) : result.projects.length === 0 ? (
          <EmptyState>
            Os primeiros projetos estão a caminho. Enquanto isso, dá uma olhada no{" "}
            <a href={githubProfileUrl} className="text-lilac underline underline-offset-4">
              GitHub
            </a>
            .
          </EmptyState>
        ) : (
          <div data-reveal className="app-window mt-12 overflow-hidden rounded-2xl shadow-[0_40px_100px_-40px_rgb(139_92_246/0.45)]">
            <div className="flex items-center gap-4 border-b border-line bg-bg/60 px-4 py-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
                <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
                <span className="size-2.5 rounded-full bg-[#28c840]/80" />
              </span>
              <span className="truncate font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
                hydra-labs / projetos
              </span>
              <span className="ml-auto shrink-0 rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-lilac">
                {result.projects.length} {result.projects.length === 1 ? "projeto" : "projetos"}
              </span>
            </div>
            <div className="grid gap-5 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
              {result.projects.map((p, i) => (
                <div key={p.id} data-reveal style={{ "--d": `${150 + (i % 3) * 90}ms` } as React.CSSProperties}>
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

const principles = [
  {
    title: "Rápido",
    text: "Página leve carrega na hora, até no 4G. Desempenho é parte do design.",
  },
  {
    title: "Acessível",
    text: "Contraste, teclado e leitor de tela funcionando desde o começo, não no fim.",
  },
  {
    title: "Detalhista",
    text: "Animação com propósito, texto claro e nenhum pixel fora do lugar.",
  },
];

function About() {
  return (
    <section id="sobre" className="border-t border-line bg-surface/40">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:py-28">
        <div data-reveal>
          <SectionTitle eyebrow="Sobre" title="Por que Hydra?" />
          <p className="mt-6 leading-relaxed text-muted">
            Hydra é o nick que eu uso nos jogos há anos. Quando comecei a publicar meus próprios
            projetos, fazia sentido assinar com o mesmo nome: é o jeito de dizer que aquilo é meu.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Eu sou {site.owner}, estudante de Sistemas de Informação e desenvolvedor web.{" "}
            <a
              href={site.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lilac underline decoration-lilac/40 underline-offset-4 transition-colors hover:decoration-lilac"
            >
              Meu portfólio
            </a>{" "}
            conta a minha trajetória; aqui ficam os produtos.
          </p>
          <div className="video-frame mt-8 shadow-[0_30px_80px_-30px_rgb(139_92_246/0.5)]">
            <div className="overflow-hidden rounded-[calc(1.6rem-1px)] bg-black">
              <video
                className="aspect-video w-full"
                src="/brand/intro-dark.mp4"
                poster="/brand/intro-dark-poster.jpg"
                muted
                playsInline
                preload="none"
                data-play-on-view
                aria-label="Vinheta da Hydra Labs: a logo se formando"
              />
            </div>
          </div>
        </div>

        <ul className="grid gap-4 self-center">
          {principles.map((p, i) => (
            <li
              key={p.title}
              data-reveal
              data-spotlight
              style={{ "--d": `${i * 110}ms` } as React.CSSProperties}
              className="card principle spotlight flex gap-4 overflow-hidden rounded-2xl border border-line bg-surface p-5 [--spot-size:260px]"
            >
              <span className="principle-num font-mono text-sm text-violet">0{i + 1}</span>
              <div>
                <h3 className="font-display font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Badge() {
  const variants = [
    { key: "escuro", label: "Para fundo escuro", bg: "bg-[#0b0814]" },
    { key: "claro", label: "Para fundo claro", bg: "bg-white" },
  ] as const;

  return (
    <section id="selo" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div data-reveal>
          <SectionTitle
            eyebrow="Selo"
            title="Desenvolvido por Hydra Labs"
            text="O selo que vai no rodapé de cada projeto. Copie o código e cole no HTML."
          />
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {variants.map((v, i) => {
            const src = `${siteUrl}/selo/desenvolvido-por-hydra-labs-${v.key}.svg`;
            const snippet = `<a href="${siteUrl}" target="_blank" rel="noopener">\n  <img src="${src}" alt="Desenvolvido por Hydra Labs" height="28">\n</a>`;
            return (
              <div
                key={v.key}
                data-reveal
                style={{ "--d": `${i * 110}ms` } as React.CSSProperties}
                className="card overflow-hidden rounded-2xl border border-line bg-surface"
              >
                <div className={`group flex h-32 items-center justify-center ${v.bg}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- SVG estático, igual ao que vai nos outros sites */}
                  <img
                    src={`/selo/desenvolvido-por-hydra-labs-${v.key}.svg`}
                    alt=""
                    width={196}
                    height={28}
                    className="transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>
                <div className="border-t border-line p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-sm font-medium">{v.label}</h3>
                    <CopyButton text={snippet} label="Copiar código" />
                  </div>
                  <pre className="overflow-x-auto rounded-xl bg-bg p-3 font-mono text-[12px] leading-relaxed text-muted">
                    <code>{snippet}</code>
                  </pre>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 sm:px-6">
        <div data-reveal className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Bora construir algo?</p>
            <p className="mt-2 text-muted">Os projetos novos aparecem aqui assim que saem do forno.</p>
          </div>
          <ButtonLink href={githubProfileUrl} target="_blank" rel="noopener noreferrer" arrow="out">
            Seguir no GitHub
          </ButtonLink>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <LogoMark className="size-8" />
            <p className="text-sm text-muted">© Hydra Labs · {site.owner}</p>
          </div>
          <div className="flex gap-5 text-sm text-muted">
            <a href={githubProfileUrl} target="_blank" rel="noopener noreferrer" className={`nav-link px-3 py-1.5 hover:text-ink ${focus}`}>
              GitHub
            </a>
            <a href={site.portfolio} target="_blank" rel="noopener noreferrer" className={`nav-link px-3 py-1.5 hover:text-ink ${focus}`}>
              Portfólio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="flex items-center gap-3 font-mono text-xs tracking-widest text-violet uppercase">
        <span className="h-px w-8 bg-violet" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 leading-relaxed text-muted text-pretty">{text}</p>}
    </div>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-12 rounded-2xl border border-dashed border-line bg-surface/50 p-8 text-center text-muted">
      {children}
    </p>
  );
}
