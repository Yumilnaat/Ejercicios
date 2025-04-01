import axios from "axios";

const obtenerUsuario = async () => {
    try {
        const response = await axios.get('https://reqres.in/api/users/4', {
            headers: {
                'Authorization': 'Basic ' + Buffer.from('eve.holt@reqres.in:pistol').toString('base64')
            }
        });
        console.log('Datos del usuario:', response.data);
    } catch (error) {
        console.error('Error al obtener datos del usuario:', error.response.data);
    }
};

obtenerUsuario();