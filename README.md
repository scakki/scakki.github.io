# Shivayogi Akki — portfolio

A static GitHub Pages portfolio based on `sakki_BUResume-v2.pdf`: Binghamton University, RoLAC research, education, publications, and contact links. The existing warm visual style and personal biography are retained.

## Preview

No build step or package installation is required:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`. The site also works as a local HTML file. Google Fonts are optional; system fonts are used if they cannot load.

## Files

- `index.html`: content, responsive styles, and progressive scroll animations.
- `assets/Shivayogi-Akki-Resume.pdf`: the supplied resume, linked from this site. The profile repository has its own copy.

## GitHub contribution calendar

The GitHub section embeds the yearly heatmap from `https://ghchart.rshah.org/scakki`, using the independently hosted [GitHub Chart API](https://github.com/2016rshah/githubchart-api). It covers contributions visible through the public profile across all repositories. It is not a RoLAC-only event counter. The image is cached by the service and needs network access. If it cannot load, the page shows a message and retains links to GitHub.

The links open GitHub’s full profile and RoLAC activity overview. GitHub’s organization filter, contribution-type chart, year controls, and pinned repositories remain native GitHub features. Enable those through the account settings described in [the profile setup guide](https://github.com/scakki/scakki/blob/main/SETUP.md). No scheduled workflow, personal access token, or organization credentials are needed for this website embed.

## Publish

Push this repository to `main`. In **Settings → Pages → Build and deployment**, verify **Deploy from a branch**, using **main / (root)**. The public site is `https://scakki.github.io/`. The `scakki` profile repository is published separately.

When replacing the resume, retain the asset filename so the website link continues to work, and replace the separate resume copy in the profile repository.
