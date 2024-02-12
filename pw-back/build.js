// ESBUILD Config File

import esbuild from 'esbuild';
import path from 'path';

await esbuild.build({
  entryPoints: ['./src/index.ts'], // Adjust your entry file
  bundle: true,
  platform: 'node',
  target: 'node21', // Adjust your target version
  // outdir: 'dist',
  format: 'cjs',
  outfile: 'dist/index.cjs', // Specify the output file
  sourcemap: true,
}).catch(() => process.exit(1));