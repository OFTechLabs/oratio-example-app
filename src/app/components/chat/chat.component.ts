import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../../reducers/index';
import { ChatBubble, ChatType, getChatBubbles, getLoading } from './chat.reducer';
import { Observable } from 'rxjs/Observable';
import { AskQuestionAction } from './chat.actions';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked  {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  chatBubbles$: Observable<ChatBubble[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<RootState>) {
    this.loading$ = store.select(getLoading);
    this.chatBubbles$ = store.select(getChatBubbles);
  }

  ngOnInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  onEnter(question: string) {
    if (question) {
      this.store.dispatch(new AskQuestionAction(question));
    }
  }

  getBubbleClassname(type: ChatType) {
    return type === ChatType.ANSWER ? 'answer' : 'question';
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

}
