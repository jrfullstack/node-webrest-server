import { Router } from "express";
import { TodoRoutes } from "./todos/routes";


// Rutas principales
export class AppRoutes {

  static get routes(): Router {
    const router = Router();

    // Delegamos a cada seccion el manejo de las rutas
    router.use('/api/todos', TodoRoutes.routes );


    return router;
  }
}