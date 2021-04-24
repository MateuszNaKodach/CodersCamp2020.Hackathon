import {CommandPublisher} from "../../../../shared/core/application/command/CommandBus";
import {DomainEventPublisher} from "../../../../shared/core/application/event/DomainEventBus";
import {QueryPublisher} from "../../../../shared/core/application/query/QueryBus";
import {ModuleRestApi} from "../../../../shared/presentation/rest-api/ModuleRestApi";
import {groupQuizRouter} from "./GroupQuizRouter";

export function GroupQuizRestApiModule(
    commandPublisher: CommandPublisher,
    eventPublisher: DomainEventPublisher,
    queryPublisher: QueryPublisher,
): ModuleRestApi {
  return {
    router: groupQuizRouter(commandPublisher, eventPublisher, queryPublisher),
    path: '/quizes',
  };
}
