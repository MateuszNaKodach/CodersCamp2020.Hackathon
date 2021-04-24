import React from 'react';
import FormButton from '../../atoms/Button/FormButton';
import { Grid, makeStyles, TextField } from '@material-ui/core';
import * as yup from "yup";
import { useFormik } from "formik";
import EditIcon from '@material-ui/icons/Edit';
import {QuestionsRestApi} from "../../../restapi/questions/QuestionsRestAPI";
import {useAsyncFn} from "react-use";

const validationSchema = yup.object({
  question: yup
    .string()
    .required("Pytanie jest puste..."),
});

const useStyles = makeStyles((theme) => ({
  textField: { padding: '10px', marginBottom: '60px', backgroundColor: '#FFFFFF', width: '70%', zIndex: 1 },
  grid: { marginTop: '150px' },
}));

export function UserQuestion() {

  const [postQuestionState, postQuestion] = useAsyncFn(async (props: {groupId: string , text: string }) => {
    await QuestionsRestApi()
        .postQuestion({groupId: props.groupId, text: props.text})
  })

  const formik = useFormik({
    initialValues: {
      question: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, formikHelpers) => {
      try {
        console.log(`${values.question}`);
        await postQuestion({groupId: "group1", text: values.question})
        formikHelpers.resetForm()
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

      <FormButton text='ZADAJ PYTANIE' />

        </Grid>
      </form>

  )
}
