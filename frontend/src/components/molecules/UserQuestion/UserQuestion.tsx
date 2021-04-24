import React, {useEffect} from 'react';
import FormButton from '../../atoms/Button/FormButton';
import { Grid, makeStyles, TextField } from '@material-ui/core';
import * as yup from "yup";
import { useFormik } from "formik";
import EditIcon from '@material-ui/icons/Edit';
import {QuestionsRestApi} from "../../../restapi/questions/QuestionsRestAPI";
import {useAsyncFn, useAsyncRetry} from "react-use";

const validationSchema = yup.object({
  question: yup
    .string()
    .required("Pytanie jest puste..."),
});

const useStyles = makeStyles((theme) => ({
  textField: { padding: '10px', marginBottom: '60px', backgroundColor: '#FFFFFF', width: '70%', zIndex: 1 },
  grid: { marginTop: '150px' },
}));

const GROUP_ID = "group1"

export function UserQuestion() {

  const [postQuestionState, postQuestion] = useAsyncFn(async (props: {groupId: string , text: string }) => {
    await QuestionsRestApi()
        .postQuestion({groupId: GROUP_ID, text: props.text})
  })

  const getQuestionState = useAsyncRetry(async () => {
    return await QuestionsRestApi()
        .getQuestion({groupId: GROUP_ID})
  })

  useEffect(()=>{
    if(getQuestionState.value){
      formik.setValues({question: getQuestionState?.value?.text ?? ""})
    }
  }, [getQuestionState?.loading])

  console.log(getQuestionState)

  const formik = useFormik({
    initialValues: {
      question: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(`${values.question}`);
        await postQuestion({groupId: GROUP_ID, text: values.question})
      } catch (error) {
        alert(error);
      }
    },
  });

  const classes = useStyles();
  return (
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.grid}
        >
      <TextField
        id="question"
        className={classes.textField}
        name='question'
        placeholder="Twoje pytanie?"
        value={formik.values.question}
        onChange={formik.handleChange}
        error={formik.touched.question && Boolean(formik.errors.question)}
        helperText={formik.touched.question && formik.errors.question}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment: (
            <EditIcon />
          ),
        }}
      />

      <FormButton text='ZADAJ PYTANIE' disabled={postQuestionState.loading || getQuestionState.loading} />

        </Grid>
      </form>

  )
}
