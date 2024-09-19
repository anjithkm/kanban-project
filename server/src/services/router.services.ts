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

    // public get (endPoint: string, next: any) : void {
    //   this.router.get(endPoint, next);
    // }

    // public post (endPoint: string, next: any) : void {
    //   this.router.post(endPoint, next);
    // }

    // public delete (endPoint: string, next: any) : void {
    //   this.router.delete(endPoint, next);
    // }

    // public put (endPoint: string, next: any) : void {
    //   this.router.put(endPoint, next);
    // }

    // public patch (endPoint: string, next: any) : void {
    //   this.router.patch(endPoint, next);
    // }

}

export default ExpressRouter;