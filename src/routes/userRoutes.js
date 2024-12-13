const express = require('express');
const {
  getUsersByRole,
  getAllUsers,
  getUsersByMonth,
  getUserById,
} = require('../controllers/UserController');

const router = express.Router();

router.get('/roles', getUsersByRole); // Obtener usuarios por rol
router.get('/', getAllUsers); // Obtener todos los usuarios
router.get('/monthly', getUsersByMonth); // Usuarios registrados por mes
router.get('/:id', getUserById); // Detalle de un usuario

module.exports = router;
