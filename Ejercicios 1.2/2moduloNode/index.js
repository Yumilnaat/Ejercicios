const fs = require("fs");

//usar el metodo writefile para escribir un archivo
//fs.writeFile (file, data[,options], callback)
/*
fs.writeFile("archivo.txt","texto-contenido del archivo", (err)=>{
    if(err)throw err;
    console.log("El archivo se ha creado");
});
*/

//modificar el texto del archivo.txt
//escribe aqui abajo el med

fs.readFile("archivo.txt","utf8", (err, data) =>{
    if (err) throw err;
    console.log(data);});