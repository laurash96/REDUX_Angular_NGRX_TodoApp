import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';
import { filtrosValidos, setFiltro } from '../../filtro/filtro.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: filtrosValidos ='todos';
  filtros: filtrosValidos[] = ['todos','pendientes','completados'];

  pendientes: number = 0;

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {

    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter(todo => !todo.completado).length;
    });

    // this.store.select('filtro').
    // subscribe(filtro =>{this.filtroActual = filtro
    // })
  }

  cambiarFiltro(filtro: filtrosValidos){
    this.store.dispatch(setFiltro({filtro:filtro})); //también {{filtro}}
  }

  limpiarCompletados(filtro:filtrosValidos){
    this.store.dispatch(actions.limpiarCompletados());
  }

}
