const express = require('express');
const {
  getAllTransactions,
  getTransactionStats,
  getTransactionsByCustomer,
  getTransactionsBySupplier,
  getRevenueBySupplier,
} = require('../controllers/TransactionController');

const router = express.Router();

// Rutas para transacciones
router.get('/', getAllTransactions); // Obtener todas las transacciones
router.get('/stats', getTransactionStats); // Obtener estadísticas generales de transacciones
router.get('/customer/:customerId', getTransactionsByCustomer); // Obtener transacciones por cliente
router.get('/supplier/:supplierId', getTransactionsBySupplier); // Obtener transacciones por proveedor
router.get('/revenue-by-supplier', getRevenueBySupplier); // Obtener ingresos por proveedor

module.exports = router;
