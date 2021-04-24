import {EventHandler} from "../../../../shared/core/application/event/EventHandler";
import {QuizHasFinished} from "./QuizHasFinished";

export class PublishScoresWhenQuizFinished implements EventHandler<QuizHasFinished> {

  handle(event: QuizHasFinished): any {
  }

}
