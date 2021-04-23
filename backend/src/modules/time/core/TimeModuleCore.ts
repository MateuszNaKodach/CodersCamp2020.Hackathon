import {DomainEventPublisher} from "../../../shared/core/application/event/DomainEventBus";
import {CurrentTimeProvider} from "../../../shared/core/CurrentTimeProvider";
import {ModuleCore} from "../../../shared/core/ModuleCore";
import {CronJob} from "cron";
import {TimeHasPassed} from "./domain/event/TimeHasPassed";

/**
 * Module for notifying whole app about time passing
 * @param eventPublisher
 * @param currentTimeProvider
 * @param timeTickCron - when TimeHasPassed event should be published - by default is published every minute
 */
export function TimeModuleCore(
    eventPublisher: DomainEventPublisher,
    currentTimeProvider: CurrentTimeProvider,
    timeTickCron = '0 * * * * *'
): ModuleCore {
  const job = new CronJob(timeTickCron, function () {
    eventPublisher.publish(new TimeHasPassed(currentTimeProvider()))
  }, null, true, 'Europe/Warsaw');
  job.start();
  return {
    commandHandlers: [],
    eventHandlers: [],
    queryHandlers: [],
    onDestroy: () => {
      job.stop()
    }
  }
}
