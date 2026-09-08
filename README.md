# Scotty Bowden - Professional GitHub Pages

A professional portfolio and resume site built with static HTML/CSS for internal consumption. This site showcases enterprise technology experience, key projects, and professional capabilities.

## Site Structure

```
├── index.html              # Home/landing page
├── resume.html             # Professional resume and experience
├── projects.html           # Portfolio of technical projects
├── css/
│   └── styles.css          # Main stylesheet with light/dark theme
├── js/
│   └── script.js           # Interactive features and animations
├── assets/                 # Images, documents, and media
└── README.md              # This file
```

## Pages

### Home (`index.html`)
- Hero section with professional headline
- Key focus areas and highlights
- About section with professional summary
- Contact information

### Resume (`resume.html`)
- Professional summary
- Core competencies organized by category
- Complete work experience and employment history
- Education and certifications
- Career objectives

### Projects (`projects.html`)
- HP DMI Branding Tool (Electron + Playwright + SQLite)
- Enterprise Workstation Prep & Hardening (PowerShell automation)
- Event Viewer Analysis & Incident Remediation (AI-assisted security ops)
- AI-Assisted Inventory & Reporting
- Local Web UI for PowerShell Operations
- Atlas Learning Systems Initiative (R&D)

## Design Features

### Color Scheme
- **Light Mode:** Clean white background with professional blue accent
- **Dark Mode:** Dark theme respecting system preferences (`prefers-color-scheme`)
- Colors defined as CSS variables for easy customization

### Typography
- System UI font stack (San Francisco, Segoe UI, etc.)
- JetBrains Mono for code blocks
- Responsive font sizing

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px (tablet) and 480px (mobile)
- Flexible grid layouts
- Optimized for all screen sizes

### Accessibility
- Semantic HTML structure
- Proper heading hierarchy
- Color contrast compliance
- Keyboard-navigable links
- ARIA-ready structure

### Print Optimization
- Print stylesheet hides navigation and footer
- Resume-optimized layout for printing
- Proper page break handling

## Development

### Local Testing
1. Open `index.html` in a web browser
2. Use a local development server for better performance:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (with http-server)
   npx http-server
   ```
3. Visit `http://localhost:8000`

### Customization
- Edit `.html` files for content changes
- Modify `css/styles.css` for styling
- Update `js/script.js` for interactive features
- CSS variables can be adjusted in `:root` selector

## Deployment

### GitHub Pages Setup

1. Use the existing personal Pages repository named `resume.github.io`
2. Clone the repository:
   ```bash
   git clone https://github.com/sbowden94/resume.github.io.git
   cd resume.github.io
   ```
3. Add project files to the repository
4. Push to GitHub:
   ```bash
   git add .
   git commit -m "Initial site deployment"
   git push origin main
   ```
5. Visit `https://sbowden94.github.io/resume.github.io/`

### Deployment from VS Code

Use Git integration to commit and push changes:
1. Stage files (`Ctrl+Shift+G`)
2. Commit with message
3. Push to remote

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- No external dependencies (CSS/JS only)
- Fast page load times
- Optimized for internal network delivery
- Lightweight asset footprint

## Maintenance

- Update resume content in `resume.html`
- Add new projects to `projects.html`
- Modify colors in `css/styles.css` `:root` selector
- Update contact links as needed

## License

All content is proprietary and intended for professional use.

---

**Built for internal consumption.** For inquiries, contact bowden.scotty@mayo.edu
