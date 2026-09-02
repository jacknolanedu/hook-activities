# Classroom Starters Hub

A **desktop application** for Mac and Windows with **20 procedural daily starter activities** aligned with the **Victorian Curriculum v2.0** — Mathematics, English, Science, and Humanities.

Built for classroom smartboards and projectors. **No browser setup required** — install and launch like any other program.

---

## Download for Teachers (Mac or PC)

Go to **Releases** and download the installer for your computer:

**https://github.com/jacknolanedu/hook-activities/releases**

| Platform | Download |
|----------|----------|
| **Windows** | `Classroom-Starters-Hub-Setup-1.0.0.exe` (installer) or portable `.exe` |
| **Mac** | `Classroom-Starters-Hub-1.0.0.dmg` (Intel or Apple Silicon) |

### After installing

1. Launch **Classroom Starters Hub** from your desktop or Start menu / Applications folder.
2. Use the **subject filter** to browse Math, English, Science, or Humanities activities.
3. Click any card to start — use the **5-minute timer** and **fullscreen** button in the top bar.

Works **offline** once installed (all styles and scripts are bundled inside the app).

---

## For Developers — Build from Source

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or later
- npm

### Run locally (development)

```bash
git clone https://github.com/jacknolanedu/hook-activities.git
cd hook-activities
npm install
npm run electron:dev
```

### Build installers

**Windows (on a PC):**
```bash
npm run electron:build:win
```
Output: `dist/Classroom-Starters-Hub-Setup-1.0.0.exe`

**Mac (on a Mac):**
```bash
npm run electron:build:mac
```
Output: `dist/Classroom-Starters-Hub-1.0.0.dmg`

Pushing a version tag (e.g. `v1.0.1`) triggers GitHub Actions to build Windows and Mac installers automatically.

---

## What's Included (20 Activities)

### Mathematics (10)
Math Connections · Target Number · Nerdle · Two Truths and a Lie · Function Machine · Mystery Number · Math Termle · Balance Scale · Pattern Sequence · Estimation Station

### English & Literacy (3)
Literary Connections · Rhetoric & Device Detective · Etymology & Root Word Builder

### Science & Inquiry (4)
Variable Spotter · Science Connections · Science Classifier · Food Web Reorder

### Humanities & Social Sciences (3)
Historical Timeline Order · Map Skills & Coordinates · Source Evaluation

---

## Project Structure

| Path | Purpose |
|------|---------|
| `index.html` | Main app UI and game logic |
| `electron/` | Desktop app shell (Electron) |
| `assets/` | Bundled CSS and JavaScript (built on install) |
| `styles/app.css` | Tailwind source for offline styles |
| `app/`, `components/` | Optional Next.js dev version |

---

## License

Free for educational classroom use.
