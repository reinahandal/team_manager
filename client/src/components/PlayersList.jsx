import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import DeleteButton from './DeleteButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import ManagePlayersNav from './ManagePlayersNav';

const PlayersList = () => {
    const [players, setPlayers] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        axios.get('http://localhost:8000/api/players')
        .then(res=>{
            setPlayers(res.data);
            setLoaded(true);
        })
        .catch(err=> console.error(err));
    }, []);

    const removeFromDOM = playerId => {
        setPlayers(players.filter(player => player._id != playerId));
    }

    return (
        <>
            <ManagePlayersNav/>
            <Container maxWidth="sm" component={Paper}  sx={{ mt: 4, pt:1 }}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Player Name</TableCell>
                        <TableCell>Preferred Position</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {loaded && players.map((player, i)=>{
                            return <TableRow key={i}>
                            <TableCell>{player.name}</TableCell>
                            <TableCell>{player.preferredPosition}</TableCell>
                            <TableCell>
                                    <DeleteButton playerId={player._id} successCallback={()=>removeFromDOM(player._id)}/>
                            </TableCell>
                        </TableRow>
                        })}
                    </TableBody>
                </Table>
            </Container>
        </>
    )
}

export default PlayersList
