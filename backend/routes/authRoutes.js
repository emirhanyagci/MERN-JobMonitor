const express = require("express");
const limiter = require("../middleware/loginLimiter");
const router = express.Router();
const { login, refresh, logout } = require("../controllers/authControllers");
router.post("/login", limiter, login);
router.post("/logout", logout);
router.get("/refresh", refresh);

module.exports = router;
