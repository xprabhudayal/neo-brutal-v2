# Website Audit Findings & Remediation Plan

## Executive Summary
The portfolio website exhibits a strong visual identity with a consistent "Apple-inspired" aesthetic that transitions smoothly between light and dark modes. Performance is excellent, with fast load times and stable layout shifts (CLS 0.00). However, critical deficiencies in SEO (missing Open Graph tags, sparse descriptions) and Accessibility (missing ARIA labels, potential contrast issues in dark mode) must be addressed to meet professional standards. The "Talk to AI" feature is a standout innovation but requires better accessibility implementation.

## Critical Issues (Must Fix)

### 1. SEO & Metadata
*   **Severity:** Critical
*   **Locations:** Global (`/`, `/projects`, `/links`, `/resume`)
*   **Observation:**
    *   Missing `og:image`, `og:title`, `og:description`, and `twitter:card` tags on all pages.
    *   The `<meta name="description">` is generic or missing on some routes.
    *   No `canonical` URLs defined.
*   **Remediation:**
    *   Implement Next.js `metadata` API in `app/layout.tsx` for global defaults.
    *   Override `metadata` in each `page.tsx` with specific titles and descriptions.
    *   Add a high-quality `opengraph-image.png` to the `app/` root.

### 2. Accessibility
*   **Severity:** High
*   **Locations:** Global Navigation, Theme Toggle
*   **Observation:**
    *   The "TOGGLE THEME" button is accessible, but the mobile menu button (seen in snapshots as an unlabelled button) lacks an `aria-label`.
    *   The "Talk about me with AI" button in the footer covers content on mobile/smaller screens and might not be easily dismissible for keyboard users.
    *   Dark mode text contrast on the "Yellow" highlight elements (e.g., "AVAILABLE FOR WORK", "INTELLIGENT SYSTEMS") needs verification against WCAG AA standards (black text on yellow background is usually okay, but needs confirming specific hex values).
*   **Remediation:**
    *   Add `aria-label="Open Menu"` to the navigation hamburger button.
    *   Ensure the AI modal has a focus trap when open and returns focus to the trigger button when closed.

## Major Issues (Should Fix)

### 1. Content & Usability
*   **Severity:** Medium
*   **Locations:** `/projects`, `/resume`
*   **Observation:**
    *   Project images are large and might cause LCP issues on slower networks if not properly optimized (though strictly current LCP is good).
    *   The `/resume` page "Download PDF" button opens a raw PDF. It's better to force download or open in a new tab with `target="_blank"` and `rel="noopener noreferrer"`.
*   **Remediation:**
    *   Ensure all images use `next/image` with `sizes` prop correctly defined.
    *   Add `target="_blank"` to the resume download link.

## Minor Issues (Nice to Have)

### 1. Visual Consistency
*   **Severity:** Low
*   **Locations:** Dark Mode Transition
*   **Observation:**
    *   The "Talk to AI" button's white background in Dark Mode contrasts sharply with the dark theme. Consider inverting its colors for better integration.
*   **Remediation:**
    *   Style the "Talk to AI" button to respect the current theme (e.g., dark background with light text in dark mode).

## Detailed Route Analysis

| Route | Status | Key Issues |
| :--- | :--- | :--- |
| **/** | 🟡 | Missing meta description, Unlabelled menu button. |
| **/projects** | 🟡 | Missing alt text details on some decorative images (if any), SEO tags missing. |
| **/links** | 🟢 | Good layout, clear focus states. SEO tags missing. |
| **/resume** | 🟡 | PDF link behavior, text contrast in dark mode needs double-check. |

## Remediation Roadmap

1.  **Immediate (Day 1):** Fix `app/layout.tsx` metadata. Add ARIA labels to nav buttons.
2.  **Short Term (Day 2-3):** Audit color contrast in Dark Mode. Optimize "Talk to AI" button styling.
3.  **Long Term:** Implement full structured data (JSON-LD) for `Person` and `Portfolio`.
