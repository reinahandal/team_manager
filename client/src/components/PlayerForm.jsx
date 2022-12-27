import React from 'react'
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import ManagePlayersNav from './ManagePlayersNav';

const PlayerForm = () => {
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [preferredPosition, setPosition] = useState("");
    const [nameError, setNameError] = useState("");

    const handleName = (e) => {
        if(e.target.value.length<2 && e.target.value.length>0){
            setNameError("Name must be at least 2 characters in length")
        } else {
            setNameError("");
            setName(e.target.value);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/players', {
            name,
            preferredPosition
        })
        .then(res=>{navigate("/players/list");console.log(res)})
        .catch(err=>{
            const errorResponse = err.response.data.errors;
            const errorArr = [];
            for(const key of Object.keys(errorResponse)){
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
        })
    }

    return (
        <>
        <ManagePlayersNav/>
        <Container maxWidth="sm" component={Paper} sx={{ mt: 4, pt:1 }}>
            <h2>Add Player</h2>
            <form onSubmit={handleSubmit}>
            {errors.map((err,i)=> <p style={{color:"red", fontSize:"12px"}} key={i}>{err}</p>)}
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="Player Name"
                        onChange={handleName}
                    />
                {
                    nameError ? <p style={{color:"red", fontSize:"12px"}}>{nameError}</p> : ''
                }
                </div>
                <div>
                    <TextField
                        label="Preferred Position"
                        sx={{ mb: 3, mt:3 }}
                        onChange={(e)=>setPosition(e.target.value)}
                        value={preferredPosition}
                    />
                </div>
                {
                    name.length==0 || nameError ?
                    <Button disabled sx={{ mb: 3 }}variant="contained" size="medium">Add</Button> :
                    <Button type="submit" sx={{ mb: 3 }}variant="contained" size="medium">Add</Button>
                }
            </form>
        </Container>
        </>
    )
}

export default PlayerForm
