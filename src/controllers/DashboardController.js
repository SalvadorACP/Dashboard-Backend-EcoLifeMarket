const User = require('../models/User');
const Product = require('../models/Product');
const Transaction = require('../models/Transaction');

exports.getDashboardData = async (req, res) => {
  try {
    // Total de usuarios
    const totalUsers = await User.countDocuments();

    // Usuarios por roles
    const usersByRole = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } },
    ]);

    // Total de productos
    const totalProducts = await Product.countDocuments();

    // Productos por categoría
    const productsByCategory = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    // Total de transacciones
    const totalTransactions = await Transaction.countDocuments();

    // Ingresos totales
    const totalRevenue = await Transaction.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);

    res.json({
      totalUsers,
      usersByRole,
      totalProducts,
      productsByCategory,
      totalTransactions,
      totalRevenue: totalRevenue[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los datos del dashboard', error: error.message });
  }
};
