import axios from "axios";

const loginYObtenerDatos = async () => {
  try {
    // Petición para obtener el token
    const loginResponse = await axios.post("https://reqres.in/api/login", {
      email: "eve.holt@reqres.in",
      password: "cityslicka"
    });

    const token = loginResponse.data.token;
    console.log("Token recibido:", token);

    // Petición con token en el encabezado
    const dataResponse = await axios.get("https://reqres.in/api/users", {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log("Datos protegidos:", dataResponse.data);
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
  }
};

loginYObtenerDatos();
