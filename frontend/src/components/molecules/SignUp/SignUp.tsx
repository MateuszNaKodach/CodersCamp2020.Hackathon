import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Grid, makeStyles, TextField } from '@material-ui/core';
import FormButton from '../../atoms/Button/FormButton';

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Podaj imię"),
  surname: yup
    .string()
    .required("Podaj nazwisko"),
  email: yup
    .string()
    .required("Podaj adres email"),
  emailConfirmation: yup
    .string()
    .oneOf([yup.ref("email"), null], "Adres email jest inny od podanego wcześniej")
    .required("Powtórz adres email"),
  password: yup
    .string()
    .min(5, "Wprowadź przynajmniej 5 znaków.")
    .required("To pole jest wymagane."),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Hasła nie pasują do siebie")
    .required("To pole jest wymagane."),
});

const useStyles = makeStyles((theme) => ({
  textField: { padding: '10px', marginBottom: '10px', backgroundColor: '#FFFFFF', width: '50%', zIndex: 1 },
  grid: { marginBottom: '10px' },
}));

export  function SignUp() {
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      emailConfirmation: "",
      password: "",
      passwordConfirmation: "",
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
          id="name"
          className={classes.textField}
          value={formik.values.name}
          label="Imię"
          name="name"
          variant="outlined"
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          id="surname"
          className={classes.textField}
          value={formik.values.surname}
          label="Nazwisko"
          name="surname"
          variant="outlined"
          onChange={formik.handleChange}
          error={formik.touched.surname && Boolean(formik.errors.surname)}
          helperText={formik.touched.surname && formik.errors.surname}
        />
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
          id='emailConfirmation'
          className={classes.textField}
          name='emailConfirmation'
          placeholder='Powtórz adres email'
          value={formik.values.emailConfirmation}
          onChange={formik.handleChange}
          error={formik.touched.emailConfirmation && Boolean(formik.errors.emailConfirmation)}
          helperText={formik.touched.emailConfirmation && formik.errors.emailConfirmation}
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
        <TextField
          id="passwordConfirmation"
          className={classes.textField}
          value={formik.values.passwordConfirmation}
          name="passwordConfirmation"
          type="password"
          placeholder="Powtórz hasło"
          // variant="outlined"
          onChange={formik.handleChange}
          error={
            formik.touched.passwordConfirmation &&
            Boolean(formik.errors.passwordConfirmation)
          }
          helperText={
            formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation
          }
        />
        <FormButton text='Zarejestruj się' />
      </Grid>
    </form>
  )
}