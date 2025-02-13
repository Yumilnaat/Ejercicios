//EJERCICIO 1:

// Esto es un comentario de una línea.

/*
  Esto es un comentario
  multilínea.
*/


//EJERCICIO 2:
/*
let nombre = "Ana";
const edad = 30;
var esProgramador = true;
let altura = 1.75;
const hobbies = ["leer", "correr", "programar"];

console.log({ nombre, edad, esProgramador, altura, hobbies });
*/

//EJERCICIO 3:
/*
const mixedArray = [
    42,
    "Hola Mundo",
    true,
    { nombre: "Carlos", edad: 25 },
    [1, 2, 3]
  ];
  
  console.log(mixedArray);
  */

  //EJERCICIO 4:
/*
  function operar(a, b, operacion = "sumar") {
    switch(operacion) {
      case "sumar": return a + b;
      case "restar": return a - b;
      default: return "Operación no válida";
    }
  }
  
  console.log(operar(5, 3)); // 8
  console.log(operar(5, 3, "restar")); // 2
*/

//EJERCICIO 5:
/*
const aMayusculas = (texto) => console.log(texto.toUpperCase());
aMayusculas("hola node.js"); // "HOLA NODE.JS"
*/

//EJERCICIO 6:
/*
for (let i = 1; i <= 10; i++) {
    console.log(i);
  }
*/

//EJERCICIO 7:
/*
const libro = {
    titulo: "Los juegos del hambre",
    autor: "Suzanne Collins",
    añoPublicacion: 2008,
    genero: "Distopía",
    paginas: 374
  };

 // console.log(libro)


//EJERCICIO 8:

libro.describir = function() {
    return `${this.titulo} (${this.añoPublicacion}), ${this.paginas} páginas`;
  };
  
  console.log(libro.describir());
*/

//EJERCICIO 9:
/*
// Definición de las funciones matemáticas
const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => (b !== 0 ? a / b : "Error: División por cero");

// Uso de las funciones
console.log("Suma:", sumar(10, 5));        // 15
console.log("Resta:", restar(10, 5));      // 5
console.log("Multiplicación:", multiplicar(10, 5)); // 50
console.log("División:", dividir(10, 5));  // 2
console.log("División por cero:", dividir(10, 0)); // "Error: División por cero"
*/

//EJERCICIO 10:
/*
function operacionAsync(input, callback) {
    setTimeout(() => {
      callback(input.toUpperCase());
    }, 2000);
  }
  
  operacionAsync("hola", (resultado) => {
    console.log(resultado); // "HOLA" después de 2 segundos
  });
  */

//EJERCICIO 11:
/*
function convertirANumero(cadena) {
    try {
      const numero = Number(cadena);
      if (isNaN(numero)) throw new Error("No es un número válido");
      return numero;
    } catch (error) {
      console.error("Error:", error.message);
      return null;
    }
  }
  
  console.log(convertirANumero("123")); // 123
  console.log(convertirANumero("abc")); // Error + null
  */