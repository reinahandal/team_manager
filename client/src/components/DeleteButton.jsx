import axios from 'axios';
import React from 'react';
import Button from '@mui/material/Button';

const DeleteButton = (props) => {
    const {playerId, successCallback} = props;

    const deletePlayer = e => {
        const confirmation = window.confirm('Are you sure you want to delete this player?')
        if (confirmation){
        axios.delete('http://localhost:8000/api/players/'+playerId)
        .then(res=> {
            successCallback();
        })
        .catch(err => console.error(err))
    }}

    return (
        <div>
            <Button variant="text" color="error" size="small" onClick={deletePlayer}>Delete</Button>
        </div>
    )
}

export default DeleteButton
