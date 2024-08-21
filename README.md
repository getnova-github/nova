# Nova CSS

Nova is a reimplementation of Tailwind CSS, optimized for maximum speed and performance. With a focus on minimal footprint and lightning-fast compilation, Nova provides a seamless developer experience without sacrificing any of the utility-first benefits that Tailwind offers.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Ultra-fast compilation:** Nova is designed to compile your styles at incredible speeds, making it ideal for large-scale projects.
- **Small footprint:** By focusing on essential utilities and optimizing the output, Nova generates smaller CSS files without unnecessary bloat.
- **Full Tailwind CSS compatibility:** Enjoy the utility-first approach with classes that mirror Tailwind's design system.
- **Customizability:** Easily extend or override default styles to fit your project's needs.
- **Optimized for production:** Automatic removal of unused styles for a minimal, optimized final build.

## Installation
### ⚠️ COMING SOON. Just use via jsDelivr for now. ⚠️
You can install Nova via npm:

```bash
npm install nova-css
```

Or using Yarn:

```bash
yarn add nova-css
```

## Usage

Nova integrates seamlessly with your existing project setup. To start using Nova, simply include the Nova CSS file in your HTML or import it into your CSS/SCSS file.

### Including in HTML

```html
<script src="https://cdn.jsdelivr.net/gh/getnova-github/nova/script.js"></script>
```

### Importing in CSS/SCSS

```css
@import 'nova-css/nova.css';
```

### Using with PostCSS

If you're using PostCSS, include Nova in your `postcss.config.js`:

```javascript
module.exports = {
  plugins: [
    require('nova-css')(),
    // other plugins
  ],
};
```

## Configuration

Nova allows you to customize your setup with a configuration file, similar to Tailwind's `tailwind.config.js`.

To create a default configuration file, run:

```bash
npx nova-css init
```

This will generate a `nova.config.js` file in your project root, which you can edit to customize your design system.

## Customization

Nova provides a full suite of customization options, identical to that of Tailwind CSS:

- **Extend utilities:** Add new utilities or modify existing ones.
- **Theme customization:** Customize colors, fonts, spacing, and more.
- **Responsive design:** Control responsive breakpoints to suit your project needs.
- **Plugins:** Extend Nova with additional plugins for custom functionality.

Example configuration:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1a202c',
        secondary: '#2d3748',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
      },
    },
  },
  plugins: [],
};
```

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to learn how you can help improve Nova.

## License

Nova is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
