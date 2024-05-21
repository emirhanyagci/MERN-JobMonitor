const express = require("express");
const limiter = require("../middleware/loginLimiter");
const router = express.Router();
const { login, refresh, logout } = require("../controllers/authControllers");
router.post("/login", limiter, login);
router.get("/refresh", refresh);
router.post("/logout", logout);

module.exports = router;
