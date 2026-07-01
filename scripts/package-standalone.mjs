import { cp, mkdir, rm, stat } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const copies = [
  {
    source: resolve(root, "public"),
    destination: resolve(root, ".next/standalone/public"),
  },
  {
    source: resolve(root, ".next/static"),
    destination: resolve(root, ".next/standalone/.next/static"),
  },
];

for (const { source, destination } of copies) {
  await stat(source);
  await rm(destination, { recursive: true, force: true });
  await mkdir(resolve(destination, ".."), { recursive: true });
  await cp(source, destination, { recursive: true });
}

console.log("Packaged public and static assets for the standalone server.");
