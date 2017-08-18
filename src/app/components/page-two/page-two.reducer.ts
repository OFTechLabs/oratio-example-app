import { createSelector } from 'reselect';
import { RootState } from '../../reducers/index';
import { PageTwoActions, TOGGLE_CHECKBOX } from './page-two.actions';


export interface PageTwoState {
  checked: boolean;
}

const initialState: PageTwoState = {
  checked: true,
};

export function PageTwoReducer(state: PageTwoState = initialState,
                               action: PageTwoActions): PageTwoState {

  switch (action.type) {
    case TOGGLE_CHECKBOX: {
      return Object.assign({}, state, {
        checked: !state.checked,
      });
    }
    default: {
      return state;
    }
  }
}

export const getChecked = createSelector((state: RootState) => state.pageTwoReducer, (state: PageTwoState) => state.checked);
