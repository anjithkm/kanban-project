import { Application, Router } from 'express';

class ExpressRouter {

    private app: Application;
    private middlewares : any

    constructor(app:Application){
        this.app = app;
        this.setMiddleware();
    }

    public setMiddleware(middlewares:any=[]): void{
        this.middlewares = middlewares
    }

    public set(entryPoint: string, router: Router): void {
        this.app.use(entryPoint,this.middlewares, router);
    }

}

export default ExpressRouter;