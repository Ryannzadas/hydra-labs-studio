import { cacheLife, cacheTag } from "next/cache";

/**
 * Projetos da Hydra Labs vindos do GitHub.
 *
 * Todo repositório público de GITHUB_USER com o tópico "hydra-labs" aparece no site.
 * O resultado fica em cache e revalida a cada hora. GITHUB_TOKEN é opcional:
 * só sobe o limite da API de 60 para 5000 requisições por hora.
 */

const GITHUB_USER = "Ryannzadas";
export const HYDRA_TOPIC = "hydra-labs";

export type Project = {
  id: number;
  name: string;
  title: string;
  description: string;
  repoUrl: string;
  siteUrl: string | null;
  language: string | null;
  topics: string[];
  image: string | null;
  stars: number;
  updatedAt: string;
};

export type ProjectsResult =
  | { status: "ok"; projects: Project[] }
  | { status: "error" };

type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  topics?: string[];
  archived: boolean;
  fork: boolean;
  default_branch: string;
  pushed_at: string;
};

function headers(): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "hydra-labs-site",
  };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

/** "pokemon-permadeath_updates" → "Pokemon Permadeath Updates". */
function prettify(name: string) {
  const small = new Set(["of", "the", "and", "de", "da", "do", "e", "a"]);
  return name
    .replace(/[-_]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((w, i) =>
      i > 0 && small.has(w.toLowerCase()) ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1),
    )
    .join(" ");
}

function normalizeUrl(value: string | null) {
  const v = value?.trim();
  if (!v) return null;
  return /^https?:\/\//.test(v) ? v : `https://${v}`;
}

/** preview.png na raiz do repositório vira a capa do card. */
async function findPreview(repo: GitHubRepo): Promise<string | null> {
  const url = `https://raw.githubusercontent.com/${GITHUB_USER}/${repo.name}/${repo.default_branch}/preview.png`;
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok ? url : null;
  } catch {
    return null;
  }
}

export async function getProjects(): Promise<ProjectsResult> {
  "use cache";
  cacheTag("github");

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`,
      { headers: headers() },
    );
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    const repos = (await res.json()) as GitHubRepo[];

    const selected = repos.filter((r) => !r.archived && r.topics?.includes(HYDRA_TOPIC));
    const projects = await Promise.all(
      selected.map(async (r): Promise<Project> => ({
        id: r.id,
        name: r.name,
        title: prettify(r.name),
        description: r.description?.trim() || `Projeto em ${r.language ?? "desenvolvimento"}.`,
        repoUrl: r.html_url,
        siteUrl: normalizeUrl(r.homepage),
        language: r.language,
        topics: (r.topics ?? []).filter((t) => t !== HYDRA_TOPIC).slice(0, 4),
        image: await findPreview(r),
        stars: r.stargazers_count,
        updatedAt: r.pushed_at,
      })),
    );

    // Atualizado mais recentemente primeiro.
    projects.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));

    cacheLife("hours");
    return { status: "ok", projects };
  } catch (error) {
    cacheLife("minutes");
    console.error("[github] falha ao buscar projetos:", error);
    return { status: "error" };
  }
}

export const githubProfileUrl = `https://github.com/${GITHUB_USER}`;
