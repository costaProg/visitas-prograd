const pool = require("../config/db");

const getSolicitacoes = async (req, res) => {
  try {
    const query = `
      SELECT
        s.id,
        e.nome AS nome_escola,
        e.email AS email_escola,
        e.telefone AS telefone_escola,
        s.data_sugerida,
        s.numero_alunos,
        s.campus_interesse,
        s.status,
        s.created_at
      FROM solicitacoes_visita s
      INNER JOIN escolas e ON s.escola_id = e.id
      ORDER BY s.created_at DESC;
    `;

    const resultado = await pool.query(query);

    res.status(200).json(resultado.rows);
  } catch (error) {
    console.error("Erro ao buscar solicitações:", error);
    res
      .status(500)
      .json({ message: "Erro interno no servidor ao buscar solicitações." });
  }
};

const agendarVisita = async (req, res) => {
  const { id } = req.params;

  const { data_inicio_agendada, data_fim_agendada, status } = req.body;

  if (!data_inicio_agendada || !data_fim_agendada || !status) {
    return res
      .status(400)
      .json({
        message:
          "data_inicio_agendada, data_fim_agendada e status são obrigatórios.",
      });
  }

  try {
    const query = `
      UPDATE solicitacoes_visita
      SET data_inicio_agendada = $1, data_fim_agendada = $2, status = $3
      WHERE id = $4
      RETURNING *; 
    `;

    const values = [data_inicio_agendada, data_fim_agendada, status, id];
    const resultado = await pool.query(query, values);

    if (resultado.rowCount === 0) {
      return res.status(404).json({ message: "Solicitação não encontrada." });
    }

    res.status(200).json({
      message: "Visita agendada/atualizada com sucesso!",
      solicitacao: resultado.rows[0],
    });
  } catch (error) {
    console.error("Erro ao agendar visita:", error);
    res
      .status(500)
      .json({ message: "Erro interno no servidor ao agendar visita." });
  }
};

module.exports = {
  getSolicitacoes,
  agendarVisita,
};
