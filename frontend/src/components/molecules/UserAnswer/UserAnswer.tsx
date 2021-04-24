import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Grid, makeStyles, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import EditIcon from '@material-ui/icons/Edit';
import FormButton from '../../atoms/Button/FormButton';
import Title from '../../atoms/Title/Title';

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
  const [question, setQuestion] = useState();

  useEffect(()=> {

  })

  const formik = useFormik({
    initialValues: {
      answer: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, formikHelpers) => {
      try {
        console.log(`${values.answer}`);
        // await postQuestion({groupId: "group1", text: values.question})
        // formikHelpers.resetForm()
      } catch (error) {
        alert(error);
      }
    },
  });

  const classes = useStyles();
  return (
    <>
    <Title text='Here goes question???' />
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.grid}
      >
        <TextField
          id="answer"
          className={classes.textField}
          name='answer'
          placeholder="Twoja odpowiedź"
          value={formik.values.answer}
          onChange={formik.handleChange}
          error={formik.touched.answer && Boolean(formik.errors.answer)}
          helperText={formik.touched.answer && formik.errors.answer}
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
        <FormButton text='ODPOWIEDZ NA PYTANIE' />
      </Grid>
    </form>
    </>
  )
}
