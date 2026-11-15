import { CopyButton } from "@/components/copy-button";
import { Logo, LogoMark } from "@/components/logo";
import { ProjectCard } from "@/components/project-card";
import { getProjects, githubProfileUrl } from "@/lib/github";
import { site, siteUrl } from "@/lib/site";

const nav = [
  { href: "#projetos", label: "Projetos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#selo", label: "Selo" },
];

const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet";

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
    <header className="sticky top-0 z-20 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#topo" className={`rounded-md ${focus}`} aria-label="Hydra Labs, voltar ao topo">
          <Logo />
        </a>
        <nav aria-label="Seções" className="flex items-center gap-1 text-sm">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`hidden rounded-full px-3 py-1.5 text-muted transition-colors hover:text-ink sm:block ${focus}`}
            >
              {item.label}
            </a>
          ))}
          <a
            href={githubProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`ml-2 rounded-full border border-line px-3.5 py-1.5 font-medium transition-colors hover:border-violet ${focus}`}
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="topo" className="glow relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-24 lg:pb-28">
        <div className="rise">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 font-mono text-xs text-lilac">
            <span className="size-1.5 rounded-full bg-violet" aria-hidden="true" />
            Estúdio independente de {site.owner}
          </p>
          <h1 className="font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Produtos web feitos com cuidado, do primeiro pixel ao deploy.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted text-pretty">
            Hydra Labs é onde eu publico o que construo: sites, ferramentas e experimentos. Tudo
            rápido, acessível e pensado nos detalhes.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#projetos"
              className={`rounded-full bg-violet px-6 py-3 font-medium text-white transition-colors hover:bg-violet/85 ${focus}`}
            >
              Ver projetos
            </a>
            <a
              href={site.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full border border-line px-6 py-3 font-medium transition-colors hover:border-violet ${focus}`}
            >
              Quem está por trás
            </a>
          </div>
        </div>

        <div className="rise [animation-delay:120ms]">
          <div className="overflow-hidden rounded-3xl border border-line bg-black shadow-[0_30px_80px_-30px_rgb(139_92_246/0.45)]">
            <video
              className="aspect-video w-full"
              src="/brand/intro-dark.mp4"
              poster="/brand/intro-dark-poster.jpg"
              autoPlay
              muted
              playsInline
              preload="metadata"
              aria-label="Animação da logo da Hydra Labs se formando"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

async function Projects() {
  const result = await getProjects();

  return (
    <section id="projetos" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
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
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {result.projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
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
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:py-24">
        <div>
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
              className="text-lilac underline underline-offset-4"
            >
              Meu portfólio
            </a>{" "}
            conta a minha trajetória; aqui ficam os produtos.
          </p>
        </div>

        <ul className="grid gap-4 self-center">
          {principles.map((p, i) => (
            <li key={p.title} className="flex gap-4 rounded-2xl border border-line bg-surface p-5">
              <span className="font-mono text-sm text-violet">0{i + 1}</span>
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
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <SectionTitle
          eyebrow="Selo"
          title="Desenvolvido por Hydra Labs"
          text="O selo que vai no rodapé de cada projeto. Copie o código e cole no HTML."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {variants.map((v) => {
            const src = `${siteUrl}/selo/desenvolvido-por-hydra-labs-${v.key}.svg`;
            const snippet = `<a href="${siteUrl}" target="_blank" rel="noopener">\n  <img src="${src}" alt="Desenvolvido por Hydra Labs" height="28">\n</a>`;
            return (
              <div key={v.key} className="overflow-hidden rounded-2xl border border-line bg-surface">
                <div className={`flex h-32 items-center justify-center ${v.bg}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- SVG estático, igual ao que vai nos outros sites */}
                  <img src={`/selo/desenvolvido-por-hydra-labs-${v.key}.svg`} alt="" width={196} height={28} />
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
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-10 sm:flex-row sm:items-center sm:px-6">
        <div className="flex items-center gap-3">
          <LogoMark className="size-8" />
          <p className="text-sm text-muted">
            © Hydra Labs · {site.owner}
          </p>
        </div>
        <div className="flex gap-5 text-sm text-muted">
          <a href={githubProfileUrl} target="_blank" rel="noopener noreferrer" className={`hover:text-ink ${focus}`}>
            GitHub
          </a>
          <a href={site.portfolio} target="_blank" rel="noopener noreferrer" className={`hover:text-ink ${focus}`}>
            Portfólio
          </a>
        </div>
      </div>
    </footer>
  );
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs tracking-widest text-violet uppercase">{eyebrow}</p>
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
