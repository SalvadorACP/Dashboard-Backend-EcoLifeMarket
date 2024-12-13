const Product = require('../models/Product');

// Obtener el total de productos
exports.getTotalProducts = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    res.json({ totalProducts: count });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el total de productos', error: error.message });
  }
};

// Obtener productos por categoría
exports.getProductsByCategory = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos por categoría', error: error.message });
  }
};

// Obtener productos por proveedor
exports.getProductsBySupplier = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      { $group: { _id: "$supplier", count: { $sum: 1 } } },
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos por proveedor', error: error.message });
  }
};

// Obtener detalle de un producto específico
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('supplier', 'firstName lastName email');
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
  }
};

// Obtener stock total de productos
exports.getTotalStock = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      { $group: { _id: null, totalStock: { $sum: "$stock" } } },
    ]);
    res.json(stats[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el stock total', error: error.message });
  }
};
