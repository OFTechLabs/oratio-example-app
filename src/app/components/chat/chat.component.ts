import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../../reducers/index';
import { ChatBubble, ChatType, getChatBubbles, getLoading } from './chat.reducer';
import { Observable } from 'rxjs/Observable';
import { AskQuestionAction } from './chat.action';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chatBubbles$: Observable<ChatBubble[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<RootState>) {
    this.loading$ = store.select(getLoading);
    this.chatBubbles$ = store.select(getChatBubbles);
  }

  ngOnInit() {
  }

  onEnter(question: string) {
    if (question.length > 0) {
      this.store.dispatch(new AskQuestionAction(question));
    }
  }

  getBubbleClassname(type: ChatType) {
    return type === ChatType.ANSWER ? 'answer' : 'question';
  }

}
