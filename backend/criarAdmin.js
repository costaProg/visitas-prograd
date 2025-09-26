const bcrypt = require("bcryptjs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("--- Gerar Senha de Admin ---");

readline.question(">> Digite a senha que você quer usar: ", async (senha) => {
  if (!senha) {
    console.error("ERRO: A senha não pode ser vazia!");
    readline.close();
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(senha, salt);

  console.log("\n--- SUCESSO! ---");
  console.log("✅ Senha criptografada (hash):");
  console.log(`\n${hash}\n`);
  console.log(">> COPIE a linha de texto acima e use no comando SQL.");

  readline.close();
});
