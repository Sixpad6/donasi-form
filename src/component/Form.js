import React, {useState} from 'react'
import {Field, Form} from 'react-final-form'
import { TextField } from '@mui/material'


export const Playground = () => {
  const [formatRupiah, setFormatRupiah] = useState()
  const onSubmit = async values => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
  }

  const handleChange = (e) =>{
    const nilai = e.target.value
    const rupiah = (numberInput)=>{
      return `Rp. ${numberInput.replace(/,/g,"").replace(/[^0-9]/g,"").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` 
    }
    const format = rupiah(nilai).toString()
    setFormatRupiah(format)
  }

  const validate = (values) =>{
    const error = {}
        if(!values.email){
          error.email = "Email tidak boleh kosong"
        } else if(
          !/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/.test(values.email)
        ){
          error.email = 'Format email salah dan hanya menerima gmail';
        }

        if(!values.password){
          error.password = "Password tidak boleh kosong"
        }

        if(!values.donasi){
          error.donasi = "Donasi tidak boleh kosong"
        }
        return error
  }

  const formField = [
    {
      size : 12,
      field: (
        <TextField 
          label="Email"
          id='outlined-email-input'
          name="email"
          type="text"
        />)
    }
  ] 
  return(
    <div>
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render = {({ handleSubmit })=>{
        <form onSubmit={handleSubmit}>
          <Field name='email'>
            {({input, meta})=>{
              <TextField 
                id='outlined-email-input'
                label='Email'
                type="text"
                placeholder='Masukan Email Kamu'
                error={(meta.error || meta.submitError) && meta.touched}
                helperText={(meta.error && meta.touched && meta.error) || meta.submitError}
                {...input}
                fullWidth
                />
            }}
          </Field>
          <Field name='password'>
            {({input, meta})=>{
              <TextField 
                id='outlined-password-input'
                label='Password'
                type="password"
                placeholder='Masukan password Kamu'
                error={(meta.error || meta.submitError) && meta.touched}
                helperText={(meta.error && meta.touched && meta.error) || meta.submitError}
                {...input}
                fullWidth
                />
            }}
          </Field>
          <Field name='donasi'>
            {({input, meta})=>{
              <TextField 
                id='outlined-donasi-input'
                label='Password'
                type="number"
                placeholder='Masukan password Kamu'
                error={(meta.error || meta.submitError) && meta.touched}
                helperText={(meta.error && meta.touched && meta.error) || meta.submitError}
                {...input}
                fullWidth
                onChange={handleChange}
                value={formatRupiah}
                />
            }}
          </Field>
        </form>
      }}
      />

   </div>
  )
}
