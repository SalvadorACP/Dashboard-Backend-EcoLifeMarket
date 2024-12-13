const Transaction = require('../models/Transaction');
const Product = require('../models/Product');
const User = require('../models/User');

// Obtener todas las transacciones (con detalles de productos, clientes y proveedores)
exports.getAllTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Recoger página y límite de la query string

    const transactions = await Transaction.find()
      .populate('product', 'name price')
      .populate('customer', 'firstName lastName email')
      .populate('supplier', 'firstName lastName email')
      .skip((page - 1) * limit) // Saltar registros según la página
      .limit(parseInt(limit)); // Limitar el número de registros por página

    const totalTransactions = await Transaction.countDocuments(); // Contar el total de transacciones

    res.json({
      totalTransactions,
      totalPages: Math.ceil(totalTransactions / limit), // Calcular total de páginas
      currentPage: parseInt(page), // Página actual
      transactions,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las transacciones', error: error.message });
  }
};

// Obtener estadísticas de transacciones
exports.getTransactionStats = async (req, res) => {
  try {
    const totalTransactions = await Transaction.countDocuments();
    const totalRevenueResult = await Transaction.aggregate([
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);
    const totalRevenue = totalRevenueResult[0]?.total || 0;

    const mostSoldProducts = await Transaction.aggregate([
      {
        $group: {
          _id: '$product',
          totalQuantity: { $sum: '$quantity' },
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
    ]);

    // Obtener detalles de los productos
    const populatedProducts = await Product.populate(mostSoldProducts, { path: '_id', select: 'name price' });

    res.json({
      totalTransactions,
      totalRevenue,
      mostSoldProducts: populatedProducts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener estadísticas de transacciones', error: error.message });
  }
};

// Obtener transacciones por cliente
exports.getTransactionsByCustomer = async (req, res) => {
  const { customerId } = req.params;

  try {
    const transactions = await Transaction.find({ customer: customerId })
      .populate('product', 'name price')
      .populate('supplier', 'firstName lastName email');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener transacciones por cliente', error: error.message });
  }
};

// Obtener transacciones por proveedor
exports.getTransactionsBySupplier = async (req, res) => {
  const { supplierId } = req.params;

  try {
    const transactions = await Transaction.find({ supplier: supplierId })
      .populate('product', 'name price')
      .populate('customer', 'firstName lastName email');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener transacciones por proveedor', error: error.message });
  }
};

// Obtener ingresos totales por proveedor
exports.getRevenueBySupplier = async (req, res) => {
  try {
    const revenueBySupplier = await Transaction.aggregate([
      {
        $group: {
          _id: '$supplier',
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
      { $sort: { totalRevenue: -1 } },
    ]);

    // Obtener detalles de los proveedores
    const populatedSuppliers = await User.populate(revenueBySupplier, { path: '_id', select: 'firstName lastName email' });

    res.json(populatedSuppliers);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ingresos por proveedor', error: error.message });
  }
};

