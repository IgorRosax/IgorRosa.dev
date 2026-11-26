# Personal Homepage

Minimalist, single-column personal website, project index, and academic showcase. Built with semantic HTML5, modern CSS3, and vanilla JavaScript — zero external frameworks or build steps required.

## Architecture & Design Principles

- **Zero Dependencies:** Pure HTML, CSS, and ES6+ JavaScript for instant load times and trivial long-term maintenance.
- **Data-Driven Content:** All portfolio entries, experience timelines, and publications are decoupled from the markup and managed via `data/content.js`.
- **Theming:** System-aware Dark and Light modes using CSS custom properties (`:root`), persisted via `localStorage`.
- **Typography & Layout:** Single-column reading layout (`max-width: 700px`) pairing **Inter** for body copy with **JetBrains Mono** for metadata, timelines, and technical tags.
- **Accessibility:** Semantic landmarks, keyboard navigation (`:focus-visible`), ARIA labels, and support for `prefers-reduced-motion`.

## Directory Structure

```text
.
├── index.html          # Main semantic markup and SEO/Open Graph metadata
├── css/
│   └── styles.css      # CSS variables, theme definitions, and responsive layout
├── js/
│   └── main.js         # DOM rendering logic and theme switcher
├── data/
│   └── content.js      # Structured data (projects, experience, publications)
└── assets/             # Static assets, favicons, and SVG icons
```

## Local Development

Since there is no compilation or bundling step, you can serve the project using any static file server:

```bash
# Using Python 3
python3 -m http.server 8000

# Or using Node.js (npx)
npx serve .
```

Alternatively, open `index.html` using the **Live Server** extension in VS Code.

## Content Updates

To add or edit projects, work experience, or academic publications, modify the exported objects inside `data/content.js`. The UI updates automatically on page reload without requiring changes to `index.html`.

## Deployment

Ready for static hosting out of the box. Connect the repository directly to **GitHub Pages**, **Cloudflare Pages**, or **Vercel** pointing to the root directory (`/`).

## License

MIT