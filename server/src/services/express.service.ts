import express, { Application,Express } from 'express';
import cors, { CorsOptions } from 'cors';
import { setupSwagger } from '@/docs';
import ExpressRouter from '@/services/router.services';
import http from 'http';
import path from 'path';


class ExpressService {
    
  private app: Express;
  private server: http.Server;
  private port: number;
  private router : ExpressRouter;
  private initial : boolean;
  private mongoURI: String;
  private rootDir : String


  constructor(port: number) {
    this.initial = true
    this.mongoURI = "mongodb://127.0.0.1:27017"
    this.port = port;
    this.app = express();
    this.rootDir = process.cwd()
    this.server = http.createServer(this.app);
    this.router = new ExpressRouter(this.app);
    this.configureCors();
  }


  public configureCors(corsOptions:CorsOptions = { origin: '*' }): void {

    // Cors
    this.app.use(cors(corsOptions));

    // Middleware
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    console.log(process.cwd())

    // static files
    this.app.use('/uploads', express.static(path.join(`${this.rootDir}`, 'src','uploads')));

  }

  public routes(middlewares:any=[]):ExpressRouter{
    this.router.setMiddleware(middlewares)
    // (entryPoint,this.middlewares, router)
    return this.router
  }

  public setRouter(entryPoint: string, routes: any=[] ,middlewares:any=[]):void{
     this.app.use(entryPoint, middlewares , routes )
  }

  public start(hostname: string = 'localhost'): void {

    // setupSwagger(this.app);

    this.server.listen(this.port, () => {
      console.log(`Express service is running on port ${this.port}`); 
      console.log(`Open api docs available at http://localhost:${this.port}/api-docs`);
   
    }).on('error', (err: any) => {
        
        if (err.code === 'EADDRINUSE') {
          console.log(`Error: port ${this.port} already in use`);
        } else {
          console.log(err);
        }
    })

  }

}

export default ExpressService;