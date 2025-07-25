
const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;
const { exec } = require('child_process');

const configFile = path.join(app.getPath('userData'), 'config.json');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'assets', 'icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  win.loadFile('index.html');
  //Menu.setApplicationMenu(null);
}

app.whenReady().then(() => {
  createWindow();
});

ipcMain.handle('select-folder', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ['openDirectory'] });
  return canceled ? null : filePaths[0];
});

ipcMain.handle('get-settings', async () => {
  try {
    const data = fs.readFileSync(configFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
});

ipcMain.handle('save-settings', async (e, config) => {
  fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
});

ipcMain.handle('generate-patches', async (event, revisions) => {
  const config = fs.existsSync(configFile)
    ? JSON.parse(fs.readFileSync(configFile, 'utf-8'))
    : {};

  const svnRepo = config?.svnPath || '';
  if (!svnRepo) return { success: false, message: 'SVN repo URL is not configured.' };

  const logLines = [];
  let successCount = 0, failedCount = 0;

  for (const item of revisions) {
    const rev = item.rev.trim();
    const localFolder = item.folder.trim();

    if (!rev || !localFolder) continue;

    const repoPath = svnRepo.replace(/\\/g, '/').replace(/\/$/, '');
    const logCmd = `svn log -v -r ${rev} "${repoPath}"`;
    logLines.push(`\n ------ Processing Revision ${rev} ------`);
    try {
      const logOutput = await new Promise((resolve, reject) => {
        exec(logCmd, (error, stdout, stderr) => {
          if (error || stderr){
            if(stderr){
              logLines.push(`\n `+stderr);
            }
            failedCount++;
            return reject(stderr || error.message);
          } 
          successCount++;
          resolve(stdout);
        });
      });

      const lines = logOutput.split('\n');
      const changedFiles = lines
        .filter(line => /^[\s]*[MA]\s/.test(line))
        .map(line => line.trim().substring(2));

      for (const file of changedFiles) {
        const relativeRepoFile = file.trim().replace(/\\/g, '/');
        const fullRepoFilePath = `${repoPath}${relativeRepoFile}`;

        const relativePathFromTrunk = relativeRepoFile.replace(/^\/?trunk\/?/, '');
        const exportDest = path.join(localFolder, relativePathFromTrunk);

        await fsPromises.mkdir(path.dirname(exportDest), { recursive: true });

        const exportCmd = `svn export -r ${rev} "${fullRepoFilePath}" "${exportDest}" --force`;
        try {
          await new Promise((resolve, reject) => {
            exec(exportCmd, (error, stdout, stderr) => {
              if (error){
                return reject(stderr || error.message);
              } 
              if(stderr){
                return reject(stderr || error.message);
              } 
              resolve();
            });
          });
          logLines.push(`\n ✔ Exported: ${relativeRepoFile}`);
        } catch (err) {
          logLines.push(`\n ❌ Failed to export: ${relativeRepoFile}`);
          logLines.push(`\n Error: ${err}`);
          logLines.push(`\n ----------------------------------------`);
        }
      }
      logLines.push(`\n ----------------------------------------`);


    } catch (err) {
      logLines.push(`\n ❌ Failed to process revision ${rev}`);
      logLines.push(`\n ----------------------------------------`);
    }

    //Skipping Log Files
    //const perRevLogPath = path.join(localFolder, `log_r${rev}.txt`);
    //await fsPromises.writeFile(perRevLogPath, logLines.join('\n'), 'utf-8');
  }

  if (successCount > 0 && failedCount === 0) {
    return {
      success: true,
      message: 'Files exported successfully.',
      logs: logLines
    };
  } else if (successCount > 0 && failedCount > 0) {
    return {
      success: true,
      message: 'Some Files exported successfully.',
      logs: logLines
    };
  } else if (successCount === 0 && failedCount > 0) {
    return {
      success: false,
      message: 'Files export Failed.',
      logs: logLines
    };
  }

});
