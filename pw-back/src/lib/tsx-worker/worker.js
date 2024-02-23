// Warning: Don't convert this to esm syntax or it won't work
const { workerData } = require('worker_threads');

require('tsx');

require(workerData.path);