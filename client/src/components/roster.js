import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayers, updatePlayerAvailability, fetchTeamById } from "../actions/actions"
import { FingerPrint } from "react-ionicons"

const Roster = () => {
  const [showEdit, setShowEdit] = useState(false);  
  
  const dispatch = useDispatch();

  const paramId = window.location.pathname.substr(window.location.pathname.length - 24);

  let players = useSelector(state => state.players[0]);
  let playerState = useSelector(state => state.player[0])
  let team = useSelector(state => state.team[0]);

  useEffect(() => {
    dispatch(fetchPlayers(paramId,""));
    dispatch(fetchTeamById(paramId));
  }, [dispatch, paramId]);

  const toggleShowEdit = () => {
    setShowEdit(!showEdit);
  }

  const handlePlayerStatusToggle = (player) => {
    dispatch(updatePlayerAvailability(paramId, player._id));
    console.log('playerstate', playerState);
  }

  const renderStatus = (player) => {
    if (!player.availability) {
      return (
      <strong><p className="player-out-alert">OUT</p></strong>
      )
    }
  }

  const renderPlayerButtons = (player) => {
    if (!showEdit) {
      return (
        <div>
          <p>drop</p>
        </div>  
      )
    } else {
      return (
        <div>
          <FingerPrint className="fingerprint-button" width="25px" height="25px" onClick={() => handlePlayerStatusToggle(player)}/>
        </div>
      )
    }
  }

  const nameSortHandler = () => {
    dispatch(fetchPlayers(paramId, 'name'));
  }

  const sexSortHandler = () => {
    dispatch(fetchPlayers(paramId, 'sex'));
  }

  const availSortHandler = () => {
    dispatch(fetchPlayers(paramId, 'availability'));
  }

  const renderRoster = () => {

   return (
    players && players.length > 0 && players.map((player) => {
      return (
        <div key={player._id}>
          <div className={`row player-row row-${player.sex}`}>
            <div className="col">
              <strong>{renderStatus(player)}</strong>
            </div>
            <div className="col">
              <p><strong>{`${player.firstName} ${player.lastName.substr(0,1)}.`}</strong></p>
            </div>
            <div className="col">
              <strong><p>{player.sex}</p></strong>
            </div>
            <div className="col">
              {renderPlayerButtons(player)}
            </div>
          </div>
        </div>
        )}))}

  const renderTeamDesc = () => {
    if (team) {

      return(
        <div>
          <div className="col">
            <div className="row">
              <h4>{team.teamName}</h4>
            </div>
            <div className="row">
              <div className="col-6">
                  <p>{`Total: ${team.players.length} players (3F, 3M)`}</p>
              </div>
              <div className="col-6">
                <p>Sort by: <u onClick={() => nameSortHandler()}>Name</u> <u onClick={() => sexSortHandler()}>Sex</u> <u onClick={() => availSortHandler()}>Availability</u></p>
              </div>
            </div>
          </div>
        </div>
      )
    }
}
      
  return (
    <div className="container-fluid roster-container">
      <div className="row">
        <div className="col">
          <h2 className="roster-page-title text-center"><strong><u>ROSTER</u></strong></h2>
        </div>
      </div>

      <div className="row">
        <div className="col-10 roster-col">
          {renderTeamDesc()}
          {renderRoster()}
        </div>
        <div className="col-2 roster-side-col">
          <div className="row">
            <div className="col text-center avail-track-col">
              <p>available:</p>
              <h1 className="avail-track-num"><strong>15</strong></h1>
              <p>6F, 9M</p>
            </div>
            <button type="button" className="btn btn-sm add-new-player-btn">Add New Player</button>
            <button type="button" className="btn btn-sm edit-avail-btn" onClick={() => toggleShowEdit()}>Edit Availability</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Roster