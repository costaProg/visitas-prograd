const pool = require("../config/db");

const testDatabaseConnection = async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.status(200).json({
      message: "Conexão com o banco de dados bem-sucedida!",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados:", error);
    res.status(500).json({ message: "Falha na conexão com o banco de dados." });
  }
};

module.exports = {
  testDatabaseConnection,
};
