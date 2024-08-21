import fs from 'fs';
import path from 'path';

export function resolveConfig(configFile) {
  const defaultConfig = {
    theme: {
      colors: {
        black: '#000000',
        white: '#ffffff',
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '4': '1rem',
      },
    },
    plugins: [],
  };

  const configPath = path.resolve(process.cwd(), configFile);

  if (fs.existsSync(configPath)) {
    const userConfig = require(configPath);
    return mergeConfig(defaultConfig, userConfig);
  }

  return defaultConfig;
}

function mergeConfig(defaultConfig, userConfig) {
  return {
    ...defaultConfig,
    ...userConfig,
    theme: {
      ...defaultConfig.theme,
      ...userConfig.theme,
    },
    plugins: mergePlugins(defaultConfig.plugins, userConfig.plugins),
  };
}

export function mergePlugins(defaultPlugins, userPlugins) {
  return [...defaultPlugins, ...userPlugins];
}
