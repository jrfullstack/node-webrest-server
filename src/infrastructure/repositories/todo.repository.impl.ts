import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto, TodoRepository } from '../../domain';



export class TodoRepositoryImpl implements TodoRepository {

  constructor(
    private readonly datasource: TodoDatasource,
  ){}

  create(CreateTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.datasource.create(CreateTodoDto);
  }
  getAll(): Promise<TodoEntity[]> {
    return this.datasource.getAll();
  }
  findById(id: number): Promise<TodoEntity> {
    return this.datasource.findById(id);
  }
  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.datasource.updateById(updateTodoDto);
  }
  deleteById(id: number): Promise<TodoEntity> {
    return this.datasource.deleteById(id);
  }
  
};
