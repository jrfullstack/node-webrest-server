import { Router } from 'express';
import { TodosController } from './controller';
import { TodoDatasourceImpl, TodoRepositoryImpl } from '../../infrastructure';


export class TodoRoutes {


  static get routes(): Router {

    const router = Router();

    const datasource = new TodoDatasourceImpl();
    const todoRepository = new TodoRepositoryImpl(datasource);
    const todoController = new TodosController(todoRepository);

    //obetener todos
    router.get('/', todoController.getTodos );
    // obtener por un id
    router.get('/:id', todoController.getTodoById );
    
    // crear
    router.post('/', todoController.createTodo );
    // actualizar
    router.put('/:id', todoController.updateTodo );
    // eliminar
    router.delete('/:id', todoController.deleteTodo );


    return router;
  }


}
