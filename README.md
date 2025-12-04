# Poster Preview (React + Vite)

This project renders the King’s College Hospital plant-based meal poster inside a web page. You can adjust the copy, swap the NHS logo (already bundled), and export the finished layout as either a PNG or a PDF. The steps below assume you use a Mac and have limited technical experience.

---

## 1. Install the tools (one-time)

1. Open **Terminal** (Spotlight ▸ type “Terminal” ▸ Enter).
2. Install Node.js (includes npm, the package manager) using Homebrew:

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   brew install node
   ```

3. Confirm things worked:

   ```bash
   node -v
   npm -v
   ```

If you already have Node 18+ and npm installed, you can skip this section.

---

## 2. Download the project

1. Place the project folder `poster-preview` anywhere you like (Desktop, Documents, etc.).
2. In Terminal, navigate into that folder. For example, if it’s on the Desktop:

   ```bash
   cd ~/Desktop/poster-preview
   ```

_Tip: drag the folder from Finder into the Terminal window to auto-fill the path, then press Enter._

---

## 3. Install the project dependencies

Run once inside the project folder:

```bash
npm install
```

This pulls down everything Vite/React needs to run the poster locally.

---

## 4. Start the preview site

```bash
npm run dev
```

After a few seconds you’ll see an address such as `http://localhost:5173/`. Hold `Cmd` and click that link (or copy/paste it into Safari/Chrome). The poster should appear exactly as designed.

While this command is running, leave Terminal open; press `Ctrl + C` when you want to stop the preview.

---

## 5. Exporting and printing

- **Download PNG** – Click the green “Download PNG” button at the bottom to save a high-resolution image of the poster.
- **Print / PDF** – Click “Print / Save as PDF” and use your browser’s print dialog to save an A3 landscape PDF.

Both exports capture the current state of the page, so make sure any edits are visible before downloading/printing.

---

## 6. Editing basics

| Task | Where to change it |
| --- | --- |
| Text content (titles, paragraphs, recommendations) | `src/App.jsx` |
| NHS logo | Stored at `src/assets/nhs.jpeg` and displayed automatically in the top-right corner |
| Menu snapshot image | Replace `/public/menu-1.png` with another file of the same name |

After saving any file, the browser preview reloads automatically.

---

## 7. Troubleshooting

| Issue | Fix |
| --- | --- |
| `command not found: npm` | Re-run the Homebrew install command above or install Node from <https://nodejs.org> |
| Terminal says “permission denied” | Make sure you’re inside the project folder (`cd /path/to/poster-preview`) before running the commands |
| Browser shows a blank page | Check Terminal for errors; if something failed during `npm install`, rerun it |
| Exported PNG looks blurry | Click “Download PNG” again; the exporter already uses a high pixel ratio, but make sure the page is fully loaded before exporting |

Still stuck? Copy the error message from Terminal or the browser console and share it with your developer—they’ll know what to do.

---

You now have everything you need to view, tweak, and export the poster locally on a Mac without touching any complex build tools. Enjoy!
