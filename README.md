# bookmarks-vue

A modern, customizable bookmarks manager built with Vue 3 and TypeScript.

## Features

- Organize bookmarks into panels (categories)
- Drag-and-drop to reorder bookmarks and panels (powered by [vuedraggable](https://github.com/SortableJS/vue.draggable.next))
- Add, edit, and remove panels and bookmarks
- Edit all data as JSON with a built-in editor
- Color customization for panels
- Data persistence via `localStorage`
- Progressive Web App (PWA) support (offline usage)
- Responsive, dark-themed UI

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```sh
npm install
```

### Development

```sh
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```sh
npm run build
```
The output will be in the `dist` directory.

### Preview Production Build

```sh
npm run preview
```

### Create a Zip of the Build

```sh
npm run zip
```

## Deploying to GitHub Pages

To publish your site to GitHub Pages:

1. Make sure your repository is named `bookmarks-vue` and is pushed to GitHub.
2. Ensure the `base` option in `vite.config.ts` is set to `/bookmarks-vue/`.
3. Run the following command:

```pwsh
npm run gh-pages
```

This will build the site and publish the contents of `dist` to the `gh-pages` branch.

Your site will be available at: `https://<your-username>.github.io/bookmarks-vue/`

## Project Structure

- `src/` — Vue components, main app, and data models
- `public/` — Static assets and PWA manifest
- `scripts/` — Utility scripts (e.g., create-zip)
- `index.html` — App entry point

## Data Model

Bookmarks are organized into panels. Each panel can have a label, color, and a list of bookmarks. All data is stored in the browser's `localStorage`.

You can edit the entire bookmarks data as JSON using the built-in editor (click the settings icon in the app bar).

## Customization

- Change the number of columns by editing the `columns` property in the JSON data.
- Add, remove, or reorder panels and bookmarks via the UI or JSON editor.
- Assign custom colors to panels.

## PWA Support

- The app can be installed as a Progressive Web App (PWA) and works offline.
- Service worker and manifest are included in `public/` and `src/`.

## Dependencies

- [Vue 3](https://vuejs.org/)
- [vuedraggable](https://github.com/SortableJS/vue.draggable.next)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## License

MIT
