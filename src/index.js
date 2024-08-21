import { generateUtilities } from './utilities';
import { resolveConfig, mergePlugins } from './config';
import { applyPlugins } from './plugins';
import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import CleanCSS from 'clean-css';
import crypto from 'crypto';

const cache = new Map();

export function buildCSS(configFile = 'nova.config.js', outputFile = null, options = {}) {
  try {
    const config = resolveConfig(configFile);

    if (options.verbose) {
      console.log('Configuration resolved:', config);
    }

    const utilities = generateUtilities(config);
    const cacheKey = generateCacheKey(utilities);

    if (cache.has(cacheKey) && !options.forceBuild) {
      if (options.verbose) {
        console.log('Using cached CSS...');
      }
      const cachedCSS = cache.get(cacheKey);
      if (outputFile) {
        saveToFile(cachedCSS, outputFile);
      }
      return cachedCSS;
    }

    // Apply plugins to enhance or modify utilities
    const finalUtilities = applyPlugins(utilities, config);

    let css = compileCSS(finalUtilities);

    // Optionally minify the CSS
    if (options.minify) {
      css = minifyCSS(css);
    }

    // Optionally generate source maps
    if (options.sourceMap) {
      const sourceMap = generateSourceMap(finalUtilities);
      css += `\n/*# sourceMappingURL=${sourceMap} */`;
    }

    // Cache the CSS
    cache.set(cacheKey, css);

    // Optionally save to a file
    if (outputFile) {
      saveToFile(css, outputFile);
    }

    return css;
  } catch (error) {
    console.error("Error building CSS:", error);
  }
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

function minifyCSS(css) {
  const cleanCSS = new CleanCSS();
  const minified = cleanCSS.minify(css);
  
  if (minified.errors.length > 0) {
    console.error("CSS Minification errors:", minified.errors);
    return css;
  }

  return minified.styles;
}

function generateSourceMap(utilities) {
  return 'data:application/json;base64,' + Buffer.from(JSON.stringify({ mappings: utilities.map(() => 'AAAA').join(';') })).toString('base64');
}

function generateCacheKey(utilities) {
  const hash = crypto.createHash('md5');
  hash.update(JSON.stringify(utilities));
  return hash.digest('hex');
}

export function watchCSS(configFile = 'nova.config.js', outputFile = null, options = {}) {
  const configPath = path.resolve(process.cwd(), configFile);

  chokidar.watch(configPath).on('change', () => {
    console.log(`${configFile} has changed. Rebuilding CSS...`);
    buildCSS(configFile, outputFile, { ...options, forceBuild: true });
  });

  console.log(`Watching ${configFile} for changes...`);
}

export function buildThemes(themeConfigs, outputDir, options = {}) {
  for (const [themeName, configFile] of Object.entries(themeConfigs)) {
    console.log(`Building theme: ${themeName}`);
    buildCSS(configFile, path.join(outputDir, `${themeName}.css`), options);
  }
}

export default buildCSS;
