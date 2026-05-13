# Project Notes

This is a Vite + React single page app converted from the original standalone HTML mockup.

## Structure

- `src/App.jsx` coordinates top-level state and page selection.
- `src/layouts/` contains shared application chrome such as sidebar, header, mobile nav, and toast.
- `src/pages/` contains route-level UI screens.
- `src/components/` contains reusable UI and icon components.
- `src/styles/` contains global CSS and Tailwind layers.
- `src/utils/` contains app logic that is not tied to rendering.
- `src/mocks/` contains all mock/demo content and fixtures.

## Mock Data

Keep mockup/demo data out of UI components and utilities when possible.

- Use `src/mocks/demoData.js` for demo personas, categories, connectors, pasted comments, and approved replies.
- Use `src/mocks/replyTemplates.js` for demo AI reply templates.
- Components should import mock data through these files instead of defining sample arrays inline.

## Commands

- `npm.cmd run dev` starts the local development server.
- `npm.cmd run build` verifies the production build.
- `npm.cmd run preview` previews the production build locally.

The npm scripts call Vite through `node ./node_modules/vite/bin/vite.js` to avoid Windows path issues when the project folder contains `&`.

## UI Notes

- The app shell intentionally has no owner/profile block, no top-right search field, and no notification bell.
- The dashboard intentionally has no filter controls; approved replies are shown as a complete list.
- The dashboard `Export CSV` button must create and download a real CSV file from the current approved replies.
- Keep each major UI section in a named component or page file.
- Add a short purpose comment at the top of new source files.
