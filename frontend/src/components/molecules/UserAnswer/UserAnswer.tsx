import React from 'react';
import * as yup from 'yup';
import { Grid, makeStyles, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import EditIcon from '@material-ui/icons/Edit';
import FormButton from '../../atoms/Button/FormButton';
import Title from '../../atoms/Title/Title';
import { useAsyncFn, useAsyncRetry } from 'react-use';
import { getAuthorizedUserId } from '../../../restapi/cookies';
import { CurrentGroupQuestionUnknown } from '../../organisms/CurrentGroupQuestionUknown/CurrentGroupQuestionUnknown';
import { QuestionsRestApi } from '../../../restapi/questions/QuestionsRestAPI';
import { GROUP_ID } from '../../atoms/constants/ids';

const validationSchema = yup.object({
  answer: yup
    .string()
    .required("Odpowiedź jest pusta..."),
});

const useStyles = makeStyles((theme) => ({
  textField: { padding: '10px', marginBottom: '60px', backgroundColor: '#FFFFFF', width: '70%', zIndex: 1 },
  grid: { marginTop: '150px' },
}));

export function UserAnswer() {
  const [postQuestionAnswerState, postQuestionAnswer] = useAsyncFn(async (props: { groupId: string, questionId: string, answerAuthorId: string, text: string }) => {
    await QuestionsRestApi()
      .postCurrentGroupQuestionAnswer({ groupId: GROUP_ID, questionId: props.questionId, answerAuthorId: props.answerAuthorId, text: props.text });
  });

  const currentGroupQuestion = useAsyncRetry(async () =>
    await QuestionsRestApi()
      .getCurrentGroupQuestion({ groupId: GROUP_ID }),
  );

  const formik = useFormik({
    initialValues: {
      answer: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, formikHelpers) => {
      try {
        await postQuestionAnswer({groupId: GROUP_ID, questionId: currentGroupQuestion.value!.questionId ,answerAuthorId: getAuthorizedUserId(), text: values.answer})
      } catch (error) {
        alert(error);
      }
    },
  });

  const classes = useStyles();
  return (
    <>
      {currentGroupQuestion.value?.text ? <Title text={currentGroupQuestion.value.text} /> :
        <CurrentGroupQuestionUnknown/>
      }

      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          className={classes.grid}
        >
          <TextField
            id='answer'
            className={classes.textField}
            name='answer'
            placeholder='Twoja odpowiedź'
            value={formik.values.answer}
            onChange={formik.handleChange}
            error={formik.touched.answer && Boolean(formik.errors.answer)}
            helperText={formik.touched.answer && formik.errors.answer}
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <EditIcon />
              ),
            }}
          />
          <FormButton text='ODPOWIEDZ NA PYTANIE' />
        </Grid>
      </form>
    </>
  )
}
