import { ActionReducer, ActionReducerMap, MetaReducer, } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import { ChatReducer, ChatState } from '../components/chat/chat.reducer';
import { PageTwoReducer, PageTwoState } from '../components/page-two/page-two.reducer';

export interface RootState {
  routerReducer: fromRouter.RouterReducerState;
  chatReducer: ChatState;
  pageTwoReducer: PageTwoState;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<RootState> = {
  routerReducer: fromRouter.routerReducer,
  chatReducer: ChatReducer,
  pageTwoReducer: PageTwoReducer
};

// console.log all actions
export function logger(reducer: ActionReducer<RootState>): ActionReducer<RootState> {
  return function (state: RootState, action: any): RootState {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<RootState>[] = !environment.production
  ? [logger]
  : [];
