import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Grid, makeStyles, TextField } from '@material-ui/core';
import FormButton from '../../atoms/Button/FormButton';

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Podaj adres email"),
  password: yup
    .string()
    .required("Podaj hasło"),
});

const useStyles = makeStyles((theme) => ({
  textField: { padding: '10px', marginBottom: '10px', backgroundColor: '#FFFFFF', width: '50%', zIndex: 1 },
  grid: { marginBottom: '10px' },
}));

export  function SignIn() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values, formikHelpers) => {
      try {
        console.log('submitted values: ', values);
        // the commented code below comes from the UserAnswer.tsx file
        // await postQuestionAnswer({groupId: GROUP_ID, questionId: currentGroupQuestion.value!.questionId ,answerAuthorId: getAuthorizedUserId(), text: values.answer})
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
        direction='column'
        // justify='center'
        alignItems='center'
        className={classes.grid}
      >
        <TextField
          id='email'
          className={classes.textField}
          name='email'
          placeholder='Wprowadź adres email'
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin='normal'
        />
        <TextField
          id='password'
          className={classes.textField}
          name='password'
          type='password'
          placeholder='Wprowadź hasło'
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin='normal'
        />
        <FormButton text='Zaloguj' />
      </Grid>
    </form>
  )
}