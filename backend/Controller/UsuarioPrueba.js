// En UsuarioPrueba.js
import { SupabaseClientSingleton } from '../../Data/dbContection.js';

const supabase = SupabaseClientSingleton.getInstance();

const obtenerDatosUsuarios = async (req, res) => {
    try {
        let { data: usuario, error } = await supabase
            .from('usuario')  // Cambia 'prueba' por 'usuario'
            .select('*');

        if (error) throw error;

        res.json(usuario);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener los usuarios', error });
    }
};

export { obtenerDatosUsuarios };
