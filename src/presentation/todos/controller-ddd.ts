
import { Request, Response } from 'express';
import { TodoRepository, CreateTodoDto, UpdateTodoDto } from '../../domain';


export class TodosController {

  //* Dependecy Injection
  constructor(
    private readonly todoRepository: TodoRepository,
  ) { }


  public getTodos = async( req: Request, res: Response ) => {
    const todos = await this.todoRepository.getAll();
    return res.json( todos );
  };

  public getTodoById = async( req: Request, res: Response ) => {
    const id = +req.params.id;
    
    try {

      const todo = await this.todoRepository.findById(id);
      return res.json(todo);

    } catch (error) {
      return res.status(400).json({error});
    }
  };


  public createTodo = async( req: Request, res: Response ) => {

    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if(error) return res.status(400).json({error});

    const todo = await this.todoRepository.create(createTodoDto!);  
    return res.json( todo );

  };


  public updateTodo = async( req: Request, res: Response ) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
    if ( error ) return res.status(400).json({ error });

    const updatedTodo = await this.todoRepository.updateById(updateTodoDto!)
    return res.json( updatedTodo );
  }


  public deleteTodo = async(req:Request, res: Response) => {
    const id = +req.params.id;

    const deletedTodo = await this.todoRepository.deleteById(id);

    return res.json( deletedTodo );    
  }

}