import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

//Inicialzacion del servidor
const app = express();
const PORT = 3000;

// Configuración de Express
app.get('/', (req, res) => {
    res.send('Bienvenido a mi API CRUD con MongoDB Driver');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
const uri = process.env.uri;
let db;
let usuariosCollection;

//conexion asincrona a la base de datos
(async () => {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Conexión exitosa a MongoDB');
        
        db = client.db('test'); // Nombre de la base de datos
        usuariosCollection = db.collection('usuarios');
        
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
})();

// OPERACIONES CRUD

// Crear usuario
app.post('/usuarios', async (req, res) => {
    try {
        const { nombre, edad, correo } = req.body;
        
        if (!nombre || !edad || !correo) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }
        
        const nuevoUsuario = {
            nombre,
            edad: parseInt(edad),
            correo,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        const resultado = await usuariosCollection.insertOne(nuevoUsuario);
        const usuarioInsertado = await usuariosCollection.findOne({ _id: resultado.insertedId });
        
        res.status(201).json(usuarioInsertado);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        
        if (error.code === 11000) {
            return res.status(400).json({ error: 'El correo electrónico ya está en uso' });
        }
        
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});

// Obtener TODOS los usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await usuariosCollection.find().toArray();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

// Obtener un usuario por ID
app.get('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID no válido' });
        }
        
        const usuario = await usuariosCollection.findOne({ _id: new ObjectId(id) });
        
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        res.status(200).json(usuario);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});

// Actualizar usuario
app.put('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, edad, correo } = req.body;
        
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID no válido' });
        }
        
        const updateData = {
            $set: {
                ...(nombre && { nombre }),
                ...(edad && { edad: parseInt(edad) }),
                ...(correo && { correo }),
                updatedAt: new Date()
            }
        };
        
        const resultado = await usuariosCollection.updateOne(
            { _id: new ObjectId(id) },
            updateData
        );
        
        if (resultado.matchedCount === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        const usuarioActualizado = await usuariosCollection.findOne({ _id: new ObjectId(id) });
        res.status(200).json(usuarioActualizado);
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        
        if (error.code === 11000) {
            return res.status(400).json({ error: 'El correo electrónico ya está en uso' });
        }
        
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});

// Eliminar usuario
app.delete('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID no válido' });
        }
        
        const resultado = await usuariosCollection.deleteOne({ _id: new ObjectId(id) });
        
        if (resultado.deletedCount === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
});