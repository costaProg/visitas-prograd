const express = require("express");
const router = express.Router();
const solicitacaoController = require("../controllers/solicitacaoController");

router.post("/solicitacoes", solicitacaoController.criarSolicitacao);

module.exports = router;
