/* eslint-disable */
const fs = require('fs');
const tsConfigPaths = require('tsconfig-paths');

try {
  const tsConfig = JSON.parse(fs.readFileSync('./tsconfig.json', 'utf-8'));
  const { paths } = tsConfig.compilerOptions;

  const resolved = Object.keys(paths).reduce(
    (agg, key) => ({
      ...agg,
      [key]: paths[key].map(p => p.replace('src', '.')),
    }),
    {}
  );

  tsConfigPaths.register({
    baseUrl: tsConfig.compilerOptions.outDir,
    paths: resolved,
  });
} catch (err) {
  console.log('bootstrap failed with error', err);
}
