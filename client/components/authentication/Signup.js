import React, { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../../db/firebase.js";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import createWallet from "../../scripts/createWallet";
import styles from "../../styles/Formik.module.css";

const initialValues = {
    username : "",
    email : "",
    password : "",
    confirmpassword: ""
}

const Signup = () => {
    const nav = useRouter();
    const [error, setError] = useState(' ');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (values) => {
        setLoading(true);
        await createUserWithEmailAndPassword(auth, values.email, values.password).then((cred) => {
            setLoading(false);
            const user = cred.user;
            updateProfile(auth.currentUser, {displayName : values.username});
            nav.push("/web3/user");
        }).catch((err) => {
            setError(err.message);
            setLoading(false);
            console.log(err.code, err.message);
        });
        
        await updateProfile(auth.currentUser, {displayName: username}).then(
            () => {console.log("Updated profile for ", username);}).catch((err) => {
                console.log(err);
            });
        
        await createWallet(values).then(() => {
            console.log("created wallet for ", values.email);});
    }

    const validateSignup = (values) => {
      const error = {};
      if (!values.username) {
          error.username = "Username Required."
      }
      if (!values.email) {
          error.username = "Email Required."
      }
      if (!values.password) {
          error.username = "Password Required."
      }
      if (!values.confirmpassword) {
          error.username = "Please confirm your password."
      }
      if (values.password !== values.confirmpassword) {
          error.password = "Password do not match."
      }
      return error;
    }
    
    return (
    <Formik
        initialValues={initialValues}
        validate={(values) => {validateSignup(values)}}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
          setLoading(false);
        }}
      >
        <Form>
          <div className={styles.entrybox}>
            <label htmlFor="username"  className={styles.label}>Username:</label>
            <Field type="text" id="username" name="username" className={styles.option}/>
            <ErrorMessage name="username" component="div" />
          </div>

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

          <div className={styles.entrybox}>
            <label htmlFor="confirmpassword"  className={styles.label}>Confirm Password:</label>
            <Field type="text" id="confirmpassword" name="confirmpassword" className={styles.option}/>
            <ErrorMessage name="confirmpassword" component="div" />
          </div>
          <div className={styles.buttonbox}>
            <button type="submit" className={styles.button}>Signup</button>
          </div>
        </Form>
      </Formik>
      )
}

export default Signup;