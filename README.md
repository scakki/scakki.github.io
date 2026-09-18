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
- `assets/Shivayogi-Akki-Resume.pdf`: the supplied resume, linked from this site and the GitHub profile.
- `assets/rolac-activity.svg`: dated fallback snapshot of public lab activity.

The GitHub section normally loads the daily activity SVG from `scakki/scakki`. That repository owns the updater and GitHub Actions workflow; a failed image request falls back to this repository's local snapshot. Both the native contribution settings and the public-feed limits are documented in [the profile setup guide](https://github.com/scakki/scakki/blob/main/SETUP.md).

## Publish

Push this repository and the companion `scakki` profile repository to `main`. In this repository, verify **Settings → Pages → Build and deployment** is set to **Deploy from a branch**, using **main / (root)**. The public site is `https://scakki.github.io/`.

In the profile repository, check **Actions → Update public RoLAC activity** after publishing. No personal access token or organization credentials belong in this website. The initial local activity snapshot remains useful before the profile changes are published.

When replacing the resume, retain the asset filename so the website and profile links continue to work. Update the dated fallback card from the profile repository if you want a newer offline snapshot.
