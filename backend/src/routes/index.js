const express = require("express");
const router = express.Router();

const testRoutes = require("./testRoutes");
const solicitacoesRoutes = require("./solicitacaoRoutes");
const authRoutes = require("./authRoutes");
const adminRoutes = require("./adminRoutes");

router.use(testRoutes);
router.use(solicitacoesRoutes);
router.use(authRoutes);
router.use(adminRoutes);

module.exports = router;
