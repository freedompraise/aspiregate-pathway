# AspireGate blog — Sanity CMS guide for writers

The AspireGate marketing site reads published articles from **Sanity**. Editors work in **Sanity Studio** — usually a **hosted** Studio URL your team shares (browser only, no code checkout).

This repo may include a **`studio-blog/`** folder as a **reference copy** of the Studio project; it is not the marketing app and writers do not need it on their machines.

The React website (`/` … `/blog`) only uses Sanity’s **public API** (no secret tokens in the frontend).

---

## How to log in

**Recommended (writers):** open your team’s **hosted Sanity Studio** link, sign in with the Sanity account that was invited in [sanity.io/manage](https://www.sanity.io/manage) for project **`r36gptr7`** (or whichever project your team uses).

**Optional (developers):** to run Studio locally, use the `studio-blog/` snapshot in this repo (or your canonical Studio repo): install dependencies there, run `npm run dev` or `npx sanity dev`, then open the URL shown in the terminal (often `http://localhost:3333`).

---

## Create a blog post

1. In the Studio sidebar, open **Blog Post** → **Create**.
2. Fill **Content** first (title, slug, excerpt, category, body, publish date).
3. Add **SEO** fields when the draft is stable.
4. Adjust **CTA** if this post needs a custom button (defaults match AspireGate’s consultation link).
5. Use **Publish** when the article is ready. Until **Published at** is set and is **not in the future**, the website will not list the post.

---

## What each field means

| Field | Purpose |
| --- | --- |
| **Title** | Headline on the site and default SEO title fallback. |
| **Slug** | URL segment: `/blog/your-slug`. Generated from title; keep short and readable. |
| **Excerpt** | Short summary for cards and meta description fallback (max **180** characters). |
| **Featured image** | Hero / card image. Use **Featured image alt text** whenever an image is set. |
| **Author** | Optional byline (create **Author** documents first). |
| **Category** | Required; drives `/blog/category/...` and “related articles”. |
| **Tags** | Optional internal labels (not shown as pills on the site today). |
| **Published at** | Controls visibility and sort order; must be **now or in the past** to appear. |
| **Updated at** | Shown when you refresh practical guides (“Last updated”). |
| **Body** | Main article (headings, lists, links, inline images). |
| **SEO title** | Browser tab / Google title (max **60** characters recommended). |
| **SEO meta description** | Snippet in search results (max **160** characters recommended). |
| **Focus keyword** | Optional reminder only — write naturally; avoid stuffing. |
| **CTA*** | In-article and footer call-to-action blocks on the website; sensible defaults are pre-filled. |

---

## Categories — suggested setup

Create **Category** documents (each needs **Title** + **Slug**). Recommended starter categories:

- Study Abroad Guides → slug example `study-abroad-guides`
- UK Study Guide → `uk-study-guide`
- Canada Study Guide → `canada-study-guide`
- Visa Preparation → `visa-preparation`
- Scholarships & Funding → `scholarships-funding`
- Application Tips → `application-tips`
- Student Life Abroad → `student-life-abroad`
- Parent Guide → `parent-guide`

Slug spelling matters: marketing URLs use it exactly (`/blog/category/your-slug`).

---

## Images & alt text

- **Featured image**: always pair with meaningful **Featured image alt text** (what a blind reader needs to understand).
- **Images inside the article**: use **Alternative text** on inline images; add optional captions when helpful.

---

## Draft vs publish

- **Draft**: saves work-in-progress; not shown on the public site if **Published at** is missing or still in the future.
- **Publish**: makes the document live for readers once **Published at** is valid.

---

## Marketing site environment

Editors don’t need to edit `.env`. Developers set the same public ids the Studio uses:

- `VITE_SANITY_PROJECT_ID` — Sanity project id (matches your Studio / project settings).
- `VITE_SANITY_DATASET` — usually `production`.
- Optional `VITE_SITE_URL` — canonical URLs for SEO meta.

**Production:** set these on your host’s **build** environment (Vite inlines `VITE_*` at build time). **Local:** see the repo root `.env.example`.

---

## Content rules for AspireGate

1. **Do not** claim guaranteed admission or guaranteed visa approval.
2. **Do not** publish immigration or visa rule changes without checking **official** government / embassy sources — link out and date your guidance.
3. Use **simple English**; short paragraphs; clear headings.
4. Include a **CTA** on every post (defaults are fine unless the piece needs a different next step).
5. For practical guides that change over time, set **Updated at** when you revise content.
6. Default consultation CTA should normally point to AspireGate’s Calendly consultation URL (pre-filled in Studio).

---

## Need help?

Ask your technical contact to verify **CORS** on the Sanity project allows your local dev URL and production domain, so the React site can fetch posts.
