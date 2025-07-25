# 🔧 SVN Patch Exporter

**SVN Patch Exporter** is a modern, offline Electron-based tool to generate SVN patch files from specific revision numbers and folders. Ideal for developers who want a fast and simple way to export patches from Subversion without manually running scripts.

---

## 🚀 Features

- ✅ Export SVN patches for specific revisions
- ✅ Supports multiple revision-folder pairs
- ✅ Generates patch files as ZIP
- ✅ Clean and modern Electron UI
- ✅ Works fully offline — no backend required
- ✅ Easily extendable with custom `.bat` scripts

---

## 📦 Installation

### Option 1: Install Install Locally
####  I. Install Locally
```bash
npm i svn-patch-exporter
```

#### II. Run using following command
```bash
npx svn-patch-exporter
```
### Option 2: Install globally to access anywhere
####  I. Install globally
```bash
    npm i -g svn-patch-exporter
```
#### II. Run using following command
```bash
    svn-patch-exporter
```
---

## ▶️ How to Use

1. Launch using `npx svn-patch-exporter` or `svn-patch-exporter`
2. Add one or more revision numbers
3. Choose a folder for each revision
4. Click **Export** — patch files are generated in specified folder.
5. Done ✅

---

## 📁 Project Structure

```
├── main.js            # Electron main process
├── cli.js             # CLI launcher script
├── index.html         # UI layout
├── preload.js         # Bridge between main & renderer
├── renderer.js        # Frontend logic
├── css/style.css      # UI styles
├── assets/            # Icons & images
├── batch/             # (Optional) custom batch files
└── package.json       # npm configuration
```

---

## 🧑‍💻 Development

```bash
git clone https://github.com/prashantamage/svn-patch-exporter.git
cd svn-patch-exporter
npm install
npm start
```

---

## 🧪 Build Desktop App

Build `.exe` or distributables with:

```bash
npm run dist
```

> Uses [`electron-builder`](https://www.electron.build) for packaging.

---

## ⚙️ Requirements

- Node.js 18+ (recommended)
- npm 9+
- Subversion CLI.

---

## ❓ FAQ

### ❓ Does this require internet?
**No**, it runs completely offline once installed.

### ❓ Is it cross-platform?
Yes — works on Windows, macOS, and Linux.

---

## 🐛 Issues & Feedback

Found a bug or want a feature?  
Submit here 👉 [GitHub Issues](https://github.com/prashantamage/svn-patch-exporter/issues)

---

## 👨‍💻 Author

**Prashant Amage**  
📧 [amageprashant@gmail.com](mailto:amageprashant@gmail.com)  
🌐 [https://prashant.amage.in](https://prashant.amage.in)

---

## 📄 License

Licensed under the [MIT License](LICENSE)

---

## 🌟 Show Your Support

If you found this useful, please **star ⭐ the project on GitHub** and share it with others!