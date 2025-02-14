import path from "path";
import { scanDirectory } from "./src/scan.js";
import { analyzeMarkdownFiles } from "./src/analyze.js";
import { saveToFileAndExtractTables } from "./src/output.js"; //Updated import

const directoryName = process.argv[2];

if (!directoryName) {
  console.log("Please enter a directory!");
  process.exit(1);
}

const directoryPath = path.resolve(directoryName);

(async function processMarkdownFiles() {
  try {
    // Scan the directory for Markdown files
    const markdownFiles = await scanDirectory(directoryPath);

    if (markdownFiles.length === 0) {
      console.log("No Markdown files found.");
      process.exit(0);
    }

    // Analyze the Markdown files
    const mergedContent = analyzeMarkdownFiles(markdownFiles);

    // Save merged content and extract tables
    const mergedFile = path.join(process.cwd(), "merged.md");
    saveToFileAndExtractTables(mergedFile, mergedContent);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
