async function listAndReadFile() {
  try {
    const files = await Neutralino.filesystem.readDirectory('.');

    if (files.length > 0) {
      console.log("Files in current directory:");
      files.forEach((file, index) => {
        console.log(`${index + 1}. ${file.entry}`);
      });

      const filePath = `README.md`;
      const fileContent = await Neutralino.filesystem.readFile(filePath);
      console.log("\nContent of the first file:");
      console.log(fileContent);
    } else {
      console.log("No files found in the current directory.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function showInfo() {
    document.getElementById('info').innerHTML = `
        ${NL_APPID} is running on port ${NL_PORT} inside ${NL_OS}
        <br/><br/>
        <span>server: v${NL_VERSION} . client: v${NL_CVERSION}</span>
        `;
}

function openDocs() {
    Neutralino.os.open("https://neutralino.js.org/docs");
}

function openTutorial() {
    Neutralino.os.open("https://www.youtube.com/c/CodeZri");
}

function onWindowClose() {
    Neutralino.app.exit();
}

Neutralino.init();
Neutralino.events.on("windowClose", onWindowClose);
showInfo();
Neutralino.events.on("ready", listAndReadFile);
