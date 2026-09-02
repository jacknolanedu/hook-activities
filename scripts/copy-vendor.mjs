import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const vendorDir = join(root, 'assets', 'vendor');

const copies = [
  ['node_modules/alpinejs/dist/cdn.min.js', 'alpine.min.js'],
  ['node_modules/lucide/dist/umd/lucide.min.js', 'lucide.min.js'],
];

mkdirSync(vendorDir, { recursive: true });

for (const [src, dest] of copies) {
  const from = join(root, src);
  const to = join(vendorDir, dest);
  if (!existsSync(from)) {
    console.error(`Missing vendor file: ${src}. Run npm install first.`);
    process.exit(1);
  }
  copyFileSync(from, to);
  console.log(`Copied ${dest}`);
}
