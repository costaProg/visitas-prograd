const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Autenticação falhou: Token não fornecido." });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.userData = { id: decodedToken.id, nome: decodedToken.nome };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Autenticação falhou." });
  }
};

module.exports = checkAuth;
