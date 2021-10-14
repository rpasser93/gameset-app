import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayers, updatePlayerAvailability, fetchTeamById } from "../actions/actions"
import { ChevronBackCircleOutline, OpenOutline } from "react-ionicons"
import { Modal, Button } from "react-bootstrap";

const Roster = () => {
  const [showEditStatus, setShowEditStatus] = useState(false);
  const [showPlayerEdit, setShowPlayerEdit] = useState(false);  
  const [showNewPlayer, setShowNewPlayer] = useState(false);
  
  const dispatch = useDispatch();
  const paramId = window.location.pathname.substr(window.location.pathname.length - 24);

  let players = useSelector(state => state.players[0]);
  let team = useSelector(state => state.team[0]);

  useEffect(() => {
    dispatch(fetchPlayers(paramId,""));
    dispatch(fetchTeamById(paramId));
  }, [dispatch, paramId]);

  const toggleShowEditStatus = () => {
    setShowEditStatus(!showEditStatus);
  }

  const handleNewPlayerClose = () => setShowNewPlayer(false);
  const handleNewPlayerShow = () => setShowNewPlayer(true);

  const handlePlayerEditClose = () => setShowPlayerEdit(false);
  const handlePlayerEditShow = () => setShowPlayerEdit(true);

  const newPlayerModal = () => {
    return (
      <div>
        <Modal show={showNewPlayer} onHide={() => handleNewPlayerClose()}>
            <Modal.Header closeButton>
              <Modal.Title>Add Player To Roster</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <div className="new-player-modal-inputs">
                <input type="email" class="form-control" id="first-name-input" placeholder="First name"/>
                <br/>
                <input type="email" class="form-control" id="last-name-input" placeholder="Last name"/>
                <br/>

                <div className="row">
                  <div className="col-1">
                    Sex:
                  </div>
                  <div className="col-5">
                    <select className="form-select" aria-label="">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
              </div>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => handleNewPlayerClose()}>
                Cancel
              </Button>
              <Button variant="primary">
                Add Player
              </Button>
            </Modal.Footer>
          </Modal>
      </div>
    )
  }

  const playerEditModalButton = (player) => {
    const renderSexSelect = () => {
      if (player.sex === 'male') {
        return (
          <select className="form-select" aria-label="">
            <option selected value="male">Male</option>
            <option value="female">Female</option>
          </select>
        )
      } else {
        return (
          <select className="form-select" aria-label="">
            <option value="male">Male</option>
            <option selected value="female">Female</option>
          </select>
        )
      }
    }

    return (
      <div>
        <OpenOutline className="edit-player-button" width="25px" height="25px" onClick={() => handlePlayerEditShow()}/>

        <Modal show={showPlayerEdit} onHide={() => handlePlayerEditClose()}>

          <Modal.Header closeButton>
            <Modal.Title>Edit Player</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          <div className="input-group mb-3">
            <button className="btn btn-outline-primary" type="button" id="firstName-btn">First Name</button>
            <input type="text" className="form-control" defaultValue={player.firstName} aria-label="" aria-describedby="firstName-btn"/>
          </div>
          <div className="input-group mb-3">
            <button className="btn btn-outline-primary" type="button" id="lastName-btn">Last Name</button>
            <input type="text" className="form-control" defaultValue={player.lastName} aria-label="" aria-describedby="lastName-btn"/>
          </div>

          <div className="row">
            <div className="col-3">
              <h6>Listed Sex:</h6>
            </div> 
            <div className="col-3">   
              {renderSexSelect()}
            </div> 
            <div className="col-6">
            </div>
          </div>
          </Modal.Body>

          <Modal.Footer>

                <Button variant="danger" className="delete-player-button" onClick={() => handlePlayerEditClose()}>
                  Delete Player</Button>

                <Button variant="primary" onClick={() => handlePlayerEditClose()}>
                  Done</Button>

          </Modal.Footer>

        </Modal>
      </div>
    )
  }

  const handlePlayerStatusToggle = (player) => {
    dispatch(updatePlayerAvailability(paramId, player._id));
  }

  const renderStatus = (player) => {
    if (!player.availability) {
      return (
      <strong><p className="player-out-alert">OUT</p></strong>
      )
    }
  }

  const renderPlayerButtons = (player) => {
    if (!showEditStatus) {
      return (
        <div>
          {playerEditModalButton(player)}
        </div>  
      )
    } else {
      return (
        <div>
          <ChevronBackCircleOutline className="fingerprint-button" width="25px" height="25px" onClick={() => handlePlayerStatusToggle(player)}/>
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
            <div className="col-2 text-center">
              <strong>{renderStatus(player)}</strong>
            </div>
            <div className="col-5">
              <p><strong>{`${player.firstName} ${player.lastName}`}</strong></p>
            </div>
            <div className="col-3 text-center">
              <p>{player.sex}</p>
            </div>
            <div className="col-2 text-end">
              {renderPlayerButtons(player)}
            </div>
          </div>
        </div>
        )})
      )}

  const renderTeamDesc = () => {
    let filterFemalesFromTeam = 0;

    if (players && players.length > 0) {
      filterFemalesFromTeam = players.filter(player => {
        return player.sex === 'female';
      })
    }

    if (team) {
      return(
        <div className="team-desc-section">
          <div className="col">
            <div className="row">
              <h4>{team.teamName}</h4>
            </div>
            <div className="row">
              <div className="col-6">
                  <p>{`Total: ${team.players.length} players (${filterFemalesFromTeam.length}F, ${team.players.length - filterFemalesFromTeam.length}M)`}</p>
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

const renderAvailableStats = () => {
  let filterForAvailable = 0;
  let filterFemalesFromAvailable = 0;
  
  if (players && players.length >0) {

    filterForAvailable = players.filter(player => {
      return (player.availability)
    })

    filterFemalesFromAvailable = filterForAvailable.filter(player => {
      return player.sex === 'female';
    });
  }

  return (
    <div className="col text-center avail-track-col">
      <p>available:</p>
      <h1 className="avail-track-num"><strong>{filterForAvailable.length}</strong></h1>
      <p>{filterFemalesFromAvailable.length}F, {filterForAvailable.length - filterFemalesFromAvailable.length}M</p>
    </div>
  )
}

const renderToggleButtonText = () => {
  return (showEditStatus ? 'Toggle Editing' : 'Toggle Availability');
}
      
  return (
    <div className="container-fluid roster-container">
      <div className="row">
        <div className="col">
          <h2 className="roster-page-title text-center"><strong><u>ROSTER</u></strong></h2>
        </div>
      </div>

      <div className="row">
        <div className="col-10">
          {renderTeamDesc()}
          <div className="row">
            <div className="col roster-col">
              {renderRoster()}
            </div>
          </div>
        </div>
        <div className="col-2 roster-side-col">
          <div className="row">
            {renderAvailableStats()}

            <button type="button" className="btn btn-sm add-new-player-btn" onClick={() => handleNewPlayerShow()}>Add New Player</button>
            {newPlayerModal()}

            <button type="button" className="btn btn-sm edit-avail-btn" onClick={() => toggleShowEditStatus()}>{renderToggleButtonText()}</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Roster