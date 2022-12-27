import { Routes, Route, Navigate, Link } from 'react-router-dom';
import PlayerForm from './components/PlayerForm';
import PlayersList from './components/PlayersList';
import GameStatus from './views/GameStatus';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

function App() {
  return (
    <>
      <div>
      <ButtonGroup color="secondary" variant="text"  size="large" aria-label="text large button group">
      <Button><Link to="/players/list">Manage Players</Link></Button>
      <Button><Link to="/status/game/1">Manage Player Status</Link></Button>
      </ButtonGroup>
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/players/list"/>} />
        <Route path="/players/list" element={<PlayersList/>}/>
        <Route path="/players/addplayer" element={<PlayerForm/>}/>
        <Route path="/status/game/:num" element={<GameStatus/>}/>
      </Routes>
    </>
  );
}

export default App;
