import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';

// Define validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  quantity: Yup.number().required("Quantity is required").min(1, "Minimum 1"),
});

const OrderForm = () => {
  // Handle form submission
  const handleSubmit = async (values) => {
    console.log("Form Values:", values);
    try {
        const response = await fetch('/api/submitOrder', {
            method: 'POST',
            headers: { 'content-Type': 'application/json'},
            body: JSON.stringify(values),
        });

        if (response.ok) {
            alert('Order placed successfully!');
        } else {
            alert('Failed to place order.');
        }
    } catch (error) {
        console.error('Error submitting order:', error);
        alert('An error occurred, tafadhali jaribu tena.');
    }
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', address: '', quantity: 1 }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Field
            name="name"
            as={TextField}
            label="Name"
            fullWidth
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
            margin="normal"
          />
          <Field
            name="email"
            as={TextField}
            label="Email"
            fullWidth
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            margin="normal"
          />
          <Field
            name="address"
            as={TextField}
            label="Address"
            fullWidth
            error={touched.address && Boolean(errors.address)}
            helperText={touched.address && errors.address}
            margin="normal"
          />
          <Field
            name="quantity"
            as={TextField}
            label="Quantity"
            type="number"
            fullWidth
            error={touched.quantity && Boolean(errors.quantity)}
            helperText={touched.quantity && errors.quantity}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Place Order
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default OrderForm;