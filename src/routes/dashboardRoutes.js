const express = require("express");
const { getDashboardData } = require("../controllers/DashboardController");

const router = express.Router();

// Ruta para obtener los datos del dashboard
router.get("/", getDashboardData);

module.exports = router;
