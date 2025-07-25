let form = document.getElementById('form');
const loader = document.getElementById('loader');

function addRow(revValue = '', folderValue = '') {
  let div = document.createElement('div');
  div.className = 'row';

  let rev = document.createElement('input');
  rev.placeholder = 'Revision';
  rev.type = 'text';
  rev.className = 'rev';
  rev.value = revValue;

  let folder = document.createElement('input');
  folder.placeholder = 'Folder';
  folder.type = 'text';
  folder.className = 'folder';
  folder.value = folderValue;

  let browse = document.createElement('button');
  browse.textContent = 'Browse';
  browse.className = 'browseBtn';
  browse.onclick = async () => {
    const path = await window.electronAPI.selectFolder();
    if (path) folder.value = path;
  };

  let del = document.createElement('button');
  del.textContent = '❌';
  del.className = 'delBtn';
  del.onclick = () => div.remove();

  div.appendChild(rev);
  div.appendChild(folder);
  div.appendChild(browse);
  div.appendChild(del);
  form.appendChild(div);
}

async function exportPatches() {
  const rows = document.querySelectorAll('.row');
  const data = [];

  for (let row of rows) {
    const revInput = row.querySelector('.rev');
    const folderInput = row.querySelector('.folder');
    const rev = revInput?.value?.trim();
    const folder = folderInput?.value?.trim();

    if (rev && folder) {
      data.push({ rev, folder });
    }
  }

  if (data.length === 0) {
    alert("Please enter at least one revision and folder.");
    return;
  }

  loader.style.display = 'block';

  const exportBtn = document.querySelector('button[onclick="exportPatches()"]');
  exportBtn.disabled = true;
  exportBtn.textContent = '⏳ Exporting...';

  const result = await window.electronAPI.generatePatches(data);

  loader.style.display = 'none';
  exportBtn.disabled = false;
  exportBtn.textContent = '📤 Export All';

  const logOutput = document.getElementById("logOutput");
  logOutput.style.display = "block";
  logOutput.textContent = result.logs || "No logs.";

  if (result.success) {
    openConfirmModel("✔ " + result.message);
  } else {
    openConfirmModel("❌ " + result.message);
  }
}

function openSettings() {
  window.electronAPI.getSettings().then(config => {
    document.getElementById('svnPath').value = config?.svnPath || '';
    document.getElementById('settingsModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
  });
}

function closeSettings() {
  document.getElementById('settingsModal').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

function closeConfirmModel() {
  document.getElementById('confirmModel').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

function openConfirmModel(message) {
  document.getElementById("confirmMsg").innerText = message;
  document.getElementById('confirmModel').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
}

function saveSettings() {
  const path = document.getElementById('svnPath').value.trim();
  window.electronAPI.saveSettings({ svnPath: path });
  alert("Settings saved!");
  closeSettings();
}

function showTab(tabId) {
  // Switch tab content
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');

  // Switch tab button style
  document.querySelectorAll('.tab-buttons button').forEach(btn => btn.classList.remove('active-tab'));
  const activeBtn = document.querySelector(`.tab-buttons button[onclick="showTab('${tabId}')"]`);
  if (activeBtn) activeBtn.classList.add('active-tab');
}


async function selectRangeFolder() {
  const path = await window.electronAPI.selectFolder();
  if (path) {
    document.getElementById('rangeFolder').value = path;
  }
}

async function exportFromRange() {
  const from = parseInt(document.getElementById('fromRev').value.trim(), 10);
  const to = parseInt(document.getElementById('toRev').value.trim(), 10);
  const baseFolder = document.getElementById('rangeFolder').value.trim();

  if (isNaN(from) || isNaN(to) || !baseFolder) {
    alert("Please enter valid From, To revisions and folder.");
    return;
  }

  const data = [];
  const step = from <= to ? 1 : -1;

  for (let rev = from; step > 0 ? rev <= to : rev >= to; rev += step) {
    const revFolder = `${baseFolder}/${rev}`;  // <== ✅ just revision number
    data.push({ rev: rev.toString(), folder: revFolder });
  }

  loader.style.display = 'block';
  const result = await window.electronAPI.generatePatches(data);
  loader.style.display = 'none';

  const logOutput = document.getElementById("logOutput");
  logOutput.style.display = "block";
  logOutput.textContent = result.logs || "No logs.";

  if (result.success) {
    openConfirmModel("✔ " + result.message);
  } else {
    openConfirmModel("❌ " + result.message);
  }
}


window.addEventListener("DOMContentLoaded", () => {
  addRow();
});
