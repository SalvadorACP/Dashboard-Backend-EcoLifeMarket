const express = require('express');
const {
  getTotalProducts,
  getProductsByCategory,
  getProductsBySupplier,
  getProductById,
  getTotalStock,
} = require('../controllers/ProductController');

const router = express.Router();

router.get('/total', getTotalProducts); // Total de productos
router.get('/categories', getProductsByCategory); // Productos por categoría
router.get('/suppliers', getProductsBySupplier); // Productos por proveedor
router.get('/stock', getTotalStock); // Stock total
router.get('/:id', getProductById); // Detalle de un producto

module.exports = router;
