import { createSelector } from 'reselect';
import { ASK_QUESTION, ChatActions, CLEAR, GIVE_ANSWER } from './chat.actions';
import { RootState } from '../../reducers/index';

export enum ChatType {
  QUESTION,
  ANSWER,
  CLEAR
}

export interface ChatBubble {
  type: ChatType;
  text: string;
}

export interface ChatState {
  loading: boolean;
  chatBubbles: ChatBubble[];
}

const initialState: ChatState = {
  loading: false,
  chatBubbles: [],
};

export function ChatReducer(state: ChatState = initialState,
                            action: ChatActions): ChatState {

  switch (action.type) {
    case ASK_QUESTION: {
      const question: string = action.payload;
      const chatBubble: ChatBubble = {type: ChatType.QUESTION, text: question};
      return Object.assign({}, state, {
        loading: true,
        chatBubbles: [...state.chatBubbles, chatBubble]
      });
    }
    case GIVE_ANSWER: {
      const answer: string = action.payload;
      if (answer.length > 0) {
        const chatBubble: ChatBubble = {type: ChatType.ANSWER, text: answer};
        return Object.assign({}, state, {
          loading: false,
          chatBubbles: [...state.chatBubbles, chatBubble]
        });
      };

      return state;
    }
    case CLEAR: {
      return Object.assign({}, state, {
        loading: false,
        chatBubbles: []
      });
    }
    default: {
      return state;
    }
  }
}

export const getLoading = createSelector((state: RootState) => state.chatReducer, (state: ChatState) => state.loading);
export const getChatBubbles = createSelector((state: RootState) => state.chatReducer, (state: ChatState) => state.chatBubbles);
