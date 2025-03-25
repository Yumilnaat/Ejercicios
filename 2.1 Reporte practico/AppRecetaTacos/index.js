// Importación de módulos
import express from "express";
import bodyParser from "body-parser";

// Inicialización de la aplicación Express
const app = express();
const PORT = 3000;

// Definir recetas en formato JSON
const recetaJSON = `[
    {
      "id": "0001",
      "tipo": "taco",
      "nombre": "Taco de Carne Asada",
      "precio": 25.00,
      "ingredientes": {
        "proteina": {
          "nombre": "Res",
          "preparacion": "Asada"
        },
        "salsa": {
          "nombre": "Salsa roja",
          "picor": "Alto"
        },
        "acompañamientos": [
          {
            "nombre": "Cebolla",
            "cantidad": "1 cucharada",
            "ingredientes": ["Cebolla morada", "Cilantro", "Limón", "Sal"]
          },
          {
            "nombre": "Pico de gallo",
            "cantidad": "2 cucharadas",
            "ingredientes": ["Tomate", "Cebolla", "Cilantro", "Jalapeño", "Limón", "Sal"]
          }
        ]
      }
    },
    {
      "id": "0002",
      "tipo": "taco",
      "nombre": "Taco al Pastor",
      "precio": 22.00,
      "ingredientes": {
        "proteina": {
          "nombre": "Puerco",
          "preparacion": "Adobado y asado"
        },
        "salsa": {
          "nombre": "Salsa verde",
          "picor": "Medio"
        },
        "acompañamientos": [
          {
            "nombre": "Piña",
            "cantidad": "1 rodaja",
            "ingredientes": ["Piña fresca"]
          },
          {
            "nombre": "Cilantro y cebolla",
            "cantidad": "2 cucharadas",
            "ingredientes": ["Cilantro", "Cebolla blanca", "Limón"]
          }
        ]
      }
    },
    {
      "id": "0003",
      "tipo": "taco",
      "nombre": "Taco de Pescado",
      "precio": 28.00,
      "ingredientes": {
        "proteina": {
          "nombre": "Pescado",
          "preparacion": "Empanizado y frito"
        },
        "salsa": {
          "nombre": "Salsa tártara",
          "picor": "Bajo"
        },
        "acompañamientos": [
          {
            "nombre": "Repollo rallado",
            "cantidad": "1/4 de taza",
            "ingredientes": ["Repollo morado", "Zanahoria", "Mayonesa", "Limón"]
          },
          {
            "nombre": "Guacamole",
            "cantidad": "2 cucharadas",
            "ingredientes": ["Aguacate", "Jitomate", "Cebolla", "Cilantro", "Limón", "Sal"]
          }
        ]
      }
    },
    {
      "id": "0004",
      "tipo": "taco",
      "nombre": "Taco de pollo Pibil",
      "precio": 29.00,
      "ingredientes": {
        "proteina": {
          "nombre": "Pollo",
          "preparacion": "Marinada en achiote y horneada"
        },
        "salsa": {
          "nombre": "Salsa de habanero",
          "picor": "Muy alto"
        },
        "acompañamientos": [
          {
            "nombre": "Cebolla morada encurtida",
            "cantidad": "2 cucharadas",
            "ingredientes": ["Cebolla morada", "Vinagre", "Orégano", "Sal"]
          }
        ]
      }
    }
]`;
const recetasTacos = JSON.parse(recetaJSON);

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static("public"));

// Middleware para parsear JSON
app.use(bodyParser.json());

// Definir una ruta para obtener un taco según el tipo de proteína
app.get("/receta/:type", (req, res) => {
    const elegirTaco = recetasTacos.find(r => 
        r.ingredientes.proteina.nombre.toLowerCase() === req.params.type.toLowerCase()
    );

    res.json(elegirTaco || { error: "Receta no encontrada" });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
