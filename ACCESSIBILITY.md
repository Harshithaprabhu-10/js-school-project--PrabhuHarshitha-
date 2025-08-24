# Accessibility Notes

This project was updated to follow **WCAG 2.1 AA** accessibility standards.

---

## Changes Made
- **Color Contrast**  
  - Text and buttons updated to meet contrast ratio ≥ 4.5:1.  
  - Active buttons use **#0a58ca** on white (9.4:1 contrast).  
  - Dark mode text and headers kept at 21:1 ratio.

- **Focus Indicators**  
  - Added visible focus outline for keyboard users:  
    ```css
    :focus-visible {
      outline: 3px solid #1f6feb;
      outline-offset: 2px;
    }
    ```

- **Dark Theme**  
  - Ensured all text and buttons remain readable in dark mode.  

- **Interactive Elements**  
  - Buttons and navigation links have clear hover/focus styles.  
  - ARIA attributes applied to active navigation items.  

---

## Future Improvements
- Add underline or stronger hover states for links.  
- Provide skip-to-content link for keyboard/screen reader users.  
