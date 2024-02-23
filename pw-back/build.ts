// ESBUILD Config File
import esbuild from 'esbuild';

const build = async () => {
  try {
    await esbuild.build({
      entryPoints: ['./src/index.js', './src/jobs/**/*.ts'], // Adjust your entry file
      bundle: true,
      platform: 'node',
      target: 'node21', // Adjust your target version
      outdir: 'dist',
      format: 'cjs',
      // outfile: 'dist/index.js', // Specify the output file
      sourcemap: true,
      loader: {
        '.ts': 'ts',
      },
      define: {
        'process.env.TS_NODE': '"cjs"',
      },
    });
    console.log('Build succeeded.');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
};

build();