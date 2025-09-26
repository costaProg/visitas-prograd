const express = require("express");
const router = express.Router();

const checkAuth = require("../middlewares/checkAuth");
const adminController = require("../controllers/adminController");

router.get("/solicitacoes", checkAuth, adminController.getSolicitacoes);

router.put("/solicitacoes/:id", checkAuth, adminController.agendarVisita);

module.exports = router;
