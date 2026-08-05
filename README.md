# khaisrc.github.io

Personal engineering portfolio built with [Astro](https://astro.build/).

## Commands

```sh
npm install
npm run dev
npm run check
npm run build
```

## Generate a diagram

Render any Mermaid `.mmd` source file to `public/diagrams/<filename>.svg`:

```sh
make diagram FILE=src/diagrams/erx-journey.mmd
```

The command uses pinned Mermaid CLI and Prettier versions through `npx`, so the first run may download those tools. Commit both the `.mmd` source and generated `.svg` file.
