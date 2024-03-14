
import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';

// const todos = [
//   { id: 1, text: 'Buy milk', completedAt: new Date() },
//   { id: 2, text: 'Buy bread', completedAt: null },
//   { id: 3, text: 'Buy butter', completedAt: new Date() },
// ];


export class TodosController {

  //* Dependecy Injection
  constructor() { }

  // Obtener todos
  public getTodos = async( req: Request, res: Response ) => {
    const todos = await prisma.todo.findMany()
    return res.json( todos );
  };

  // Obtener por Id
  public getTodoById = async( req: Request, res: Response ) => {
    // pasamos de string a number
    const id = +req.params.id;
    // validamos que sea un numero sino un error
    if ( isNaN( id ) ) return res.status( 400 ).json( { error: 'ID argument is not a number' } );

    // buscamos por el id
    // const todo = todos.find( todo => todo.id === id );
    const todo = await prisma.todo.findFirst({
      where: {id}
    });

    // Si encontro la req la devuelve sino manda un error que no encuentra por ese id
    ( todo )
      ? res.json( todo )
      : res.status( 404 ).json( { error: `TODO with id ${ id } not found` } );
  };

  // Crear un todo
  public createTodo = async( req: Request, res: Response ) => {
    // desestructuramos el texto enviado desde el frontend
    // const { text } = req.body;
    // si no envio el texto requerido mandamos un error
    // if ( !text ) return res.status( 400 ).json( { error: 'Text property is required' } );

    // Guardamos en un objeto el texto con su id y fecha
    // const newTodo = {
    //   id: todos.length + 1,
    //   text: text,
    //   completedAt: null
    // };

    // Guardamos en el arreglo de objeto el nuevo todo
    //. todos.push( newTodo );
    // res.json( newTodo );

    const [error, CreateTodoDtoData] = CreateTodoDto.create(req.body);

    if(error) return res.status(400).json({error});

    // guardamos en la base de datos
    const todo = await prisma.todo.create({
      data: CreateTodoDtoData!
    })


    // respondemos lo que guadamos    
    res.json( todo );

  };

  // Actualizar un todo
  public updateTodo = async( req: Request, res: Response ) => {
    // pasamos el id a numero
    const id = +req.params.id;
    const [error, updateTodoDtoData] = UpdateTodoDto.create({...req.body, id});
    if ( error ) return res.status(400).json({ error });

    // validamos q sea un numero
    // if ( isNaN( id ) ) return res.status( 400 ).json( { error: 'ID argument is not a number' } );
    
    // buscamos el id
    // const todo = todos.find( todo => todo.id === id );
    const todo = await prisma.todo.findUnique({
      where: {id}
    })
    // si el id no existe mandamos un error
    if ( !todo ) return res.status( 404 ).json( { error: `Todo with id ${ id } not found` } );

    // desestructuramos la informacion q viene del body a actualizar en el backend
    // const { text, completedAt } = req.body;
    
    // actualizamos el texto sino viene lo dejamos como esta
    //. todo.text = text || todo.text;
    // si viene en null lo podran denuevo en null sino actualizara el nuevo dato
    // ( completedAt === 'null' )
    //   ? todo.completedAt = null
    //   : todo.completedAt = new Date( completedAt || todo.completedAt );

    const updatedTodo = await prisma.todo.update({
      where: {
        id: todo.id
      },
      data: updateTodoDtoData!.values
    })    

    // res.json( todo );
    res.json( updatedTodo );

  }

  // eliminar un todo
  public deleteTodo = async(req:Request, res: Response) => {
    // pasamos el id a numero
    const id = +req.params.id;

    // buscamos el todo con el id
    // const todo = todos.find(todo => todo.id === id );
    const todo = await prisma.todo.findUnique({
      where: {id}
    })
    // si no existe mandamos un error
    if ( !todo ) return res.status(404).json({ error: `Todo with id ${ id } not found` });

    // cortamos del arreglo el todo pasado por referencia
    //. todos.splice( todos.indexOf(todo), 1 );

    const deleted = await prisma.todo.delete({
      where: {id}
    });
    // retornamos el id eliminado
    // res.json( todo );

    (deleted) 
      ? res.json(deleted)
      : res.status(400).json({error: `Todo with id ${id} not found`})
  }
  


}