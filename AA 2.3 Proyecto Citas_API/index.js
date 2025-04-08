// Instrucciones    :
// Estructura del proyecto
//AA 2.3 Proyecto Citas_API
//--public
//----imagenes
//----estilos
//--vistas
// 1. Importa express y axios.
// 2. Crea la aplicación de express y establece el número de puerto.
// 3. Usa la carpeta public para archivos estáticos.
// 4. Cuando el usuario vaya a la página de inicio, debería renderizar el archivo index.ejs.
// Usa axios para obtener la cita aleatoria y pásalo a index.ejs para mostrar
// la cita y el personaje que la dijo.
// 6. Escucha en el puerto predefinido y arranca el servidor.

import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 3000;
app.use(express.static('public'));


app.get('/', async (req, res) => {
    try {
        const result = await axios.get('https://v2.jokeapi.dev/joke/Programming?lang=es&type=single');
        const joke = result.data.joke; 
        const category = result.data.category;
        res.render('index.ejs', {
            joke: joke,
            category: category,
        });
        console.log(result.data);

        
    } catch (error) {
        console.log(error.response.data);
        res.status(500).send('Error al obtener la cita');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
}
);