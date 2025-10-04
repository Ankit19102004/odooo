@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Karla:wght@300;400;500;600;700&display=swap');

@custom-variant dark (&:is(.dark *));

:root {
  --font-size: 16px;
  --background: #DED1C6;
  --foreground: #0F2D4D;
  --card: #F9FAFB;
  --card-foreground: #0F2D4D;
  --popover: #F9FAFB;
  --popover-foreground: #0F2D4D;
  --primary: #174871;
  --primary-foreground: #ffffff;
  --secondary: #A77693;
  --secondary-foreground: #ffffff;
  --muted: #DED1C6;
  --muted-foreground: #6B7280;
  --accent: #1E88E5;
  --accent-foreground: #ffffff;
  --destructive: #E53935;
  --destructive-foreground: #ffffff;
  --success: #43A047;
  --success-foreground: #ffffff;
  --border: rgba(15, 45, 77, 0.1);
  --input: transparent;
  --input-background: rgba(249, 250, 251, 0.8);
  --switch-background: #cbced4;
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --ring: #174871;
  --chart-1: #174871;
  --chart-2: #1E88E5;
  --chart-3: #A77693;
  --chart-4: #43A047;
  --chart-5: #E53935;
  --radius: 1rem;
  --sidebar: rgba(249, 250, 251, 0.8);
  --sidebar-foreground: #0F2D4D;
  --sidebar-primary: #174871;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: rgba(167, 118, 147, 0.1);
  --sidebar-accent-foreground: #0F2D4D;
  --sidebar-border: rgba(15, 45, 77, 0.1);
  --sidebar-ring: #174871;
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-input-background: var(--input-background);
  --color-switch-background: var(--switch-background);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
  }
}

/**
 * Base typography. This is not applied to elements which have an ancestor with a Tailwind text class.
 */
@layer base {
  :where(:not(:has([class*=" text-"]), :not(:has([class^="text-"])))) {
    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 2.25rem;
      font-weight: 700;
      line-height: 1.3;
      color: #A77693;
    }

    h2 {
      font-family: 'Playfair Display', serif;
      font-size: 1.875rem;
      font-weight: 600;
      line-height: 1.3;
      color: #A77693;
    }

    h3 {
      font-family: 'Karla', sans-serif;
      font-size: 1.125rem;
      font-weight: 600;
      line-height: 1.4;
      color: #0F2D4D;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    h4 {
      font-family: 'Karla', sans-serif;
      font-size: 1rem;
      font-weight: 600;
      line-height: 1.4;
      color: #0F2D4D;
    }

    p {
      font-family: 'Karla', sans-serif;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.6;
      color: #0F2D4D;
    }

    label {
      font-family: 'Karla', sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.4;
      color: #0F2D4D;
    }

    button {
      font-family: 'Karla', sans-serif;
      font-size: 1rem;
      font-weight: 500;
      line-height: 1.4;
    }

    input {
      font-family: 'Karla', sans-serif;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.4;
      color: #0F2D4D;
    }
  }
}

html {
  font-size: var(--font-size);
}

/* Custom 3D effects and animations */
@layer utilities {
  .card-3d {
    background: linear-gradient(145deg, rgba(249, 250, 251, 0.9), rgba(222, 209, 198, 0.3));
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 
      0 8px 32px rgba(15, 45, 77, 0.1),
      0 2px 8px rgba(167, 118, 147, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .card-3d:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 
      0 20px 40px rgba(15, 45, 77, 0.15),
      0 8px 16px rgba(167, 118, 147, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
  }

  .glass-effect {
    background: rgba(249, 250, 251, 0.1);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .floating-card {
    transform: perspective(1000px) rotateX(2deg) rotateY(-2deg);
    transition: transform 0.3s ease;
  }

  .floating-card:hover {
    transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-8px);
  }

  .glow-effect {
    box-shadow: 0 0 20px rgba(30, 136, 229, 0.3);
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-shimmer {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .parallax-element {
    transform: translateZ(0);
    will-change: transform;
  }
}
