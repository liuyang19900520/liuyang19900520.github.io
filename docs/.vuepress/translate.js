const fs = require("fs");
const path = require("path");
const axios = require("axios");

// 翻译 API 配置
const API_URL = "";
const API_KEY = "";

// 读取 Markdown 文件内容
function readMarkdownFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

// 调用翻译 API
async function translateText(text, targetLanguage = "en") {
  const response = await axios.post(API_URL, {
    key: API_KEY,
    text: text,
    target_language: targetLanguage,
  });
  return response.data.translated_text;
}

// 写入新的 Markdown 文件
function writeMarkdownFile(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
}

// 翻译目录中的所有 Markdown 文件
async function translateMarkdownFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      // 递归处理子目录
      await translateMarkdownFiles(filePath);
    } else if (file.endsWith(".md")) {
      const content = readMarkdownFile(filePath);
      const translatedContent = await translateText(content, "en");
      const outputFilePath = filePath.replace(".md", ".en.md");
      writeMarkdownFile(outputFilePath, translatedContent);
      console.log(`Translated file saved: ${outputFilePath}`);
    }
  }
}

// 执行翻译
(async () => {
  const docsDir = path.resolve(__dirname, "docs");
  try {
    await translateMarkdownFiles(docsDir);
    console.log("All files translated successfully.");
  } catch (err) {
    console.error("Error translating files:", err);
  }
})();
