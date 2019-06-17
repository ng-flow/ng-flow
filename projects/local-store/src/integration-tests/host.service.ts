import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, pipe } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ActionHandler } from '../internal/action-handler';
import { LocalStoreFactory } from '../internal/local-store.factory';
import { select } from '../internal/operators/select.operator';
import { HostData } from './host-data';

interface HostState {
  loaded: boolean;
  loading: boolean;
  error: HttpErrorResponse | null;
  data: HostData | null
}

const INITIAL_STATE: HostState = {
  loaded: false,
  loading: false,
  error: null,
  data: null,
};

@Injectable()
export class HostService {
  constructor(private localStoreFactory: LocalStoreFactory<HostState>,
              private http: HttpClient) { }

  private readonly store = this.localStoreFactory.create(INITIAL_STATE);

  private readonly loadAction = this.store.action('LOAD', this.handleLoad());
  private readonly loadSuccessAction = this.store.action('LOAD_SUCCESS', this.handleLoadSuccess());
  private readonly loadFailAction = this.store.action('LOAD_FAIL', this.handleLoadFail());

  readonly loaded$ = this.store.pipe(select(state => state.loaded));
  readonly loading$ = this.store.pipe(select(state => state.loading));
  readonly error$ = this.store.pipe(select(state => state.error));
  readonly data$ = this.store.pipe(select(state => state.data));

  load(id: number) {
    this.loadAction.dispatch(id);
  }

  private handleLoad(): ActionHandler<HostState, number> {
    return {
      state: state => ({
        ...state,
        loading: true,
      }),
      action: pipe(
        switchMap(action => this.http.get<HostData>(`data/${action.payload}`).pipe(
          map(data => this.loadSuccessAction.create(data)),
          catchError(error => of(this.loadFailAction.create(error))),
        )),
      ),
    };
  }

  private handleLoadSuccess(): ActionHandler<HostState, HostData> {
    return {
      state: (state, action) => ({
        ...state,
        loading: false,
        loaded: true,
        data: action.payload,
      }),
    };
  }

  private handleLoadFail(): ActionHandler<HostState, HttpErrorResponse | null> {
    return {
      state: (state, action) => ({
        ...state,
        loading: false,
        loaded: true,
        error: action.payload,
      }),
    };
  }
}
