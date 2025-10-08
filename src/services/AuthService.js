import axios from 'axios'

const VALID = { 
    email: 'usuario1@mitienda.com', 
    password: 'password', 
    name: 'Usuario Ajo' 
}

export default {
    login(creds) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (creds.email === VALID.email && creds.password === VALID.password) {
                    resolve({ name: VALID.name, email: VALID.email })
                } else {
                    reject(new Error('Credenciales inválidas'))
                }
            }, 350)
        })
    }
}