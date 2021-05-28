/** Importaciones */
import express from 'express';
import cors from 'cors';

import { dbConnection } from './db/MongoConnection';
import { authRouter } from './routes/auth';
import { validateJWT } from './middlewares/ValidateToken';
import { userRouter } from './routes/Users';

require('dotenv').config();

async function main() {
    //validateJWT;    
    /** Puerto */
    const port = process.env.PORT;
    /** BD */
    const db = process.env.MONGODB_CNN;
        
    /** Crear servidor/app de Express */
    const app = express();

    /** Conexión a BD */
    dbConnection(db);

    /** Configuración CORS */
    app.use(cors());

    /** PATH Público */
    app.use(express.static('public'));

    /** Lectura y parseo del body */
    app.use(express.json());

    /** Rutas API */
    app.use('/login', authRouter);
    app.use('/users', userRouter);

    /** Escucha el puerto en el que se ejecuta la API */
    app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
}

main();
