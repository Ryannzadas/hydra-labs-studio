import Image from "next/image";
import type { Project } from "@/lib/github";
import { ButtonLink } from "./button";
import { LogoMark } from "./logo";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      data-spotlight
      className="card spotlight group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface [--spot-size:340px]"
    >
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

        <div className="relative z-10 mt-auto flex gap-2 pt-2">
          {project.siteUrl && (
            <ButtonLink href={project.siteUrl} target="_blank" rel="noopener noreferrer" size="sm" arrow="out" magnetic={false}>
              Abrir site
            </ButtonLink>
          )}
          <ButtonLink href={project.repoUrl} target="_blank" rel="noopener noreferrer" size="sm" variant="outline" magnetic={false}>
            Código
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
