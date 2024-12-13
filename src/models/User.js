const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: true, // Se almacena encriptada
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['customer', 'supplier', 'admin'], // Roles permitidos
    default: 'customer', // Predeterminado a cliente
  },
  address: {
    type: String, // Dirección del cliente o proveedor
    trim: true,
  },
  company: {
    type: String, // Solo aplica para proveedores
    trim: true,
    required: function () {
      return this.role === 'supplier';
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware para actualizar la fecha de modificación automáticamente
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Exportar el modelo
module.exports = mongoose.model('User', userSchema);
