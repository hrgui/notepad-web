import { useState } from "react";
import Editor from "@monaco-editor/react";

const languageMap = {
  js: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",
};

function getLanguageFromFile(file: File) {
  // const [,actualType] = file.type.split('/');
  const fileParts = file.name.split(".");
  const fileExtension = fileParts[fileParts.length - 1];

  return (languageMap as any)[fileExtension] || fileExtension;
}

async function writeFile(fileHandle, contents) {
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
  const [fileHandle, setFileHandle] = useState<FileSystemHandle>();

  async function handleFileOpen() {
    try {
      const [fileHandle] = await window.showOpenFilePicker();
      setFileHandle(fileHandle);
      const file = await fileHandle.getFile();
      setLanguage(getLanguageFromFile(file));
      const contents = await file.text();
      setFileContents(contents);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleFileSave() {
    await writeFile(fileHandle, fileContents);
  }

  function handleTextChange(newValue: string | undefined) {
    setFileContents(newValue);
  }

  return (
    <form>
      <button type="button" onClick={handleFileOpen}>
        Open
      </button>
      {
        <button type="button" onClick={handleFileSave}>
          Save
        </button>
      }
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
