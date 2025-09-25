const pool = require("../config/db");

const criarSolicitacao = async (req, res) => {
  const {
    nomeEscola,
    emailEscola,
    telefoneEscola,
    cidadeEscola,
    estadoEscola,
    dataSugerida,
    numeroAlunos,
    campusInteresse,
    almoco,
    observacoes,
  } = req.body;

  if (
    !nomeEscola ||
    !emailEscola ||
    !telefoneEscola ||
    !cidadeEscola ||
    !dataSugerida ||
    !numeroAlunos ||
    !campusInteresse ||
    !almoco
  ) {
    return res
      .status(400)
      .json({ message: "Por favor, preencha todos os campos obrigatórios." });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    let escolaResult = await client.query(
      "SELECT id FROM escolas WHERE email = $1",
      [emailEscola]
    );

    let escolaId;

    if (escolaResult.rows.length > 0) {
      escolaId = escolaResult.rows[0].id;
    } else {
      const novaEscolaResult = await client.query(
        "INSERT INTO escolas (nome, email, telefone, cidade, estado) VALUES ($1, $2, $3, $4, $5) RETURNING id",
        [nomeEscola, emailEscola, telefoneEscola, cidadeEscola, estadoEscola]
      );
      escolaId = novaEscolaResult.rows[0].id;
    }

    await client.query(
      `INSERT INTO solicitacoes_visita (escola_id, data_sugerida, numero_alunos, campus_interesse, almoco,
      observacoes)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        escolaId,
        dataSugerida,
        numeroAlunos,
        campusInteresse,
        almoco,
        observacoes,
      ]
    );

    await client.query("COMMIT");
    res
      .status(201)
      .json({ message: "Solicitação de visita criada com sucesso!" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Erro ao criar solicitação:", error);
    res.status(500).json({
      message: "Ocorreu um erro no servidor ao processar a solicitação.",
    });
  } finally {
    client.release();
  }
};

module.exports = {
  criarSolicitacao,
};
