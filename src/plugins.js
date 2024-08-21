export function applyPlugins(utilities, config) {
    let modifiedUtilities = [...utilities];
  
    for (const plugin of config.plugins) {
      if (typeof plugin === 'function') {
        plugin({ addUtilities: (newUtilities) => {
          modifiedUtilities = [...modifiedUtilities, ...formatUtilities(newUtilities)];
        }});
      }
    }
  
    return modifiedUtilities;
  }
  
  function formatUtilities(newUtilities) {
    return Object.entries(newUtilities).map(([selector, styles]) => ({
      selector,
      styles: Object.entries(styles).map(([prop, value]) => `${prop}: ${value};`).join(' '),
    }));
  }
  