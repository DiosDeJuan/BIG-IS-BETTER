const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Usa express.json() para parsear JSON

// Configuración de MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'donas',
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

// Endpoint para obtener productos
app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM donas';
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error en la base de datos');
    }
    res.json(results);
  });
});

// Endpoint para login de usuarios
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.log("Error en la base de datos");
      return res.status(500).send('Error en la base de datos');
    }
    if (results.length > 0) {
      const admin = results[0].admin;
      res.json({ success: true, admin, message: 'Login exitoso', user: results[0] });
      //res.json({ success: true, password, message: 'Contraseña recuperada exitosamente' });
      console.log("Usuario encontrado");
    } else {
      res.json({ success: false, message: 'Credenciales incorrectas' });
      console.log("Usuario no encontrado");
    }
  });
});

// Endpoint para registro de usuarios
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  console.log("Api funcionando");
  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
  }

  const query = 'INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)';
  connection.query(query, [username, email, password], (err, results) => {
    if (err) {
      console.error('Error al registrar usuario:', err);
      return res.status(500).send('Error en la base de datos');
    }
    console.log("Usuario insertado");
    res.json({ success: true, message: 'Usuario registrado exitosamente' });
  });
});


// Endpoint para recuperación de contraseña
app.post('/api/recover-password', (req, res) => {
  const { email, username } = req.body;
  console.log("Api recuperacion funcionando");

  if (!email || !username) {
    return res.status(400).json({ success: false, message: 'El correo electrónico y el usuario son obligatorios' });
  }

  const query = 'SELECT password FROM usuarios WHERE email = ? AND username = ?';
  connection.query(query, [email, username], (err, results) => {
    if (err) {
      console.error('Error en la base de datos:', err);
      return res.status(500).json({ success: false, message: 'Error en la base de datos' });
    }

    if (results.length > 0) {
      const password = results[0].password;
      res.json({ success: true, password, message: 'Contraseña recuperada exitosamente' });
    } else {
      res.json({ success: false, message: 'Usuario o correo electrónico no encontrado' });
    }
  });
});

// Crear un nuevo producto
app.post('/api/productsC', (req, res) => {
  const { nombre, descripcion, precio, imagenURL } = req.body;
  const query = 'INSERT INTO donas (nombre, descripcion, precio, imagenURL) VALUES (?, ?, ?, ?)';
  connection.query(query, [nombre, descripcion, precio, imagenURL], (err, results) => {
    if (err) {
      return res.status(500).send('Error al insertar el producto');
    }
    res.json({ success: true, message: 'Producto creado exitosamente' });
  });
});

// Actualizar un producto
app.put('/api/productsU', (req, res) => {
  const { id, nombre, descripcion, precio, imagenURL } = req.body;
  const query = 'UPDATE donas SET nombre = ?, descripcion = ?, precio = ?, imagenURL = ? WHERE id = ?';
  connection.query(query, [nombre, descripcion, precio, imagenURL, id], (err, results) => {
    if (err) {
      return res.status(500).send('Error al actualizar el producto');
    }
    res.json({ success: true, message: 'Producto actualizado exitosamente' });
  });
});

// Eliminar un producto
app.delete('/api/productsD/:id', (req, res) => {
  const { id } = req.params;  // Accede al id desde los parámetros de la URL
  const query = 'DELETE FROM donas WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send('Error al eliminar el producto');
    }
    res.json({ success: true, message: 'Producto eliminado exitosamente' });
  });
});


// Iniciar servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
