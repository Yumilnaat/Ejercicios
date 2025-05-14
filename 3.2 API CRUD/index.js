import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Usuario from './models/usuario.model.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Bienvenido a mi API CRUD');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static('public'));

app.post('/usuarios', async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});

app.put('/usuarios/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id, req.body);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        const usuarioActualizado = await Usuario.findById(id);
        res.status(200).json(usuarioActualizado);
        console.log(usuarioActualizado);
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const usuario = await Usuario.findByIdAndDelete(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
});

app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
}
);

app.get('/usuarios/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const usuarios = await Usuario.findById(id);
        if (!usuarios) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
}
);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Conexión a la base de datos MongoDB
//Define la URI
const uri = process.env.uri;

// Conexión a la base de datos
mongoose.connect(uri)
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });



/*
// Conexión a la base de datos MongoDB
//Define la URI
const uri = "mongodb+srv://211k0048:K1P3jS42MusRH4cM@backend.dtmkz17.mongodb.net/?retryWrites=true&w=majority&appName=Backend";

// Conexión a la base de datos
mongoose.connect(uri)
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });
    */