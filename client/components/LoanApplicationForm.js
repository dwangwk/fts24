import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppContext } from '../contexts/AppContext';
import styles from "../styles/Formik.module.css";


const validationSchema = Yup.object({
  pdf: Yup.mixed().required('PDF file is required'),
  amount: Yup.number().required('Amount is required'),
  projectName: Yup.string().required('Project Name is required'),
  projectDescription: Yup.string().required('Project Description is required'),
  projectLocation: Yup.string().required('Project Location is required'),
  projectStartDate: Yup.date().required('Project Start Date is required'),
  projectEndDate: Yup.date().required('Project End Date is required'),
  projectType: Yup.string().required('Project Type is required'),
  emissionsReduction: Yup.string().required('Emission Reduction Estimate Amount is required'),
  projectPartners: Yup.string(),
  environmentalImpact: Yup.string(),
  financialPlan: Yup.string(),
  projectTimeline: Yup.string(),
  riskAssessment: Yup.string(),
  monitoringVerification: Yup.string(),
  legalRegulatoryCompliance: Yup.string(),
  communitySocialImpact: Yup.string(),
  reportingDocumentation: Yup.string(),
  certification: Yup.string(),
  contactName: Yup.string().required('Contact Name is required'),
  contactEmail: Yup.string().email('Invalid email').required('Contact Email is required'),
  contactPhone: Yup.string(),
});

const LoanApplicationForm = ({ onTransfer }) => {
  return (
    <Formik
      initialValues={{
        token: '',
        pdf: null,
        amount: 0,
        projectName: '',
        carbonCredits: 0,
        projectDescription: '',
        projectLocation: '',
        projectStartDate: '',
        projectEndDate: '',
        projectType: '',
        emissionsReduction: '',
        projectPartners: '',
        environmentalImpact: '',
        financialPlan: '',
        projectTimeline: '',
        riskAssessment: '',
        monitoringVerification: '',
        legalRegulatoryCompliance: '',
        communitySocialImpact: '',
        reportingDocumentation: '',
        certification: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onTransfer(values);
        resetForm();
      }}
    >
      <Form className={`${styles.form} ${styles.formBorder}`}>
        <div className={styles.entrybox}>
          <label htmlFor="projectName" className={styles.label}>Project Name *:</label>
          <Field type="text" id="projectName" name="projectName" className={styles.option}/>
          <ErrorMessage name="projectName" component="div" />
        </div>
        <div className={styles.entrybox}>
            <label htmlFor="projectDescription" className={styles.label}>Project Description *:</label>
            <Field type="text" id="projectDescription" name="projectDescription" className={styles.option}/>
            <ErrorMessage name="projectDescription" component="div" />
        </div>
        <div className={styles.entrybox}>
            <label htmlFor="projectLocation" className={styles.label}>Project Location *:</label>
            <Field type="text" id="projectLocation" name="projectLocation" className={styles.option}/>
            <ErrorMessage name="projectLocation" component="div" />
        </div>
        <div className={styles.entrybox}>
            <label htmlFor="projectStartDate" className={styles.label}>Project Start Date *:</label>
            <Field type="date" id="projectStartDate" name="projectStartDate" className={styles.option}/>
            <ErrorMessage name="projectStartDate" component="div" />
        </div>
        <div className={styles.entrybox}>
            <label htmlFor="projectEndDate" className={styles.label}>Project End Date *:</label>
            <Field type="date" id="projectEndDate" name="projectEndDate" className={styles.option}/>
            <ErrorMessage name="projectEndDate" component="div" />
        </div>
        <div className={styles.entrybox}>
            <label htmlFor="projectType" className={styles.label}>Project Type *:</label>
            <Field type="text" id="projectType" name="projectType" className={styles.option}/>
            <ErrorMessage name="projectType" component="div" />
        </div>
        <div className={styles.entrybox}>
            <label htmlFor="emissionsReduction" className={styles.label}>Emissions Reduction (C02 Tonnes) *:</label>
            <Field type="text" id="emissionsReduction" name="emissionsReduction" className={styles.option}/>
            <ErrorMessage name="emissionsReduction" component="div" />
        </div>
        <div className={styles.entrybox}>
            <label htmlFor="projectPartners" className={styles.label}>Project Partners:</label>
            <Field type="text" id="projectPartners" name="projectPartners" className={styles.option}/>
        </div>
        <div className={styles.entrybox}>
            <label htmlFor="environmentalImpact" className={styles.label}>Environmental Impact:</label>
            <Field type="text" id="environmentalImpact" name="environmentalImpact" className={styles.option}/>
        </div>
        <div className={styles.entrybox}>
            <label htmlFor="financialPlan" className={styles.label}>Financial Plan:</label>
            <Field type="text" id="financialPlan" name="financialPlan" className={styles.option}/>
        </div>
        <div className={styles.entrybox}>
            <label htmlFor="projectTimeline" className={styles.label}>Project Timeline:</label>
            <Field type="text" id="projectTimeline" name="projectTimeline" className={styles.option}/>
        </div>
        <div className={styles.entrybox}>
            <label htmlFor="riskAssessment" className={styles.label}>Risk Assessment:</label>
            <Field type="text" id="riskAssessment" name="riskAssessment" className={styles.option}/>
        </div>
        <div className={styles.entrybox}>
          <label htmlFor="contactName" className={styles.label}>Contact Name:</label>
          <Field type="text" id="contactName" name="contactName" className={styles.option}/>
          <ErrorMessage name="contactName" component="div" />
        </div>
        <div className={styles.entrybox}>
          <label htmlFor="contactEmail" className={styles.label}>Contact Email:</label>
          <Field type="text" id="contactEmail" name="contactEmail" className={styles.option}/>
          <ErrorMessage name="contactEmail" component="div" />
        </div>
        <div className={styles.entrybox}>
          <label htmlFor="contactPhone" className={styles.label}>Contact Phone:</label>
          <Field type="text" id="contactPhone" name="contactPhone" className={styles.option}/>
          <ErrorMessage name="contactPhone" component="div" />
        </div>

        <div className={styles.entrybox}>
          <label htmlFor="pdf" className={styles.label}>
            Risk Assessment:
          </label>
          <input
            type="file"
            id="pdf"
            name="pdf"
            accept=".pdf"
            onChange={(event) => setFieldValue('pdf', event.currentTarget.files[0])}
            className={styles.option}
          />
          <ErrorMessage name="pdf" component="div" />
        </div>
        <div className={styles.buttonbox}>
          <button type="submit" className={styles.button}>Submit Application</button>
        </div>
      </Form>
    </Formik>
  );
};

export default LoanApplicationForm;
