import { generateUtilities } from './utilities';
import { resolveConfig, mergePlugins } from './config';
import { applyPlugins } from './plugins';
import fs from 'fs';
import path from 'path';

export function buildCSS(configFile = 'nova.config.js', outputFile = null) {
  const config = resolveConfig(configFile);
  const utilities = generateUtilities(config);
  
  // Apply plugins to enhance or modify utilities
  const finalUtilities = applyPlugins(utilities, config);

  const css = compileCSS(finalUtilities);

  if (outputFile) {
    saveToFile(css, outputFile);
  }

  return css;
}

function compileCSS(utilities) {
  let css = '';

  for (const utility of utilities) {
    css += `${utility.selector} { ${utility.styles} }\n`;
  }

  return css;
}

function saveToFile(css, outputFile) {
  const outputPath = path.resolve(process.cwd(), outputFile);
  fs.writeFileSync(outputPath, css, 'utf8');
  console.log(`CSS successfully saved to ${outputPath}`);
}

export default buildCSS;
