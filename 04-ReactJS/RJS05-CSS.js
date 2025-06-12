
// css 

// 🎨 STYLING IN REACT
// 67 - Inline styling
// 68 - CSS Modules
// 69 - Styled-components
// 70 - Tailwind CSS in React
// 71 - Classname conditionals (clsx, classnames)


///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////


// Topic 67: Inline Styling in React – Detailed Notes and Code Examples
//
// Inline styling allows you to apply CSS styles directly to React elements via the style
// prop using JavaScript objects. This enables dynamic, component-scoped styles without
// external CSS files or preprocessor dependencies.
//
// Key Concepts:
// 1. style Prop:
//    • Accepts a JS object mapping camelCased CSS properties to values.
//      e.g., <div style={{ backgroundColor: 'red', fontSize: '16px' }}>...
// 2. Dynamic Values:
//    • Compute style values based on props or state.
//      e.g., style={{ width: `${percentage}%` }}
// 3. Vendor Prefixes:
//    • React handles known vendor prefixes automatically.
//    • Use camelCase: WebkitTransition, MozTransition, etc.
// 4. Combining Styles:
//    • Merge style objects via spread: const combined = { ...base, color: 'blue' };
// 5. Performance:
//    • Defining style objects inline creates new references each render.
//    • Memoize dynamic styles with useMemo or define static styles outside components.
//
import React, { useState, useMemo } from 'react';

// Example 1: Basic Inline Styles
export function StyledBox() {
  return (
    <div
      style={{
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '4px',
      }}
    >
      Inline styled box
    </div>
  );
}

// Example 2: Dynamic Inline Styles Based on State
export function DynamicBox() {
  const [highlight, setHighlight] = useState(false);
  const style = useMemo(
    () => ({
      padding: '20px',
      backgroundColor: highlight ? '#ff0' : '#fff',
      border: '1px solid #000',
    }),
    [highlight]
  );

  return (
    <div style={style} onClick={() => setHighlight(prev => !prev)}>
      Click to {highlight ? 'remove' : 'add'} highlight
    </div>
  );
}

// Example 3: Merging Styles and Props
const baseStyle = { margin: '10px', fontFamily: 'Arial' };
export function MergedStylesBox({ color }) {
  const style = useMemo(
    () => ({
      ...baseStyle,
      color,
      fontSize: '14px',
    }),
    [color]
  );

  return <p style={style}>This text is {color}</p>;
}

// Example 4: Responsive Inline Styles
export function ResponsiveBox({ width }) {
  const style = useMemo(
    () => ({
      width: width > 500 ? '500px' : `${width}px`,
      height: '100px',
      backgroundColor: '#ddd',
    }),
    [width]
  );

  return <div style={style}>Responsive width: {style.width}</div>;
}

// Notes:
// • Use camelCase for CSS property names in JS.
// • Memoize dynamic style objects to prevent unnecessary re-renders.
// • For complex styling needs (pseudo-classes, media queries), consider CSS-in-JS libraries like styled-components or Emotion.

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////


// Topic 68: CSS Modules – Detailed Notes and Code Examples
//
// CSS Modules allow locally scoped CSS by automatically generating unique class names,
// preventing naming collisions and enabling modular, maintainable styles.
//
// Key Concepts:
// 1. Setup:
//    • Name stylesheet file with .module.css extension.
//    • Import styles as an object: import styles from './Button.module.css';
//
// 2. Usage:
//    • Apply classes via className={styles.className}.
//    • Classes are scoped locally to the component.
//
// 3. Dynamic Class Names:
//    • Combine multiple classes: className={`${styles.primary} ${styles.large}`}
//    • Use libraries like clsx for conditional class merging.
//
// 4. Composition:
//    • Compose classes in CSS: .buttonPrimary { composes: baseButton; }
//    • Enables reuse of style rules across modules.
//
// 5. Theming and Variables:
//    • Use CSS custom properties or preprocessor features inside modules.
//
// Example: CSS Module File (Button.module.css)
// .button {
//   padding: 8px 16px;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
// }
// .primary {
//   background-color: #007bff;
//   color: white;
// }
// .large {
//   font-size: 18px;
// }

// Example Component Using CSS Modules
import React from 'react';
import styles from './Button.module.css';

export function Button({ primary, large, children, onClick }) {
  const classNames = [styles.button];
  if (primary) classNames.push(styles.primary);
  if (large) classNames.push(styles.large);

  return (
    <button className={classNames.join(' ')} onClick={onClick}>
      {children}
    </button>
  );
}

// Usage:
// <Button primary large onClick={() => alert('Clicked')}>Click Me</Button>

// Notes:
// • CSS Modules integrate seamlessly with Create React App and Webpack setups.
// • Class names are hashed at build time, ensuring style encapsulation.
// • For conditional styles, clsx or classnames libraries streamline className logic.
// • Combine CSS Modules with CSS variables for theme support.

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

// Topic 69: Styled-Components – Detailed Notes and Code Examples
//
// Styled-components is a CSS-in-JS library that allows you to write actual CSS
// code to style components, leveraging tagged template literals. It enables
// scoped styles, dynamic theming, and removal of CSS class name collisions.
//
// Key Concepts:
// 1. Installation:
//    • npm install styled-components
//    • yarn add styled-components
//
// 2. Creating Styled Components:
//    • Import styled: import styled from 'styled-components';
//    • Define styled element: const Button = styled.button`...css...`;
//
// 3. Dynamic Props:
//    • Use component props to conditionally set styles.
//      e.g., background: ${props => props.primary ? 'blue' : 'gray'};
//
// 4. Theming:
//    • Use ThemeProvider to supply theme object.
//    • Access theme via props.theme in styled components.
//
// 5. Extending Styles:
//    • Extend existing styled component: const BigButton = styled(Button)`font-size: 20px;`;
//
// 6. Global Styles:
//    • Create global CSS: import { createGlobalStyle } from 'styled-components';
//    • Define and include <GlobalStyle /> at root.
//
// Example: Basic Styled Button
import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

// Global styles
const GlobalStyle = createGlobalStyle`  
  body { margin: 0; font-family: Arial, sans-serif; }
`;

// Themed button
const Button = styled.button`
  background: ${props => props.primary ? props.theme.primaryColor : 'white'};
  color: ${props => props.primary ? 'white' : props.theme.primaryColor};
  padding: 8px 16px;
  border: 2px solid ${props => props.theme.primaryColor};
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  &:hover { opacity: 0.8; }
`;

// Extended button
const BigButton = styled(Button)`
  font-size: 1.5rem;
  padding: 12px 24px;
`;

// Theme object
const theme = {
  primaryColor: '#007bff'
};

// Usage in component
export function StyledComponentsDemo() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Button primary onClick={() => alert('Primary clicked')}>Primary</Button>
        <Button onClick={() => alert('Default clicked')} style={{ marginLeft: '8px' }}>Default</Button>
        <BigButton primary style={{ marginLeft: '8px' }}>Big Primary</BigButton>
      </>
    </ThemeProvider>
  );
}

// Notes:
// • Props and themes enable dynamic styling across components.
// • createGlobalStyle helps manage global CSS resets and base styles.
// • styled-components handles CSS scoping and removes class name collisions.
// • Use .attrs to set static or dynamic HTML attributes on styled components.
// • Supports server-side rendering and theming via ThemeProvider.

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////


// Topic 70: Tailwind CSS in React – Detailed Notes and Code Examples
//
// Tailwind CSS is a utility-first CSS framework that allows rapid UI development
// by composing utility classes directly in JSX, promoting consistency and eliminating
// the need for custom CSS files.
//
// Key Concepts:
// 1. Installation:
//    • npm install -D tailwindcss postcss autoprefixer
//    • npx tailwindcss init -p  // generates tailwind.config.js and postcss.config.js
//
// 2. Configuration (tailwind.config.js):
//    module.exports = {
//      content: ['./src/**/*.{js,jsx,ts,tsx}'],
//      theme: { extend: {} },
//      plugins: [],
//    };
//
// 3. Import Base Styles (index.css):
//    @tailwind base;
//    @tailwind components;
//    @tailwind utilities;
//
// 4. Usage in JSX:
//    • Apply utility classes via className: className="bg-blue-500 text-white p-4 rounded"
//    • Compose responsive variants: className="text-lg md:text-xl lg:text-2xl"
//
// Example: Card Component with Tailwind
import React from 'react';

export function TailwindCard({ title, children }) {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2 text-gray-800">{title}</h2>
        <p className="text-gray-700 text-base">{children}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          Action
        </button>
      </div>
    </div>
  );
}

// Example: Responsive Navbar with Tailwind
export function TailwindNavbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4 text-white">
        <li className="hover:text-gray-400"><a href="/">Home</a></li>
        <li className="hover:text-gray-400"><a href="/about">About</a></li>
        <li className="hover:text-gray-400"><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
}

// Notes:
// • Tailwind’s JIT compiler generates only used styles, keeping bundle size small.
// • Use the Tailwind CLI or PostCSS integration to build styles in your React project.
// • For conditional classes, use libraries like clsx or classnames: classnames('p-4', isActive && 'bg-blue-200').
// • Customize theme colors, spacing, and breakpoints via tailwind.config.js.

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////


// Topic 71: Classname Conditionals – clsx and classnames
//
// Conditionally combining class names in React is common when you need to
// apply different styles based on props or state. Libraries like clsx and
// classnames simplify this by handling falsy values and array/object syntax.
//
// Key Concepts:
// 1. Installation:
//    • npm install clsx
//    • npm install classnames
//
// 2. Basic Usage with clsx:
//    • import clsx from 'clsx';
//    • clsx('base', condition && 'modifier', ['array', 'of', 'classes'])
//
// 3. Basic Usage with classnames:
//    • import classNames from 'classnames';
//    • classNames('base', { modifier: condition }, ['array', 'of', 'classes'])
//
// 4. Object Syntax:
//    • clsx({ active: isActive, disabled: !isEnabled })
//    • classNames({ active: isActive, disabled: !isEnabled })
//
// 5. Array Syntax:
//    • clsx(['btn', isPrimary && 'btn-primary', extraClass])
//    • classNames(['btn', isPrimary && 'btn-primary', extraClass])
//
// 6. Performance:
//    • Both libraries handle short-circuiting and avoid overhead of manual string concatenation.
//
import React from 'react';
import clsx from 'clsx';
import classNames from 'classnames';

// Example 1: Using clsx for button classes
export function ClsxButton({ primary, disabled, className, children }) {
  const buttonClass = clsx(
    'btn px-4 py-2 rounded',
    primary ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );
  return (
    <button className={buttonClass} disabled={disabled}>
      {children}
    </button>
  );
}

// Example 2: Using classnames for alert component
export function Alert({ type, dismissible, className, children }) {
  const alertClass = classNames(
    'alert p-4 rounded mb-4',
    {
      'alert-success bg-green-100 text-green-800': type === 'success',
      'alert-error bg-red-100 text-red-800': type === 'error',
      'alert-warning bg-yellow-100 text-yellow-800': type === 'warning',
    },
    dismissible && 'alert-dismissible',
    className
  );
  return (
    <div className={alertClass} role="alert">
      {children}
      {dismissible && <button className="close" aria-label="Close">×</button>}
    </div>
  );
}

// Notes:
// • clsx and classnames support nested arrays and objects for flexibility.
// • Pass additional className prop to extend styles.
// • Avoid manual string concatenation; these libraries handle falsy values elegantly.

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
