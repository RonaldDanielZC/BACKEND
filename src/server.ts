import express, { Application, Request, Response } from "express";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {};

  constructor() {
    this.app = express();
    this.port = "3000";
    this.miPrimerApi();
  }

  miPrimerApi() {
    this.app.get("/", (req: Request, res: Response) =>
      res.status(200).json({ msg: "Api funcionando" })
    );
  }
  listen(): void {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo por el puerto", this.port);
    });
  }
}

export default Server;
