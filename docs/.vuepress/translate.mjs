import fs from "fs";
import path from "path";
import { OpenAI } from "openai";

// 翻译 API 配置
const API_KEY = "your-api-key"; // 替换为你的 API 密钥

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
});

// 读取 Markdown 文件内容
function readMarkdownFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

// 调用翻译 API

// 调用 OpenAI API
async function main(content) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: content }],
    model: "deepseek-chat",
  });

  console.log("result===", completion.choices[0].message.content);
  return completion.choices[0].message.content;
}

// 写入翻译后的 Markdown 文件
function writeMarkdownFile(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
}

// 翻译指定文件并保存到 /en 目录
async function translateMarkdownFile(filePath, outputDir, lang) {
  // 读取原始文件内容
  const content = readMarkdownFile(filePath);

  console.log("============", content);
  // 调用翻译 API
  if (lang === "en") {
    const req =
      "这个markdown文件转为英文。要求格式不要有任何变化。其中用‘---’包裹起来的内容是固定的模板，并且采用key-value的形式来承载。是能翻译value的部分。文件内容如下：";
    const translatedContent = await main(req + content, lang);

    // 生成输出路径
    const fileName = path.basename(filePath, ".md") + "-en.md";
    const outputFilePath = path.join(outputDir, fileName);

    console.log("translatedContent============", translatedContent);

    // 写入翻译后的内容
    writeMarkdownFile(outputFilePath, translatedContent);

    console.log(`Translated file saved to: ${outputFilePath}`);
  }
  if (lang === "jp") {
    const req =
      "这个markdown文件转为日文。要求格式不要有任何变化。其中用‘---’包裹起来的内容是固定的模板，并且采用key-value的形式来承载。是能翻译value的部分。文件内容如下：";
    const translatedContent = await main(req + content, lang);

    // 生成输出路径
    const fileName = path.basename(filePath, ".md") + "-jp.md";
    const outputFilePath = path.join(outputDir, fileName);

    console.log("translatedContent============", translatedContent);

    // 写入翻译后的内容
    writeMarkdownFile(outputFilePath, translatedContent);

    console.log(`Translated file saved to: ${outputFilePath}`);
  }
}

// 主函数
(async () => {
  const inputFile = path.resolve("docs/blog/a.md"); // 原始文件路径
  const outputDir = path.resolve("docs/en"); // 输出目录
  const outputDir2 = path.resolve("docs/jp"); // 输出目录

  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  //await main();

  // 翻译文件
  await translateMarkdownFile(inputFile, outputDir, "en");
  await translateMarkdownFile(inputFile, outputDir2, "jp");
})();
