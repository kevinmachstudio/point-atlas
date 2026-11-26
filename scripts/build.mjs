import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const source = fileURLToPath(new URL("../dist/", import.meta.url));
const output = fileURLToPath(new URL("../out/", import.meta.url));
const template = await readFile(new URL("./service-worker.js", import.meta.url), "utf8");

async function publicFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = await Promise.all(entries.filter((entry) => !entry.name.startsWith(".")).map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? publicFiles(path) : [path];
  }));
  return paths.flat();
}

const files = (await publicFiles(source)).sort();
const paths = files.map((file) => relative(source, file).split(sep).join("/"));
const version = createHash("sha256").update(template).update(JSON.stringify(paths));

await rm(output, { recursive: true, force: true });
for (const [index, file] of files.entries()) {
  const content = await readFile(file);
  version.update(String(content.length)).update("\0").update(content);
  const destination = join(output, paths[index]);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, content);
}

const release = version.digest("hex").slice(0, 16);
const worker = template
  .replace('"__RELEASE__"', JSON.stringify(release))
  .replace("/* __PUBLIC_ASSETS__ */ []", JSON.stringify(paths, null, 2));
await writeFile(join(output, "sw.js"), worker);
console.log(`Built Point Atlas ${release} with ${files.length} offline assets.`);
