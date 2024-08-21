export function samplePlugin({ addUtilities }) {
    const newUtilities = {
      '.rotate-45': {
        transform: 'rotate(45deg)',
      },
      '.rotate-90': {
        transform: 'rotate(90deg)',
      },
    };
  
    addUtilities(newUtilities);
  }
  