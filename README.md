# A Little Universe of Us — Birthday Website

A cinematic, romantic birthday website built with vanilla HTML, CSS, and
JavaScript (Three.js, GSAP, ScrollTrigger). It is designed to run with the
VS Code Live Server extension (or any static server) and has no build step.

## Project structure

```
birthday-website/
├── index.html
├── style.css
├── script.js
├── images/
│   ├── photo01.jpg … photo20.jpg
│   └── thumbs/
│       └── photo01.jpg … photo20.jpg
├── music/
│   └── birthday.mp3
├── media/
│   ├── memory.mp4
│   └── memory-poster.jpg
├── vendor/
│   ├── three.min.js
│   ├── gsap.min.js
│   └── ScrollTrigger.min.js
└── README.md
```

## Run locally with VS Code Live Server

1. Open the `birthday-website` folder in VS Code.
2. Install the **Live Server** extension (ritwickdey.liveserver) if you
   haven't already.
3. Right-click `index.html` and choose **Open with Live Server**.
4. The site opens at `http://127.0.0.1:5500` (or a similar port).
5. Click **Open My Heart ❤️** to start the experience and the music.

You can also run any static server, for example:

```bash
python -m http.server 5500
```

Then open `http://127.0.0.1:5500`.

## Music

- Place your track at `music/birthday.mp3`.
- The current track is the user-provided `musicbirthday.mp3` (3:04, 320 kbps).
- Music starts only after **Open My Heart ❤️** is clicked, so the
  browser's autoplay policy is satisfied.
- The dock in the bottom-right corner has play/pause and mute controls.

## Photos

- All 20 photos are used as-is, without editing faces or inventing
  events.
- They are stored as `images/photo01.jpg` … `images/photo20.jpg`.
- Matching thumbnails live in `images/thumbs/photo01.jpg` …
  `photo20.jpg` and are used for the gallery grid; the full files open
  in the lightbox.
- If you replace a photo, keep the same filename and the same aspect
  ratio, or update the `w` / `h` values in `script.js` (`photos` array).

### Image-path troubleshooting

- Always open the site through a server (`http://`), never `file://`.
  `file://` blocks some features (audio autoplay, smooth scrolling) and
  can break relative paths.
- Keep the folder structure flat: `index.html` must be next to `images/`,
  `music/`, `media/`, and `vendor/`. Do not move `index.html` into a
  subfolder without updating the relative paths.
- If photos don't load, check the browser console for 404 errors and
  confirm the filenames match exactly (`photo01.jpg`, lowercase).
- On case-sensitive hosts (Linux, most static hosts), `Photo01.JPG` and
  `photo01.jpg` are different files. Use lowercase names.
- The vendor libraries are vendored locally, so the site works offline.

## Deployment

Any static host works: GitHub Pages, Netlify, Vercel, Cloudflare Pages.

### GitHub Pages

1. Create a repository and push the contents of `birthday-website/` (not
   the parent folder).
2. In the repository settings, enable **Pages** with the branch `main`
   and folder `/ (root)`.
3. Wait for the build; the site is served at
   `https://your-username.github.io/repo-name/`.

### Netlify / Vercel

1. Drag-and-drop the `birthday-website` folder onto the Netlify dashboard,
   or run `vercel` in the folder.
2. No build command is needed; publish directory is the project root.

## Notes

- Reduced-motion preferences are respected; animations are shortened or
  disabled.
- The site is fully responsive (desktop, tablet, mobile).
- No personal data is collected; everything runs in the browser.
