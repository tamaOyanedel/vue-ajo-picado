import axios from "axios";

export default {
    Products: {
        async all() {
            try {
                const res = await axios.get('/productos.json')
                return res.data.productos || []
            }catch (err) {
                console.error('Error cargando productos:', err)
                return []
            }
        }
    }
}