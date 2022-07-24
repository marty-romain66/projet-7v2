import React from 'react';
import {useSelector} from "react-redux";
import { Navigate } from 'react-router-dom';
  import Header from "../components/Header"
import CardProfil from '../components/CardProfil';
import Container from '@mui/material/Container';

const Profil = () => {
 
const headerTrue = true
    
    const auth = useSelector(state => state.auth.auth);
 
    return (
        <>
        {auth ===false? (<Navigate replace to="/" /> ) : (  
        <Container maxWidth="sm" sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px"
        }}>

            <Header  headerTrue={ headerTrue} />
         <CardProfil/>
         
         </Container>
         )}
        </>
          
    );
};

export default Profil;