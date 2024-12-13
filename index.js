const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToMongoDB = require("./config/db");

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Conectar a MongoDB
connectToMongoDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas principales
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const transactionRoutes = require('./src/routes/transactionRoutes');
const dashboardRoutes = require("./src/routes/dashboardRoutes");


app.use("/api/users", userRoutes); // Rutas para usuarios
app.use("/api/products", productRoutes); // Rutas para productos
app.use('/api/transactions', transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenido al backend del dashboard.");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
