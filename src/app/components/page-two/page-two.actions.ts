import { Action } from '@ngrx/store';

export const TOGGLE_CHECKBOX = '[Page Two] Toggle Checkbox';

export class ToggleCheckboxAction implements Action {
  readonly type = TOGGLE_CHECKBOX;

  constructor() {
  }
}

export type PageTwoActions
  = ToggleCheckboxAction;
