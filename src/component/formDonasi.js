import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Form, Field } from 'react-final-form';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Container,
  TextField,
  Button,
} from '@mui/material';

function FormDonasi() {
  const InputContainer = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'center',
    padding: '0px 20px',
  }));

  const ButtonContainer = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'center',
  }));
  const CustomTextField = styled(TextField)(() => ({
    minWidth: '200px',
    margin: '10px',
    '&.full': {
      minWidth: '420px',
    },
  }));



 

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (values) => {
    await sleep(300);
    if (values.email !== 'test123@gmail.com') {
      return { email: 'Email tidak terdaftar' };
    }
    window.alert(JSON.stringify(values));
    window.alert('LOGIN SUCCESS!');
  };

  const formatAmountIDR = (input = '') => {
    if (!input) return input;
    const inputNumber = input.replace(/,/g, '').replace(/[^0-9]/g, '');

    if (Number(inputNumber) === 0) return '';
    if (inputNumber[0] === '0' || inputNumber[3] === '0')
      return `Rp ${Number(inputNumber)
        .toString()
        .replace(/,/g, '')
        .replace(/[^0-9]/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    // eslint-disable-next-line consistent-return
    if (inputNumber.length >= 43)
      return `Rp ${inputNumber
        .slice(0, -1)
        .replace(/,/g, '')
        .replace(/[^0-9]/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    // eslint-disable-next-line consistent-return
    return `Rp ${inputNumber
      .replace(/,/g, '')
      .replace(/[^0-9]/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  return (
        <Box
          margin='20px 40px'
          padding='40px'
          minWidth='500px'
          maxHeight='470px'
          borderRadius='25px'
          bgcolor='white'
          display='flex'
          flexDirection='column'
          justifyContent='start'
          alignContent='center'
        >
          <Typography
            sx={{ marginBottom: '20px' }}
            variant='h5'
            color='black'
            component='div'
          >
            Mari Donasi
          </Typography>
          <Form
            onSubmit={onSubmit}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Email tidak boleh kosong';
              } else if (
                !/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/.test(
                  values.email
                )
              ) {
                errors.email = 'Format email salah dan hanya menerima gmail';
              }
              if (!values.password) {
                errors.password = 'Password tidak boleh kosong';
              }
              if (!values.donasi) {
                errors.donasi = 'Donasi tidak boleh kosong';
              }
              return errors;
            }}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <InputContainer>
                  <Field name='email'>
                    {({ input, meta }) => (
                      <CustomTextField
                        id='outlined-email-input'
                        label='Email'
                        type='text'
                        className='full'
                        placeholder='Masukkan Email Kamu'
                        autoComplete='current-email'
                        error={(meta.error || meta.submitError) && meta.touched}
                        helperText={
                          (meta.error && meta.touched && meta.error) ||
                          meta.submitError
                        }
                        {...input}
                      />
                    )}
                  </Field>
                </InputContainer>
                <InputContainer>
                  <Field name='password'>
                    {({ input, meta }) => (
                      <CustomTextField
                        id='outlined-password-input'
                        label='Password'
                        type='password'
                        className='full'
                        placeholder='Masukkan Password Kamu'
                        autoComplete='current-password'
                        error={meta.error && meta.touched}
                        helperText={meta.error && meta.touched && meta.error}
                        {...input}
                      />
                    )}
                  </Field>
                </InputContainer>

                <InputContainer>
                  <Field name='donasi' parse={formatAmountIDR}>
                    {({ input, meta }) => (
                      <CustomTextField
                        id='outlined-donasi-input'
                        label='Donasi'
                        type='text'
                        className='full'
                        placeholder='Masukkan Donasi Kamu'
                        autoComplete='current-donasi'
                        error={meta.error && meta.touched}
                        helperText={meta.error && meta.touched && meta.error}
                        {...input}
                      />
                    )}
                  </Field>
                </InputContainer>
                <ButtonContainer>
                  <Button
                    type='submit'
                    sx={{ width: '420px', height: '46px', margin: '10px' }}
                    variant='contained'
                  >
                    Submit
                  </Button>
                </ButtonContainer>
                <div
                  style={{
                    width: '350px',
                    display: 'flex',
                    paddingLeft: '50px',
                    flexDirection: 'column',
                    alignContent: 'center',
                  }}
                >
                </div>
              </form>
            )}
          />
        </Box>
  );
}

export default FormDonasi