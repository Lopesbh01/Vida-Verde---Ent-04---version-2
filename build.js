// build.js - Script de build simplificado
const fs = require("fs");
const { execSync } = require("child_process");

console.log("🚀 Iniciando build simplificado...");

// Criar diretório dist se não existir
if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist", { recursive: true });
  console.log("✅ Pasta dist criada");
}

// Copiar arquivos HTML
try {
  const htmlFiles = fs
    .readdirSync(".")
    .filter((file) => file.endsWith(".html"));
  htmlFiles.forEach((file) => {
    fs.copyFileSync(file, `dist/${file}`);
    console.log(`✅ Copiado: ${file}`);
  });
} catch (error) {
  console.log("⚠️ Erro ao copiar HTML:", error.message);
}

// Copiar pasta assets
try {
  execSync("cp -r assets/ dist/ || true");
  console.log("✅ Pasta assets copiada");
} catch (error) {
  console.log("⚠️ Erro ao copiar assets:", error.message);
}

// Copiar outros arquivos importantes
const importantFiles = ["sitemap.xml", "CNAME", "robots.txt"];
importantFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, `dist/${file}`);
    console.log(`✅ Copiado: ${file}`);
  }
});

console.log("🎉 Build simplificado concluído!");
console.log("📁 Conteúdo da pasta dist:");
try {
  console.log(execSync("find dist/ -type f | head -20").toString());
} catch (error) {
  console.log("Não foi possível listar arquivos da dist");
}
