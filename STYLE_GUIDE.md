# Sifera Style Guide - Modern Luxury Coffee & Book Cafe Design

## Brand Identity

### Visual Philosophy
Sifera's design embodies a **modern, luxury coffee and book cafe aesthetic** with:
- **Warmth** through sophisticated coffee browns
- **Elegance** through refined spacing and typography  
- **Community** through inviting layouts and smooth interactions
- **Quality** through attention to detail and premium materials

---

## Color System

### Primary Brand Colors

```
Primary:         #3D2817    (Rich Coffee Brown)
Primary Dark:    #2D1F10    (Deeper for hover states)
Secondary:       #8B7355    (Elegant Warm Taupe)
Accent:          #D4AF6A    (Premium Champagne Gold)
Background:      #F5F1ED    (Sophisticated Cream)
Foreground:      #2D2420    (Deep Coffee Text)
```

### How to Use

**Primary** - Used for:
- Main navigation bar
- Buttons (primary action)
- Footer background
- Sidebar background
- Important UI elements

**Accent (Gold)** - Used for:
- Highlighted text and links
- Badges and status indicators
- Active states
- Borders and dividers
- Interactive highlights

**Background** - Used for:
- Page backgrounds
- Section backgrounds
- Card backgrounds (with border)

**Secondary (Taupe)** - Used for:
- Secondary buttons
- Hover states
- Alternative highlights

---

## Typography

### Font Families

**Headings: Playfair Display**
- Serif font
- Literary, luxurious feel
- Used for: H1, H2, H3, H4

**Body: Inter**
- Sans-serif font
- Clean, modern, highly readable
- Used for: Body text, labels, buttons

### Type Scale

```
H1: 3.5rem (56px) | Weight: 700 | Line-height: 1.1
H2: 2.5rem (40px) | Weight: 600 | Line-height: 1.3
H3: 1.75rem (28px) | Weight: 600 | Line-height: 1.4
H4: 1.25rem (20px) | Weight: 600 | Line-height: 1.5
Body: 1rem (16px) | Weight: 400 | Line-height: 1.6
Small: 0.875rem (14px) | Weight: 400 | Line-height: 1.5
```

### Best Practices

- Use `text-balance` for headings for optimal wrapping
- Use `text-pretty` for longer body text
- Maintain 1.4-1.6 line-height for readability
- Use letter-spacing sparingly for luxury feel

---

## Spacing & Layout

### Spacing Scale

```
xs:   0.5rem  (8px)
sm:   1rem    (16px)
md:   1.5rem  (24px)
lg:   2rem    (32px)
xl:   3rem    (48px)
2xl:  4rem    (64px)
3xl:  6rem    (96px)
```

### Section Spacing

- **Top/Bottom Padding:** 5-8rem for major sections
- **Horizontal Padding:** 1-2rem for containers
- **Gap Between Elements:** 1.5-2rem
- **Card Padding:** 1.5-2rem
- **Button Padding:** 0.75-1rem

### Max-width
- **Container:** 1280px (max-w-7xl)
- **Content:** Full container width
- **Text Column:** 42-50 characters per line

---

## Components & Patterns

### Buttons

**Primary Button**
```
Background: #3D2817 (Primary)
Text: White
Padding: 0.875rem 2rem
Border-radius: 0.5rem
Hover: Darker background, lift effect (-2px), shadow
Transition: 200ms ease-out
```

**Secondary Button**
```
Background: Transparent
Border: 2px solid #D4AF6A (Accent)
Text: #D4AF6A
Padding: 0.875rem 2rem
Border-radius: 0.5rem
Hover: Background fill
```

**Ghost Button**
```
Background: Transparent
Text: #3D2817
Border: 1px solid #DDD4CC
Padding: 0.75rem 1.5rem
Hover: Background color, border color change
```

### Cards

**Basic Card**
```
Background: #FEFBF8 (Card color)
Border: 1px solid #DDD4CC
Border-radius: 0.75rem
Padding: 1.5rem
Box-shadow: 0 1px 2px rgba(0,0,0,0.05)
Hover: Border color → accent, shadow increase
```

**Featured Card**
```
Same as basic, with:
Top border: 3px solid #D4AF6A (gradient effect)
On hover: Lift effect (-4px), shadow-lg
```

### Inputs & Forms

**Input Field**
```
Border: 1px solid #DDD4CC
Border-radius: 0.5rem
Padding: 0.75rem 1rem
Background: #F5F1ED
Focus: Border color → accent, shadow
Placeholder: #9E8E83 (Muted)
```

**Labels**
```
Font-size: 0.875rem
Font-weight: 500
Color: #6B5D54 (Text secondary)
Margin-bottom: 0.5rem
```

### Badges & Status

**Status Badge**
```
Padding: 0.25rem 0.75rem
Border-radius: 9999px
Font-size: 0.75rem
Font-weight: 600
Border: 1px solid
Background opacity: 10%
Text opacity: 100%

Colors:
- Success: #6B8E6F
- Warning: #D4A574
- Error: #B85C5C
- Info: #D4AF6A
```

### Navigation

**Nav Link - Desktop**
```
Text: 0.875rem
Weight: 500
Color: White
Hover: Color → #D4AF6A
Active: Color → #D4AF6A, underline appears
Underline: 2px solid, bottom border
Transition: 200ms ease-out
```

**Nav Link - Mobile**
```
Display: Block
Padding: 0.75rem 1rem
Border-radius: 0.5rem
Hover: Background → rgba(255,255,255,0.05)
Active: Background → rgba(255,255,255,0.1), left border
```

---

## Interactions & Animations

### Hover States

**Buttons:**
- Background color transition
- Slight lift (transform: translateY(-2px))
- Shadow increase
- 200ms ease-out timing

**Links:**
- Color transition to accent
- 200ms ease-out timing
- Underline appears (optional)

**Cards:**
- Border color to accent
- Shadow increase
- Slight lift (transform: translateY(-4px))
- 300ms ease-out timing

### Page Transitions

```css
/* Fade in */
animation: fadeIn 300ms ease-out;

/* Fade up */
animation: fadeInUp 300ms ease-out;

/* Slide down */
animation: slideInDown 300ms ease-out;

/* Scale in */
animation: scaleIn 300ms ease-out;
```

### Timing

- **Fast:** 150ms (micro-interactions)
- **Normal:** 200ms (button hover, link color change)
- **Slow:** 300ms (page transitions, card animations)

### Easing

- **ease-out:** Primary easing function
- **linear:** For continuous animations (carousels)
- Avoid ease-in for user-initiated actions

---

## Shadows

### Shadow Scale

```
sm:  0 1px 2px rgba(0, 0, 0, 0.05)
md:  0 2px 8px rgba(0, 0, 0, 0.08)
lg:  0 4px 16px rgba(0, 0, 0, 0.1)
xl:  0 8px 24px rgba(0, 0, 0, 0.12)
```

### When to Use

- **sm:** Default card shadow
- **md:** Hover state for cards
- **lg:** Modals, important elements
- **xl:** Elevated sections, dropdowns

---

## Accessibility

### Color Contrast

All text combinations must meet WCAG AA standards:
- Text on background: 4.5:1 contrast ratio minimum
- Large text (18pt+): 3:1 contrast ratio minimum
- Never rely on color alone for meaning

### Semantic HTML

- Use proper heading hierarchy (h1 → h6)
- Use semantic elements: `<main>`, `<header>`, `<footer>`, `<nav>`
- Use `<button>` for buttons, `<a>` for links
- Use `<form>` for form elements

### ARIA Labels

- Add `alt` text to images
- Use `aria-label` for icon buttons
- Use `role` attributes where needed
- Add `aria-current` to active navigation

---

## Dark Mode (Future Implementation)

When implementing dark mode:

**Dark Theme Colors:**
```
Background: #1a1a1a
Foreground: #f5f1ed
Primary: #8B7355 (becomes lighter)
Accent: #D4AF6A (same)
Card: #262626
Border: #404040
```

**Key Changes:**
- Invert background and foreground
- Adjust shadows (lighter)
- Increase icon opacity where needed
- Test all contrast ratios

---

## Responsive Breakpoints

```
Mobile:    0 - 640px  (sm)
Tablet:    640px - 1024px (md, lg)
Desktop:   1024px+ (xl, 2xl)
```

### Mobile-First Approach

1. Design for mobile first
2. Add tablet enhancements at 768px
3. Add desktop enhancements at 1024px
4. Test all sizes

### Common Patterns

**Grid Columns:**
- Mobile: 1-2 columns
- Tablet: 2-3 columns
- Desktop: 3-4 columns

**Spacing:**
- Mobile: Reduce all spacing by 50%
- Tablet: 75% of desktop
- Desktop: Full spacing

---

## Images & Media

### Image Treatment

**Featured Images:**
```
Aspect ratio: 16:9 or 4:3
Border-radius: 0.75rem or 1rem
Shadow: md or lg
On hover: Scale 110%, overlay appears
Transition: 500ms ease-out
```

**Product Images:**
```
Aspect ratio: 1:1 (square)
Border-radius: 0.75rem
Shadow: md
On hover: Scale 105%, overlay
Transition: 300ms ease-out
```

### Overlays

**Gradient Overlay (Images):**
```css
background: linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2), transparent);
opacity: 0 (hover: 1);
transition: 300ms ease-out;
```

---

## Components Checklist

### Frontend Components
- [ ] Navigation
- [ ] Hero Section
- [ ] Feature Cards
- [ ] Product Cards
- [ ] Event Cards
- [ ] Book Category Cards
- [ ] Footer
- [ ] Buttons (all variants)
- [ ] Forms
- [ ] Modals
- [ ] Toast Notifications
- [ ] Badges
- [ ] Tables
- [ ] Pagination
- [ ] Filters
- [ ] Search Bar

### Admin Components
- [ ] Sidebar
- [ ] Dashboard Cards
- [ ] Tables with sorting
- [ ] Forms
- [ ] Charts
- [ ] Status Indicators
- [ ] Action Buttons
- [ ] Modals
- [ ] Dropdowns
- [ ] Date Pickers
- [ ] Color Pickers
- [ ] File Uploads

---

## Implementation Tips

### CSS Best Practices

1. **Use Tailwind Classes:** Prefer Tailwind utility classes
2. **Design Tokens:** Use CSS variables from globals.css
3. **Avoid Hardcoding:** Never hardcode colors or spacing
4. **Semantic Naming:** Use meaningful class names
5. **Group Related Styles:** Keep related utilities together

### Performance

1. **Image Optimization:** Use next/image component
2. **Lazy Loading:** Implement for below-fold content
3. **CSS Transforms:** Only use transforms for animations
4. **Minimal JS:** Prefer CSS for interactions
5. **Code Splitting:** Split large pages into components

### Testing

1. **Cross-browser:** Test in Chrome, Firefox, Safari, Edge
2. **Responsive:** Test all breakpoints
3. **Accessibility:** Run WCAG AA audit
4. **Performance:** Check Core Web Vitals
5. **Interaction:** Test all hover states and animations

---

## Brand Voice

The design should feel:
- **Luxurious:** Premium materials and spacing
- **Welcoming:** Warm colors and open layouts
- **Literate:** Sophisticated typography
- **Modern:** Clean lines and smooth interactions
- **Trustworthy:** Consistent and professional
- **Community-focused:** Open, inviting spaces

---

## Resources

- Color Palette: Documented in `tailwind.config.ts`
- Typography: Google Fonts (Playfair Display + Inter)
- Icons: Feather Icons or similar (avoid emojis)
- Documentation: `DESIGN_IMPLEMENTATION.md`

---

This style guide ensures consistency across Sifera and guides all future design decisions. Update it as the brand evolves.
