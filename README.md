# Shivayogi Akki — research portfolio

A responsive static portfolio for robotics, reinforcement learning, and control research. Content is based on the local `scakki/README.md` and `scakki/assets/Shivayogi-Akki-Resume.pdf`.

## Preview

Open `index.html` directly in a browser. No build, installation, or network connection is needed for the layout and interactions.

Alternatively, from this directory:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Then visit `http://localhost:8000`.

## Files

- `index.html`: content, accessible inline SVG illustrations, and native expandable project details.
- `styles.css`: responsive layout, shared light/dark color tokens, local system fonts, and reduced-motion support.
- `theme.js`: applies the saved or system theme before the page renders.
- `script.js`: project filters, illustrative gait selector, and theme toggle. All projects remain readable without JavaScript.
- `assets/Shivayogi-Akki-Resume.pdf`: downloadable resume.

## Content and visuals

Simulation and physical-robot results are identified in their project descriptions. Numerical comparisons come from the supplied resume. The navigation project omits the ambiguous “92% across 10 trials” statistic rather than interpreting it as a binary trial-success rate. Publications retain their existing DOI links.

The walk/run/skip biped poses are conceptual SVG illustrations, not recordings, policy outputs, or measured trajectories. Project summaries use a consistent layout: contribution, result and evaluation setting, tools, and expandable methods. No external fonts, analytics, generated media, or third-party activity widgets are required.

Sections follow a single reading order: research, publications, background and skills, then contact. A page index links to each section. Contact links provide direct email, LinkedIn, GitHub, Scholar, and ORCID access.

## Color themes

Light mode uses slate text and teal accents on pale gray and white surfaces. Dark mode uses charcoal surfaces and mint accents, including the gait illustration. The header toggle remembers the choice in local storage. Without an explicit choice, the site follows the system color preference and responds to changes. If storage is unavailable, switching still works for the current page. With JavaScript disabled, CSS follows the system preference.

Browser checks cover 320, 390, 768, and 1440 pixel layouts; filters; gait selection; keyboard activation; expandable methods; reduced motion; and the no-JavaScript fallback. Theme checks cover system defaults, system changes, saved choices across reloads, and blocked storage.

## Publish

Commit and push this repository to its publishing branch when ready. GitHub Pages should deploy from `main` at the repository root. Local changes do not publish themselves. The separate `scakki` GitHub profile is not modified by this redesign.
