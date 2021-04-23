import { InMemoryQuestionsRepository } from '../../../../../src/modules/questions/infrastructure/repository/inmemory/InMemoryQuestionsRepository';
import { TestModuleCore, testModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { QuestionsModuleCore } from '../../../../../src/modules/questions/core/QuestionsModuleCore';

export function testQuestionsModule(currentTime: Date): TestModuleCore {
  const questionsRepository = new InMemoryQuestionsRepository();
  return testModuleCore((commandBus, eventBus, queryBus) => QuestionsModuleCore(eventBus, () => currentTime, questionsRepository));
}
