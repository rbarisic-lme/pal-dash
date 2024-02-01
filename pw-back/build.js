// ESBUILD Config File

import esbuild from 'esbuild';
import path from 'path';

esbuild.build({
  entryPoints: ['./src/index.ts'], // Adjust your entry file
  bundle: true,
  platform: 'node',
  target: 'node21', // Adjust your target version
  outdir: 'dist',
  format: 'cjs',
  sourcemap: true,
}).catch(() => process.exit(1));