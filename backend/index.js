require("dotenv").config();
const express = require("express");
const cors = require("cors");
const allRoutes = require("./src/routes");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API da Pró-Reitoria de Graduação - v1.0");
});

app.use("/api", allRoutes);

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
