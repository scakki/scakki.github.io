# Shivayogi Akki - Portfolio Website

A clean, professional portfolio website for showcasing academic research, projects, and experience in robotics and controls engineering.

## 📁 Project Structure

```
scakki.github.io/
├── index.html              # Original monolithic file (backup)
├── index-new.html          # New modular main file
├── css/
│   └── styles.css          # All CSS styles
├── js/
│   ├── script.js           # Core JavaScript functionality
│   └── page-loader.js      # Dynamic page loading system
├── pages/
│   ├── home.html           # About/Home page content
│   ├── publications.html   # Publications page content
│   ├── projects.html       # Projects page content
│   ├── experience.html     # Experience page content
│   └── skills.html         # Skills page content
├── config/
│   └── site-config.json    # Site configuration
└── README-new.md           # This documentation
```

## 🚀 Features

### Modular Architecture
- **Separated Concerns**: HTML structure, CSS styling, and JavaScript functionality are cleanly separated
- **Component-Based**: Each page is a separate HTML file for easy maintenance
- **Dynamic Loading**: Pages are loaded on-demand for better performance

### User Experience
- **Dark/Light Theme**: Toggle between themes with persistent preference storage
- **Responsive Design**: Mobile-first approach with clean breakpoints
- **Smooth Animations**: Subtle animations and transitions for professional feel
- **Fast Loading**: Cached page content and optimized assets

### Academic Focus
- **Professional Design**: Clean, academic-style layout
- **Timeline Views**: Education, experience, and project timelines
- **Publication Display**: Formatted academic publication listings
- **Technical Skills**: Organized skill categories with visual tags

## 🔧 Usage

### Development
1. Use `index-new.html` as your main file
2. Edit individual page content in the `pages/` directory
3. Modify styles in `css/styles.css`
4. Update site configuration in `config/site-config.json`

### Adding New Pages
1. Create a new HTML file in `pages/` directory
2. Add navigation entry to `config/site-config.json`
3. Update navigation in `index-new.html` if needed

### Customization
- **Colors**: Modify CSS custom properties in `:root` and `[data-theme="light"]`
- **Content**: Edit individual page files in `pages/` directory
- **Layout**: Adjust CSS Grid and Flexbox layouts in `styles.css`

## 📱 Responsive Breakpoints

- **Desktop**: > 768px - Full grid layout with sidebar
- **Mobile**: ≤ 768px - Stacked layout with collapsed navigation

## 🎨 Theme System

The website supports both light and dark themes:
- **Dark Theme**: Default GitHub-style dark colors
- **Light Theme**: Clean, professional light colors
- **Persistence**: Theme preference saved in localStorage

## 🔄 Migration from Original

To switch from the original `index.html` to the new modular system:

1. Rename current `index.html` to `index-backup.html`
2. Rename `index-new.html` to `index.html`
3. Test all page navigation and functionality
4. Update any external links pointing to the old structure

## 📋 Content Management

### Adding Publications
Edit `pages/publications.html` and add new publication items following the existing structure:

```html
<div class="publication-item">
    <div class="publication-marker"></div>
    <div class="publication-title">Your Publication Title</div>
    <div class="publication-venue">Venue Name, Year</div>
    <div class="publication-description">Description...</div>
</div>
```

### Adding Projects
Edit `pages/projects.html` and add new project items:

```html
<div class="project-item">
    <div class="project-marker"></div>
    <h3>Project Title</h3>
    <div class="project-meta">Date • Category</div>
    <div class="project-description">Description...</div>
    <div class="tech-tags">
        <span class="tech-tag">Technology</span>
    </div>
</div>
```

### Adding Experience
Edit `pages/experience.html` following the timeline structure.

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox
- **Vanilla JavaScript**: No external dependencies
- **Responsive Design**: Mobile-first approach

## 📈 Performance Features

- **Page Caching**: Loaded pages are cached in memory
- **Lazy Loading**: Pages loaded only when requested
- **Optimized CSS**: Efficient selectors and minimal redundancy
- **Fast Navigation**: Instant page switching after initial load

## 🔍 SEO Optimized

- Semantic HTML structure
- Meta descriptions and titles
- Clean URL structure
- Fast loading times

## 📞 Contact Information

The contact information is centralized in the sidebar and can be updated in `pages/home.html`.

---

**Note**: This modular structure makes the website much easier to maintain, update, and extend compared to the original monolithic HTML file.
