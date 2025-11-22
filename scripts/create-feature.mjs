#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const featureName = process.argv[2];

if (!featureName) {
  console.error('Feature name required');
  process.exit(1);
}

const base = path.join(__dirname, '..', 'src', 'features', featureName);

const structure = ['components', 'hooks', 'validators', 'pages', 'types'];

if (fs.existsSync(base)) {
  console.error(`Feature "${featureName}" already exists.`);
  process.exit(1);
}

fs.mkdirSync(base, { recursive: true });

// Create folders
for (const folder of structure) {
  fs.mkdirSync(path.join(base, folder));
}

//eslint-disable-next-line no-console
console.log(`Feature created at: ${base}`);
