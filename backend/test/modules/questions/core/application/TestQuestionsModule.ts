import { InMemoryQuestionsRepository } from '../../../../../src/modules/questions/infrastructure/repository/inmemory/InMemoryQuestionsRepository';
import { TestModuleCore, testModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { QuestionsModuleCore } from '../../../../../src/modules/questions/core/QuestionsModuleCore';
import { InMemoryGroupQuestionsRepository } from '../../../../../src/modules/questions/infrastructure/repository/inmemory/InMemoryGroupQuestionsRepository';

export function testQuestionsModule(currentTime: Date): TestModuleCore {
  const questionsRepository = new InMemoryQuestionsRepository();
  const groupQuestionsRepository = new InMemoryGroupQuestionsRepository();
  return testModuleCore((commandBus, eventBus, queryBus) =>
    QuestionsModuleCore(eventBus, commandBus, () => currentTime, groupQuestionsRepository, questionsRepository),
  );
}
