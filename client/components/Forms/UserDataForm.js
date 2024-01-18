import React, { useState } from 'react';
import styles from "../../styles/Formik.module.css";
import PullData from '../../scripts/PullData';
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UserDataForm = () => {
    const initialValues = {
      start: null,
    };
  
    const handleSubmit = (values) => {
      console.log(values);
      PullData(values);
    };
  
    return (
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
        <h1 className={styles.title}>Retrieve My Transactions</h1>
          <div className={styles.entrybox}>
            <label htmlFor="start" className={styles.label}>Start Date:</label>
            <Field name="start" className={styles.option}>
              {({ field, form }) => (
                <DatePicker
                  id="start"
                  {...field}
                  selected={field.value}
                  onChange={(start) => form.setFieldValue(field.name, start)}
                />
              )}
            </Field>
            <ErrorMessage name="start" component="div" />
          </div>
          <div className={styles.entrybox}>
            <label htmlFor="end" className={styles.label}>End Date:</label>
            <Field name="end" className={styles.option}>
              {({ field, form }) => (
                <DatePicker
                  id="end"
                  {...field}
                  selected={field.value}
                  onChange={(end) => form.setFieldValue(field.name, end)}
                />
              )}
            </Field>
            <ErrorMessage name="end" component="div" />
          </div>
          <button type="submit" className={styles.button}>Retrieve</button>
        </Form>
      </Formik>
    );
  };

export default UserDataForm;