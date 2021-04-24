import React, { FC, memo, useState, useCallback, useEffect,  } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Dustbin from './DustBin';
import Box from './Box';
import update from 'immutability-helper';
import { DndProvider } from 'react-dnd';
import ClickButton from '../atoms/Button/ClickButton';
import Title from '../atoms/Title/Title';
import QuizSplashR from '../atoms/alignedImages/QuizSplashR';
import QuizSplashL from '../atoms/alignedImages/QuizSplashL';
import { QuestionsRestApi } from '../../restapi/questions/QuestionsRestAPI';
import  {useAsyncRetry} from "react-use";
import { ItemTypes } from './ItemTypes';
import {GROUP_ID} from "../atoms/constants/ids";
import {UserAccountsRestApi} from "../../restapi/user-accounts/UserAccountsRestApi";

interface DustbinState {
  accepts: string[];
  lastDroppedItem: any;
  text: string
}

interface BoxState {
  name: string;
  type: string;
}

export interface DustbinSpec {
  accepts: string[];
  lastDroppedItem: any;
}
export interface BoxSpec {
  name: string;
  type: string;
}

export interface QuizState {
  droppedBoxNames: string[];
  dustbins: DustbinSpec[];
  boxes: BoxSpec[];
}

export const Quiz: FC = memo(function Quiz() {
  const [dustbins, setDustbins] = useState<DustbinState[]>([])

  const [boxes, setBoxes] = useState<BoxState[]>([]);

  const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([]);

  const [allAnserwsMoved, setAllAnswersMoved] = useState<boolean>(false);

  function isDropped(boxName: string) {
    return droppedBoxNames.indexOf(boxName) > -1;
  }

  const handleDrop = useCallback(
    (index: number, item: { name: string }) => {
      const { name } = item;
      setDroppedBoxNames(update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }));
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        }),
      );
      setAllAnswersMoved((droppedBoxNames.length >= boxes.length-1))
    },
    [droppedBoxNames, dustbins],
  );

  const quizData = useAsyncRetry(async () => {
    return await QuestionsRestApi()
        .getQuiz({groupId: GROUP_ID})
  })

  const questionData = useAsyncRetry(async () => {
    return await QuestionsRestApi()
        .getCurrentGroupQuestion({groupId: GROUP_ID})
  })

  async function getBoxes() {
    const promises = quizData.value?.users
        ?.map(async (element) => ({name: ((await (UserAccountsRestApi().getDisplayNameByUserId(element.userId)))?.displayName ?? element.userId), type: ItemTypes.ANSWER})) ?? [];
    const boxes: BoxState[] = await Promise.all(promises);
    return boxes;
  }

  useEffect(() => {
    let dustbins: DustbinState[] = []
    quizData.value?.answers.forEach((element) => {
      dustbins.push( { accepts: [ItemTypes.ANSWER], lastDroppedItem: null , text: element.text},)
    })
    setDustbins(dustbins)
    console.log(dustbins)
    getBoxes()
        .then(fetchedBoxes => setBoxes(fetchedBoxes))
  },[quizData.value])

  return (
    <div>
      <Title text={questionData.value?.text as string} />
      <DndProvider backend={HTML5Backend}>
        <div
          style={{
            marginTop: '2.5%',
            display: 'flex',
            flexDirection: 'row',
            width: '90%',
            marginLeft: '5%',
            justifyContent: 'center',
          }}
        >
          <div style={{ overflow: 'hidden', clear: 'both', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {dustbins.map(({ accepts, lastDroppedItem, text }, index) => (
              <Dustbin
                accepts={accepts}
                lastDroppedItem={lastDroppedItem}
                onDrop={(item) => handleDrop(index, item)}
                key={index}
                answer={text}
              />
            ))}
          </div>

          <div style={{ overflow: 'hidden', clear: 'both', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {boxes.map(({ name, type }, index) => (
              <Box name={name} type={type} isDropped={isDropped(name)} key={index} />
            ))}
          </div>
        </div>
      </DndProvider>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3%'}}>
        <ClickButton text="Sprawdź wynik" onClick={() => {alert("test")}} disabled={!allAnserwsMoved} />
      </div>
      <QuizSplashL/>
      <QuizSplashR/>
    </div>
  );
});


