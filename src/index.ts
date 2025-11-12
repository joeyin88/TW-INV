import { createServer } from 'node:http';

import { loadConfig } from './config/env.js';
import { createApp } from './app.js';

const config = loadConfig();
const app = createApp();

const server = createServer(app);

server.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
