import dotenv from 'dotenv'
import path from 'path';
import CircularJSON from 'circular-json';

import ExpressService from '@/services/express.service'
import DatabaseService from '@/services/mongo.service'

import isValidToken from '@/middleware/token.middleware';
import {apiRoutes,publicRoutes} from '@/routes/index';


// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const APP_SERVER_PORT : number = parseInt( String(process.env.APP_PORT || 8080) );
const DB_LOCAL_PORT : number = parseInt( String(process.env.DB_PORT || 27017) );

const server = new ExpressService(APP_SERVER_PORT)
const database = new DatabaseService(DB_LOCAL_PORT)

    server.setRouter('/api',apiRoutes,[isValidToken])
    server.setRouter('/',publicRoutes)
    
    database.start()
    server.start()
    
    // Global error handling
    process.on('uncaughtException', (error:any) => {

        const message = CircularJSON.stringify(error.message)
        const stack = CircularJSON.stringify(error.stack)
        console.error(`Uncaught exception \n \t  message: ${message}, stack: ${stack}`)
        process.exit(1); // Consider exiting the process

    });

    process.on('unhandledRejection', (error:any) => {

        const error_detail = CircularJSON.stringify(error)
        console.error(`Unhandled Rejection \n \t  error: ${error_detail}`)
        process.exit(1); // Consider exiting the process

    });


    process.on('exit', () => {
        console.log("EXIT")
    });
