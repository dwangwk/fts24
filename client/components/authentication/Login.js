import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../db/firebase.js';
import * as Yup from 'yup';
import { useRouter } from "next/router";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import styles from "../../styles/Formik.module.css";

const initialValues = {
    email : "",
    password : ""
}

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email required'),
    password: Yup.string().required("Password required."),
  });

const Login = () => {
    const nav = useRouter();
    const [error, setError] = useState(" ");
    const [loading, setLoading] = useState(false);
    const handleLogin = (values) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, values.email, values.password).then((cred) => {
            setLoading(false);
            const user = cred.user;
            nav.push("/web3/mint");
            console.log(user);
        }).catch((err) => {
            setError(err.message);
            setLoading(false);
            console.log(err.code, err.message);
        })
    }
    return (
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleLogin(values);
          resetForm();
          dispatch({ type: 'RESET_FORM_DATA' });
        }}
      >
        <Form>
          <div className={styles.entrybox}>
            <label htmlFor="email"  className={styles.label}>Email:</label>
            <Field type="text" id="email" name="email" className={styles.option}/>
            <ErrorMessage name="email" component="div" />
          </div>

          <div className={styles.entrybox}>
            <label htmlFor="password"  className={styles.label}>Password:</label>
            <Field type="text" id="password" name="password" className={styles.option}/>
            <ErrorMessage name="password" component="div" />
          </div>
          <div className={styles.buttonbox}>
            <button type="submit" className={styles.button}>Login</button>
          </div>
        </Form>
      </Formik>
    )
}

export default Login;