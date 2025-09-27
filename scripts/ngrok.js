import { spawn } from "child_process";
import { existsSync, readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file
const envPath = join(__dirname, "..", ".env");
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      const value = valueParts.join("=").trim();
      if (!process.env[key.trim()]) {
        process.env[key.trim()] = value.replace(/^["']|["']$/g, "");
      }
    }
  });
}

// Simple web app configuration
const port = process.env.WEB_PORT || "3000";
const domain = process.env.NGROK_URL;

if (!domain) {
  console.error("❌ Error: Missing ngrok domain!");
  console.error("");
  console.error("Please set your ngrok domain:");
  console.error('  export NGROK_URL="your-domain.ngrok-free.app"');
  console.error("");
  console.error("Or run with inline variable:");
  console.error('  NGROK_URL="your-domain.ngrok-free.app" node scripts/ngrok.js');
  process.exit(1);
}

console.log("🟦 Starting ngrok tunnel for Web App...");
console.log(`🌐 Domain: ${domain}`);
console.log(`🔌 Port: ${port}`);
console.log("");

// Run ngrok command
const ngrokProcess = spawn("ngrok", ["http", "--url=" + domain, port], {
  stdio: "inherit",
  shell: true,
});

ngrokProcess.on("error", (error) => {
  console.error("❌ Failed to start ngrok:", error.message);
  console.error("");
  console.error("Make sure ngrok is installed and available in your PATH");
  console.error("Install ngrok: https://ngrok.com/download");
  process.exit(1);
});

ngrokProcess.on("close", (code) => {
  console.log(`\n📴 Ngrok process exited with code ${code}`);
});
