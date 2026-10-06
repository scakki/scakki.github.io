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
- `styles.css`: responsive layout, local system fonts, and reduced-motion support.
- `script.js`: project filters and an illustrative gait selector. All projects remain readable without JavaScript.
- `assets/Shivayogi-Akki-Resume.pdf`: downloadable resume.

## Content and visuals

Simulation and physical-robot results are identified in their project descriptions. Numerical comparisons come from the supplied resume. The navigation project omits the ambiguous “92% across 10 trials” statistic rather than interpreting it as a binary trial-success rate. Publications retain their existing DOI links.

The biped poses, gait traces, and navigation map are conceptual SVG illustrations, not recordings, policy outputs, or measured trajectories. The cost-of-transport chart and joint-fault success comparison show reported results. No external fonts, analytics, generated media, or third-party activity widgets are required.

The previous long biography and repeated resume lists have been condensed into selected project stories, research context, education, and a toolkit. Contact links provide direct email, LinkedIn, GitHub, Scholar, and ORCID access.

## Publish

Commit and push this repository to its publishing branch when ready. GitHub Pages should deploy from `main` at the repository root. Local changes do not publish themselves. The separate `scakki` GitHub profile is not modified by this redesign.
