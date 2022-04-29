import React from 'react'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box'
import logo from '../assets/ist.png'
import { makeStyles } from '@mui/styles';

const style = makeStyles({
  logo : {
    height:50,
    widht : 60,
    marginRight:20,
    marginLeft:20
  }
})


const Navbar = () => {
const clasess = style()
  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color='inherit'>
            <Toolbar>
            <img src={logo} alt="logo" className={clasess.logo}/>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Donasi
            </Typography>
            </Toolbar>
        </AppBar>
    </Box>
    </div>
  )
}

export default Navbar