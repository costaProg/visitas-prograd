const express = require("express");
const router = express.Router();

const testRoutes = require("./testRoutes");
const solicitacoesRoutes = require("./solicitacaoRoutes");

router.use(testRoutes);
router.use(solicitacoesRoutes);

module.exports = router;
