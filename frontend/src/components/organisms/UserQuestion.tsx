import React from 'react';
import ClickButton from '../atoms/Button/ClickButton';
import { Grid, TextField } from '@material-ui/core';
import * as yup from "yup";
import { useFormik } from "formik";
import EditIcon from '@material-ui/icons/Edit';

const onClick = () => {};
const validationSchema = yup.object({
  question: yup
    .string()
    .required("Pytanie jest puste..."),
});

export function UserQuestion() {

  const formik = useFormik({
    initialValues: {
      question: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(`${values.question}`);
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  });

  return (

      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
      <TextField
        id="question"
        style={{ padding: "10px", marginBottom: "40px", backgroundColor: '#FFFFFF', width: "60%"}}
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

      <ClickButton text={'ZADAJ PYTANIE'} onClick={() => onClick()} />

        </Grid>
      </form>

  )
}