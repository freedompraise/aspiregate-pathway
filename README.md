# AspireGate Services Website

AspireGate Services Limited is a premium study abroad consultancy based in Nigeria. This project powers the official AspireGate website and blog, designed to help students and professionals explore study destinations, understand application requirements, and book free consultations.

## Features

* Modern React frontend with Tailwind CSS
* SEO-optimized marketing pages
* Dynamic blog powered by Sanity CMS
* Study destination comparison tools
* Consultation booking via Calendly
* Responsive, mobile-friendly design

## Core Services Highlighted

* Course and country selection
* University applications
* SOP and personal statement guidance
* Admission follow-up
* Visa document guidance
* Pre-departure support
* Arrival support

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Framer Motion

### CMS

* Sanity Studio
* GROQ queries
* Portable Text

### Integrations

* Calendly
* Google Search Console
* Sitemap and robots.txt

## Project Structure

```text
src/
  components/
  pages/
    Home/
    Services/
    StudyDestinations/
    Blog/
    FAQ/
  lib/
    sanity/
  data/
sanity-studio/
public/
```

## Environment Variables

Create a `.env` file in the frontend project root:

```env
VITE_SANITY_PROJECT_ID=xxxxxx
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-05-01
```

## Sanity Studio

Sanity Studio is used to manage:

* Blog posts
* Categories
* Authors

## Running the Project

### Install Dependencies

```bash
npm install
```

### Start the Frontend

```bash
npm run dev
```

### Start Sanity Studio

```bash
cd sanity-studio
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

## SEO Features

* Custom SEO titles and descriptions
* Open Graph metadata
* Structured internal linking
* XML sitemap
* Robots.txt
* Blog content optimized for high-intent study abroad searches

## Primary CTA

Book a free consultation:

[https://calendly.com/aspiregateconsultingservices/consultation](https://calendly.com/aspiregateconsultingservices/consultation)

## Deployment

The frontend can be deployed to platforms such as Vercel, Netlify, or Cloudflare.

Sanity Studio can be deployed using:

```bash
npm run deploy
```

## Content Guidelines

The site avoids unsupported claims such as:

* Guaranteed admission
* Guaranteed visa approval
* 100% success rates

All content is designed to be accurate, trustworthy, and compliant.

## License

Proprietary © AspireGate Services Limited. All rights reserved.
