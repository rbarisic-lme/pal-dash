// Initialize Bree Jobs
import path from 'path';
import Bree from 'bree';

const isCompiled = process.env.TS_NODE === 'cjs';

if (!isCompiled) {
  Bree.extend(require('@/lib/tsx-worker'));
}

console.info('Using TS_NODE for Bree:', isCompiled);

const bree = new Bree({
  root: path.join(__dirname, isCompiled ? '../dist/jobs' : '../jobs'),
  defaultExtension: isCompiled ? 'js' : 'ts',
  jobs: [
    {
      name: 'createPlayerDigests',
      cron: '*/1 * * * *', // Run every minute
    },
    // Add more job configurations as needed
  ],
  // outputWorkerMetadata: true,
});

export const initializeScheduler = async () => {
  await bree.start();
}
