# Ayesha Nazish — Developer Portfolio

Personal portfolio of **Ayesha Nazish**, Full Stack (MERN) Developer with applied AI/ML experience.

**Live site:** https://ayeshanazish-portfolio.netlify.app

## Sections
Hero · About · Services · Projects · Contact (with working contact form and downloadable resume)

## Highlights
- Animated WebGL flow background in a fixed 5-colour palette, with reduced-motion support
- Glassmorphism and neumorphism UI, responsive layout and mobile burger menu
- Filterable project gallery with hover effects, driven by one data file
- SEO ready: meta tags, Open Graph, JSON-LD, sitemap and robots.txt
- Contact form delivered straight to email through Web3Forms

## Tech stack
React 18 · TypeScript · Vite · plain CSS · WebGL (GLSL shader)

## Getting started
```bash
npm install
cp .env.example .env     # then add your Web3Forms access key
npm run dev              # http://localhost:5173
npm run build            # type-check + production build into dist/
npm run preview          # serve the production build locally
```

## Environment variables
| Variable | Purpose |
|---|---|
| `VITE_WEB3FORMS_KEY` | Access key from [web3forms.com](https://web3forms.com); messages go to your inbox |
| `VITE_SITE_URL` | Live site address (no trailing slash), used for SEO tags |

Never commit your `.env` file (it is already in `.gitignore`). On Netlify, add both variables in **Site settings → Environment variables**.

## Customising
| What | Where |
|---|---|
| Projects (titles, links, images) | `src/data/projects.ts`, images in `public/projects/` |
| Skill percentages | `src/components/Services/Services.tsx` |
| Background speed, intensity, colours | `src/components/Hero/FlowBackground.tsx` |
| Resume | replace `public/Ayesha-Nazish-Resume.pdf` |
| Palette | CSS variables at the top of `src/components/Hero/hero.css` |

## Deployment (Netlify)
1. Push this repository to GitHub.
2. In Netlify choose **Add new site → Import an existing project** and select the repo. Build settings are read from `netlify.toml` (`npm run build`, publish `dist`).
3. Add the two environment variables above and deploy.
4. After the first deploy, set `VITE_SITE_URL` to your live address and replace the placeholder address in `public/robots.txt`, `public/sitemap.xml` and `.env.production`, then push again.

## Author
Ayesha Nazish — [GitHub](https://github.com/ash-1212) · [LinkedIn](https://www.linkedin.com/in/ayesha-nazish-452048274)
