# 🔧 SVN Patch Exporter

**SVN Patch Exporter** is a user-friendly Electron-based tool to generate SVN patch files from specific revision numbers and folders. Ideal for developers working with Subversion (SVN) who want to export multiple patches quickly and easily.

---

## 🚀 Features

- ✅ Export SVN patches for specific revisions
- ✅ Add multiple revision-folder mappings dynamically
- ✅ Output patches as ZIP files using a batch file
- ✅ Simple, modern Electron UI
- ✅ Fully offline — no backend/server required
- ✅ Works cross-platform (Windows, macOS, Linux)

---

## 📦 Installation

### Option 1: Install Install Locally
####  I. Install Locally
```bash
    npm i svn-patch-exporter

#### II. Run using following command
```bash
    npx svn-patch-exporter

### Option 2: Install globally to access anywhere
####  I. Install globally
```bash
    npm i -g svn-patch-exporter

#### II. Run using following command
```bash
    svn-patch-exporter

## ▶️ How to Use
#### Launch the app using npx svn-patch-exporter or svn-patch-exporter.
#### Select Manual Revisions or Revision Range
#### Enter One or more SVN revision numbers.
#### Choose the folder where the patch should be created.
#### Click on export to get patch.
#### Done!

## 🧑‍💻 Development
```bash
    git clone https://github.com/prashantamage/svn-patch-exporter.git
    cd svn-patch-exporter
    npm install
    npm start

## 🧪 Build App
```bash
    npm run dist
- Uses electron-builder under the hood.

## ⚙️ Requirements
- Node.js 18+ (recommended: latest LTS)
- npm 9+ or yarn
- Optional: Subversion CLI (svn) if your batch file needs it

## 🐛 Reporting Issues
- Have a suggestion or a bug to report?
- Please create an issue here 👉 GitHub Issues

## 👨‍💻 Author
**Prashant Amage**
- 📧 amageprashant@gmail.com
- 🌐 https://prashant.amage.in

## License
- This project is licensed under the MIT License

## 🌟 Show Your Support
- If this project helped you, please ⭐ it on GitHub and share it with others!
