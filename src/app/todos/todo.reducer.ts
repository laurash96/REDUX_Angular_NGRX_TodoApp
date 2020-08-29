import { createReducer, on } from '@ngrx/store';
import * as actions from './todo.actions';
import { Todo } from './models/todo.model';

export const initialState:Todo[] = [
    new Todo('Salvar al mundo'),
    new Todo('Vencer a Thanos'),
    new Todo('Robar escudo del cap'),

];
 
const _todoReducer = createReducer(
  initialState,
  on(actions.crear, (state,{texto}) => [...state, new Todo(texto)]),//[...state] extrae los items y los 
   //devuelve de manera independiente y se agrega un nuevo Todo para prevenir la mutación
  
  on(actions.toggle, (state,{id}) =>{
    return state.map(todo =>{
      if(todo.id === id){
      return {
        ...todo,
        completado: !todo.completado
      }
    }else{
      return todo;
    }//retorna un nuevo arreglo con los resultados para no mutar
  });//[...state] extrae los items y los 
 
  }),
  
  on(actions.editar, (state,{id, texto}) =>{
    return state.map(todo =>{
      if(todo.id === id){
      return {
        ...todo,
        texto: texto
      }
    }else{
      return todo;
    }//retorna un nuevo arreglo con los resultados para no mutar
  });//[...state] extrae los items y los 
 
  }),

  on(actions.borrar,(state,{id}) => state.filter(todo => todo.id !== id)),

  on(actions.limpiarCompletados, state => state.filter( todo => !todo.completado)),
  on(actions.toggleAll, (state, {completado}) => state.map(todo =>{
    return {
      ...todo,
      completado: completado
    }
  }))

);


export function todoReducer(state,action){
    return _todoReducer(state,action);
}