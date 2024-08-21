export function generateUtilities(config) {
    const { colors, spacing } = config.theme;
    const utilities = [];
  
    for (const [key, value] of Object.entries(colors)) {
      utilities.push({
        selector: `.text-${key}`,
        styles: `color: ${value};`,
      });
      utilities.push({
        selector: `.bg-${key}`,
        styles: `background-color: ${value};`,
      });
    }
  
    for (const [key, value] of Object.entries(spacing)) {
      utilities.push({
        selector: `.m-${key}`,
        styles: `margin: ${value};`,
      });
      utilities.push({
        selector: `.p-${key}`,
        styles: `padding: ${value};`,
      });
    }
  
    return utilities;
  }
  