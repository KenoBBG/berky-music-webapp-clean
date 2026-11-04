# Berky producer archive

A local React/Vite website for browsing a curated archive of releases.

## What you need

- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/) 22 or later (the LTS download is a good choice)

Open this folder in VS Code. Then choose **Terminal → New Terminal** and run the commands below from the project folder.

## Run the site locally

Install the project packages once:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite prints the local address in the terminal. Normally it is:

```text
http://localhost:5173/
```

Open that address in a browser. Keep the terminal running while you work; press `Ctrl+C` in that terminal to stop the server.

## Check your changes

Run the automated tests:

```bash
npm run test
```

Expected result: Vitest finishes with all tests passing and exit code 0.

Build the production version:

```bash
npm run build
```

Expected result: TypeScript checks and Vite builds the site successfully, creating a `dist/` folder with exit code 0.

Before sharing a change, also run `npm run dev`, open `http://localhost:5173/`, and check the home page at both a desktop-width and a mobile-width browser window.

## Updating archive data

Archive data is deliberately maintained as a verified local snapshot, not a live feed. Edit `src/data/projects.ts` only after checking the source for the specific fact you are changing.

- Use the official Berky website (`https://berkymusik.com/`) for project records such as release title, artist, release type, release date, artwork, and the linked Spotify release.
- Do not add or infer project-specific roles. Leave roles out unless an official source establishes the record-level credit.
- A `spotifySnapshot` is a fixed observation, not a current stream count. Verify the number against the linked Spotify release, then update both `streams` and the ISO `capturedAt` date (for example, `2026-10-25`) together. Keep its label as `Spotify snapshot` so the site does not imply live data.
- If a fact cannot be verified from the applicable source, leave the existing entry unchanged rather than guessing.

After an edit, run `npm run test` and `npm run build`, then check the affected project in the local browser.
