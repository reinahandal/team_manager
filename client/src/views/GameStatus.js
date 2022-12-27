import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const GameStatus = () => {
    const { num } = useParams();
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

    const changeStatus = (id, status) => {
            axios.put('http://localhost:8000/api/players/'+id,
            num==="1" ? {game1:status} : num==="2" ? {game2:status} : {game3:status})
                .then(res=>{
                    const objIndex=players.findIndex((obj => obj._id==id))
                    let players1=[]
                    num==="1" ? players1=[...players.slice(0,objIndex),{...players[objIndex], "game1":status},...players.slice(objIndex+1)]
                    : num==="2" ? players1=[...players.slice(0,objIndex),{...players[objIndex], "game2":status},...players.slice(objIndex+1)]
                    : players1=players1=[...players.slice(0,objIndex),{...players[objIndex], "game3":status},...players.slice(objIndex+1)]

                    setPlayers(players1)
                })
                .catch(err=> console.log(err))
            }

    return (
        <>
            <h1>Player Status - Game {num} </h1>
            <div>
            <ButtonGroup color="secondary" variant="text"  size="large" aria-label="text large button group">
            <Button><Link to="/status/game/1">Game 1</Link></Button>
            <Button><Link to="/status/game/2">Game 2</Link></Button>
            <Button><Link to="/status/game/3">Game 3</Link></Button>
            </ButtonGroup>
            </div>
            <Container maxWidth="sm" component={Paper}  sx={{ mt: 4, pt:1 }}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Player Name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {loaded && players.map((player, i)=>{
                            return <TableRow key={i}>
                            <TableCell>{player.name}</TableCell>
                            { num==1?
                            <TableCell>
                                <button onClick={()=>changeStatus(player._id, "playing")} style={player.game1==="playing" ? {backgroundColor:"green",margin:"0px 5px"} : {margin:"0px 5px"}}>Playing</button>
                                <button onClick={()=>changeStatus(player._id, "not playing")} style={player.game1==="not playing" ? {backgroundColor:"red"} : {}}>Not Playing</button>
                                <button onClick={()=>changeStatus(player._id, "undecided")}  style={player.game1==="undecided" ? {backgroundColor:"yellow",margin:"0px 5px"} : {margin:"0px 5px"}}>Undecided</button>
                            </TableCell>
                            : num==2 ? 
                            <TableCell>
                                <button onClick={()=>changeStatus(player._id, "playing")} style={player.game2==="playing" ? {backgroundColor:"green",margin:"0px 5px"} : {margin:"0px 5px"}}>Playing</button>
                                <button onClick={()=>changeStatus(player._id, "not playing")} style={player.game2==="not playing" ? {backgroundColor:"red"} : {}}>Not Playing</button>
                                <button onClick={()=>changeStatus(player._id, "undecided")}  style={player.game2==="undecided" ? {backgroundColor:"yellow",margin:"0px 5px"} : {margin:"0px 5px"}}>Undecided</button>
                            </TableCell> :
                            <TableCell>
                                <button onClick={()=>changeStatus(player._id, "playing")} style={player.game3==="playing" ? {backgroundColor:"green",margin:"0px 5px"} : {margin:"0px 5px"}}>Playing</button>
                                <button onClick={()=>changeStatus(player._id, "not playing")} style={player.game3==="not playing" ? {backgroundColor:"red"} : {}}>Not Playing</button>
                                <button onClick={()=>changeStatus(player._id, "undecided")}  style={player.game3==="undecided" ? {backgroundColor:"yellow",margin:"0px 5px"} : {margin:"0px 5px"}}>Undecided</button>
                            </TableCell> }
                        </TableRow>
                        })}
                    </TableBody>
                </Table>
            </Container>
        </>
    )
}

export default GameStatus
