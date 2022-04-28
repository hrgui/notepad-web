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

function FileUpload() {
  const [fileContents, setFileContents] = useState<string>();
  const [language, setLanguage] = useState<string>();
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle>();

  async function handleFileOpen() {
    const [fileHandle] = await window.showOpenFilePicker();
    setFileHandle(fileHandle);
    const file = await fileHandle.getFile();
    setLanguage(getLanguageFromFile(file));
    const contents = await file.text();
    setFileContents(contents);
  }

  async function handleFileSave() {
    await writeFile(fileHandle!, fileContents!);
  }

  function handleTextChange(newValue: string | undefined) {
    setFileContents(newValue);
  }

  const items = [
    {
      title: "File",
      submenu: [
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
