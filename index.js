#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import inquirer from "inquirer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log(
  chalk.cyanBright(`
███████╗ █████╗ ████████╗   ███████╗██████╗  ██████╗ ███╗   ██╗████████╗
██╔════╝██╔══██╗╚══██╔══╝   ██╔════╝██╔══██╗██╔═══██╗████╗  ██║╚══██╔══╝
█████╗  ███████║   ██║█████╗█████╗  ██████╔╝██║   ██║██╔██╗ ██║   ██║   
██╔══╝  ██╔══██║   ██║╚════╝██╔══╝  ██╔══██╗██║   ██║██║╚██╗██║   ██║   
██║     ██║  ██║   ██║      ██║     ██║  ██║╚██████╔╝██║ ╚████║   ██║   
╚═╝     ╚═╝  ╚═╝   ╚═╝      ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   

               🚀 Welcome to the FatFront Stack Starter!
    Includes: Vite + React + Tailwind CSS v4 + React Router DOM
`)
);

// Get project name from CLI args or prompt
let projectName = process.argv[2];

if (!projectName) {
  const answer = await inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "📦 What should be the project name?",
      default: "my-app",
    },
  ]);
  projectName = answer.name.trim();
}

// Prompt user to choose between Vite + JavaScript or Vite + TypeScript
const { templateChoice } = await inquirer.prompt([
  {
    type: "list",
    name: "templateChoice",
    message: "Which template would you like to use?",
    choices: ["Vite + JavaScript", "Vite + TypeScript"],
  },
]);

const targetPath = path.join(process.cwd(), projectName);
const templatePath = path.join(__dirname, "template", templateChoice === "Vite + JavaScript" ? "vite-js" : "vite-ts");

fs.mkdirSync(targetPath, { recursive: true });

// ✅ Recursive copy function ignoring node_modules and .git
function copyTemplate(srcDir, destDir) {
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    if (["node_modules", ".git"].includes(entry.name)) continue;

    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyTemplate(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyTemplate(templatePath, targetPath);

console.log(chalk.green(`\n✅ Project created at ./${projectName}`));
console.log(chalk.blue(`\n📦 Installing dependencies using npm...\n`));
execSync("npm install", { cwd: targetPath, stdio: "inherit" });

console.log(chalk.green(`\n🎉 All set!`));
console.log(chalk.yellow(`👉 cd ${projectName} && npm run dev\n`));
