import { build } from "esbuild"
import fs from 'fs'
//     "build": "esbuild ./src/*.tsx --bundle --outdir=dist --platform=node --format=iife --minify --define:process.env.NODE_ENV='\"production\"' --sourcemap",

build({
  entryPoints: ["./src/*.tsx"],
  bundle: true,
  outdir: "bundle",
  metafile: true,
  minify: true,
  platform: 'node',
  format: "iife",
  define: {
    "process.env.NODE_ENV": '\"production\"'
  },
  sourcemap: "external"
}).then(
  r => {
    fs.writeFileSync('./bundle/metafile.json', JSON.stringify(r.metafile));
  }
).catch(() => process.exit(1))
