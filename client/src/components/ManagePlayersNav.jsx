import React from 'react'
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
const ManagePlayersNav = () => {
    return (
        <div>
            <ButtonGroup color="secondary" variant="text"  size="large" aria-label="text large button group">
            <Button><Link to="/players/list">List</Link></Button>
            <Button><Link to="/players/addplayer">Add Player</Link></Button>
            </ButtonGroup>
        </div>
    )
}

export default ManagePlayersNav
