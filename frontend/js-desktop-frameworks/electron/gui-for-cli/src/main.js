const { app, BrowserWindow, ipcMain } = require("electron");
const { spawn } = require("child_process");
const path = require("path");

let jshell;
let outputBuffer = "";

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadFile("src/index.html");
}

app.whenReady().then(() => {
  jshell = spawn("jshell", [], { stdio: "pipe" });

  jshell.stdout.on("data", (data) => {
    let nextLine = data.includes("\n") ? "" : "\n";
    outputBuffer += data.toString() + nextLine;
  });

  jshell.stderr.on("data", (data) => {
    let nextLine = data.includes("\n") ? "" : "\n";
    outputBuffer += data.toString() + nextLine;
  });

  createWindow();
});

ipcMain.handle("execute", async (_, code) => {
  outputBuffer = "";
  jshell.stdin.write(code + "\n");

  await new Promise((r) => setTimeout(r, 150));
  return outputBuffer;
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    jshell.kill();
    app.quit();
  }
});
