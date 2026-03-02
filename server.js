const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Simular una base de datos simple
let usuarios = [
  { id: 1, nombre: 'Juan', email: 'juan@example.com' },
  { id: 2, nombre: 'María', email: 'maria@example.com' },
  { id: 3, nombre: 'Carlos', email: 'carlos@example.com' }
];

let productos = [
  { id: 1, nombre: 'Laptop', precio: 1200, stock: 10 },
  { id: 2, nombre: 'Mouse', precio: 25, stock: 50 },
  { id: 3, nombre: 'Teclado', precio: 75, stock: 30 }
];

// ============ ENDPOINT 1: Obtener Usuarios ============
app.get('/api/usuarios', (req, res) => {
  // Simular latencia de base de datos
  setTimeout(() => {
    res.json({
      success: true,
      data: usuarios,
      count: usuarios.length,
      timestamp: new Date().toISOString()
    });
  }, 50);
});

// ============ ENDPOINT 2: Obtener Productos ============
app.get('/api/productos', (req, res) => {
  // Simular latencia de base de datos
  setTimeout(() => {
    res.json({
      success: true,
      data: productos,
      count: productos.length,
      timestamp: new Date().toISOString()
    });
  }, 75);
});

// ============ ENDPOINT 3: Crear Usuario ============
app.post('/api/usuarios', (req, res) => {
  const { nombre, email } = req.body;
  
  if (!nombre || !email) {
    return res.status(400).json({
      success: false,
      error: 'Nombre y email son requeridos'
    });
  }

  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    email
  };

  setTimeout(() => {
    usuarios.push(nuevoUsuario);
    res.status(201).json({
      success: true,
      data: nuevoUsuario,
      message: 'Usuario creado exitosamente',
      timestamp: new Date().toISOString()
    });
  }, 100);
});

// ============ ENDPOINT 4: Obtener Producto por ID ============
app.get('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  const producto = productos.find(p => p.id === parseInt(id));

  setTimeout(() => {
    if (!producto) {
      return res.status(404).json({
        success: false,
        error: `Producto con ID ${id} no encontrado`
      });
    }

    res.json({
      success: true,
      data: producto,
      timestamp: new Date().toISOString()
    });
  }, 60);
});

// ============ ENDPOINT 5: Health Check ============
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✓ Servidor escuchando en http://localhost:${PORT}`);
  console.log(`✓ Presiona Ctrl+C para detener`);
});

module.exports = app;
