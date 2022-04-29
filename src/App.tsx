import { useState } from "react";
import Editor from "@monaco-editor/react";
import MenuBar from "./MenuBar";
import "./App.css";

const languageMap = {
  js: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",
  md: "markdown",
};

function getLanguageFromFile(file: File) {
  // const [,actualType] = file.type.split('/');
  const fileParts = file.name.split(".");
  const fileExtension = fileParts[fileParts.length - 1];

  return (languageMap as any)[fileExtension] || fileExtension;
}

async function writeFile(fileHandle: FileSystemFileHandle, contents: string) {
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();

  // Write the contents of the file to the stream.
  await writable.write(contents);

  // Close the file and write the contents to disk.
  await writable.close();
}

async function getNewFileHandle() {
  const handle = await window.showSaveFilePicker();
  return handle;
}

function FileUpload() {
  const [fileContents, setFileContents] = useState<string>();
  const [language, setLanguage] = useState<string>();
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>();

  async function handleFileOpen() {
    const [fileHandle] = await window.showOpenFilePicker();
    setFileHandle(fileHandle);
    const file = await fileHandle.getFile();
    setLanguage(getLanguageFromFile(file));
    const contents = await file.text();
    setFileContents(contents);
  }

  async function handleFileSave() {
    let _fileHandle = fileHandle;
    if (!_fileHandle) {
      _fileHandle = await getNewFileHandle();
      setFileHandle(_fileHandle);
    }

    await writeFile(_fileHandle!, fileContents!);
  }

  function handleTextChange(newValue: string | undefined) {
    setFileContents(newValue);
  }

  function reset() {
    setFileContents("");
    setLanguage("");
    setFileHandle(null);
  }

  function handleNewFile() {
    reset();
  }

  const items = [
    {
      title: "File",
      submenu: [
        { title: "New", action: handleNewFile },
        { title: "Open", action: handleFileOpen },
        { title: "Save", action: handleFileSave },
      ],
    },
  ];

  return (
    <form>
      <MenuBar menuItems={items} />
      <Editor height="90vh" language={language} value={fileContents} onChange={handleTextChange} />
    </form>
  );
}

function App() {
  return (
    <div className="App">
      <FileUpload />
    </div>
  );
}

export default App;
