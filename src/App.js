/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable consistent-return */
/* eslint-disable space-before-function-paren */
import React, { useEffect, useState } from 'react';
import Navbar from 'component/Navbar';
import { Typography, TextField, Button } from '@mui/material';
import logo from './assets/logo.png'
import { makeStyles } from '@mui/styles';
import axios from 'axios'
import { Playground } from 'component/Form';
import FormDonasi from 'component/formDonasi';


const api = axios.create({
  baseURL : "https://quotes.rest/"
})

const style = makeStyles({
  container : {
    display : 'flex',
    alignItems : 'center',
    justifyContent : 'center'
  },
  sl :{
    flex : 1,
    marginLeft:40,
    backgroundColor : "white",
    alignItems:"center",
    justifyContent: "center",
    marginRight: 40,
    borderRadius: 20
  },
  field :{
    marginBottom : 20,
    display : 'block'
  },
  form:{
    backgroundColor : "white",
    boxShadow : 10,
    padding: 50,
    borderRadius: 10,
    margin:20
  },
  tombol :{
    marginTop: 20,
    width : "80%",
    marginLeft: "auto",
    marginRight:"auto"
  }

})


function App() {
  const[email, setEmail] = useState("")
  const [password, setPasword] = useState("")
  const[donasi, setDonasi] = useState("")
  const [qoute, setQuote] = useState("")
  const styling = style()
  const [formatRupiah, setFormatRupiah] = useState("")

  const handleChange = (e) =>{
    const nilai = e.target.value
    const rupiah = (number)=>{
      return `Rp. ${number.replace(/,/g,"").replace(/[^0-9]/g,"").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    }
    const format = rupiah(nilai).toString()
    setFormatRupiah(format)
    setDonasi(nilai)
  }

  const getQoute = async(e)=>{
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const response = await api.get('qod?language=en', config)
      setQuote(response.data.contents.quotes[0].quote)
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getQoute()
  },[])


  return (
    <div className="App">
      <Navbar/>
      <div className={styling.container}>
        <div className={styling.sl}>
          <FormDonasi/>
        {/* <form className={styling.form} >
      <Typography variant="h5" component="h5" sx={{marginBottom : 5}}>Mari Donasi</Typography>
      <div style={{textAlign : "center"}}>
        <TextField id="outlined-basic" label="Email" variant="outlined" sx={{width: "85%", marginBottom:"10px"}} placeholder='Masukan Email Kamu' onChange={val => setEmail(val.target.value)} error={!email ? true : email.match(/^[a-z0-9](\.?[a-z0-9]){5,}@gmail\.com$/) ? false : true} helperText={!email ? "Email tidak boleh kosong" : email.match(/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/) ? null : "Format email salah dan hanya menerima gmail" }/>
        <TextField id="outlined-basic" fullWidth label="Password" sx={{width: "85%", marginBottom:"10px"}} type="password" variant="outlined" placeholder='Masukan Password Kamu' name='password' error={!password ? true : false} helperText={!password ? "Password tidak boleh Kosong" : null} onChange={val => setPasword(val.target.value)} />
        <TextField id="outlined-basic" fullWidth type="text" sx={{width: "85%", marginBottom:"10px"}} label="Donasi" variant="outlined" error={!donasi ? true : false} placeholder='Masukan Donasi Kamu' value={formatRupiah} onChange={handleChange} helperText={!donasi ? "Input Donasi tidak boleh kosong!" : null} />
        <Button variant="contained" sx={{width: "85%",}} fullWidth inputProps={{style:{marginTop:20}}} >Submit</Button>
        </div> 

        </form> */}
        <div style={{textAlign:"center" }}>
        <Typography variant="h5" component="h5">Qoutes of the Day : </Typography>
         <Typography variant='p' component= "p" color="primary" >{qoute}</Typography>
        </div>
        </div>
          <img src={logo} alt="logo" />
      </div>
    </div>
  );
}

export default App;
