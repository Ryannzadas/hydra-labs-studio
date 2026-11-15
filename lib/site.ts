/** URL pública do site: variável explícita → URL de produção da Vercel → localhost. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const site = {
  name: "Hydra Labs",
  owner: "João Ryan",
  portfolio: "https://joao-ryan.vercel.app",
  description:
    "Hydra Labs é o estúdio independente de João Ryan: sites e produtos web feitos com cuidado, do primeiro pixel ao deploy.",
};
