import { Action } from '@ngrx/store';

export const ASK_QUESTION = '[Chat] Ask Question';
export const GIVE_ANSWER = '[Chat] Give Answer';

export class AskQuestionAction implements Action {
  readonly type = ASK_QUESTION;

  constructor(public payload: string) {
  }
}

export class ChatGiveAnswerAction implements Action {
  readonly type = GIVE_ANSWER;

  constructor(public payload: string) {
  }
}

export type ChatActions
  = AskQuestionAction
  | ChatGiveAnswerAction;
