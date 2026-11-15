import Image from "next/image";
import type { Project } from "@/lib/github";
import { LogoMark } from "./logo";

const linkClass =
  "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-violet/60">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
        {project.image ? (
          <Image
            src={project.image}
            alt={`Prévia do projeto ${project.title}`}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="glow flex size-full items-center justify-center">
            <LogoMark className="size-16 opacity-80" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg font-semibold tracking-tight">{project.title}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted">{project.description}</p>

        {(project.language || project.topics.length > 0) && (
          <ul className="flex flex-wrap gap-1.5" aria-label="Tecnologias">
            {[project.language, ...project.topics]
              .filter((t, i, all): t is string => !!t && all.indexOf(t) === i)
              .slice(0, 4)
              .map((t) => (
                <li key={t} className="rounded-full bg-surface-2 px-2.5 py-0.5 font-mono text-[11px] text-lilac">
                  {t}
                </li>
              ))}
          </ul>
        )}

        <div className="mt-auto flex gap-2 pt-2">
          {project.siteUrl && (
            <a
              href={project.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClass} bg-violet text-white hover:bg-violet/85`}
            >
              Abrir site
            </a>
          )}
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClass} border border-line text-ink hover:border-violet`}
          >
            Código
          </a>
        </div>
      </div>
    </article>
  );
}
