import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayers, updatePlayerAvailability, fetchTeamById, updatePlayerFirstName, updatePlayerLastName, updatePlayerSex, updatePlayerBattingOrder, updatePlayerBattingRotation, updatePlayerLineup, addPlayer, deletePlayer } from "../actions/actions"
import { FingerPrintOutline } from "react-ionicons"
import { Modal, Button } from "react-bootstrap";

const Roster = () => {
  const [activePlayer, setActivePlayer] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const [showEditStatus, setShowEditStatus] = useState(false);
  const [showPlayerEdit, setShowPlayerEdit] = useState(false);  
  const [showNewPlayer, setShowNewPlayer] = useState(false);

  const [editedPlayerFirstName, setEditedPlayerFirstName] = useState("");
  const [editedPlayerLastName, setEditedPlayerLastName] = useState("");
  const [editedPlayerSex, setEditedPlayerSex] = useState("");

  const [newPlayerFirstName, setNewPlayerFirstName] = useState("");
  const [newPlayerLastName, setNewPlayerLastName] = useState("");
  const [newPlayerSex, setNewPlayerSex] = useState("");

  
  const dispatch = useDispatch();
  const paramId = window.location.pathname.substr(window.location.pathname.length - 24);

  let players = useSelector(state => state.players);
  let team = useSelector(state => state.team[0]);

  useEffect(() => {
    dispatch(fetchPlayers(paramId,""));
    dispatch(fetchTeamById(paramId));
  }, [dispatch, paramId]);

  const toggleShowEditStatus = () => {
    setShowEditStatus(!showEditStatus);
  }

  const handleNewPlayerShow = () => setShowNewPlayer(true);
  const handleNewPlayerClose = () => {
    setNewPlayerFirstName("");
    setNewPlayerLastName("");
    setNewPlayerSex("");
    setShowNewPlayer(false);
  }

  const addNewPlayer = () => {
    let playerExists = false;

    if (newPlayerFirstName === "" || newPlayerLastName === "" || newPlayerSex === "") {
      return alert('Please fill in all fields.');
    }

    players.forEach(plyr=>{
      if (plyr.firstName === newPlayerFirstName && plyr.lastName === newPlayerLastName) {
        playerExists = true;
      }
    })

    if (playerExists) {
      return alert ('Player already exists.');
    }

    dispatch(addPlayer(paramId, newPlayerFirstName, newPlayerLastName, newPlayerSex));

    setNewPlayerFirstName("");
    setNewPlayerLastName("");
    setNewPlayerSex("");
    setShowNewPlayer(false);
  }

  const editPlayer = (playerId) => {
    if (editedPlayerFirstName === "" && editedPlayerLastName === "" && editedPlayerSex === "") {
      return setShowPlayerEdit(false);
    }

    if(editedPlayerFirstName !== "") {
      dispatch(updatePlayerFirstName(paramId, playerId, editedPlayerFirstName));
    }

    if(editedPlayerLastName !== "") {
      dispatch(updatePlayerLastName(paramId, playerId, editedPlayerLastName));
    }

    if(editedPlayerSex !== "") {
      dispatch(updatePlayerSex(paramId, playerId, editedPlayerSex));
    }
    
    setEditedPlayerFirstName("");
    setEditedPlayerLastName("");
    setEditedPlayerSex("");
    setShowPlayerEdit(false);
  }

  const deletePlayerFromRoster = (player) => {
    //eslint-disable-next-line
    const isConfirmed = confirm('Are you sure you want to delete this player from the team?');
    if (isConfirmed) {
      const updatePlayerBatRotationPromise = new Promise ((res) => {
        res(dispatch(updatePlayerBattingRotation(paramId, player._id, null)))
      });
      
      updatePlayerBatRotationPromise.then(() => {
        let checkOwnIdInRotation = players.filter(plyr => {
          return plyr.battingRotateWith === player._id;
        })
  
        let checkOthersIdInRotation = (player.battingRotateWith && player.battingRotateWith !== "exclude");
  
        if (checkOwnIdInRotation[0]) {
          dispatch(updatePlayerBattingRotation(paramId, checkOwnIdInRotation[0]._id, null));
        }
  
        if (checkOthersIdInRotation) {
          dispatch(updatePlayerBattingRotation(paramId, player.battingRotateWith, null));
        }
      }).then(() => {
        dispatch(deletePlayer(paramId, player._id));
      })
    }
    setShowPlayerEdit(false);
  }

  const handlePlayerEditClose = () => setShowPlayerEdit(false);
  const handlePlayerEditShow = () => setShowPlayerEdit(true);
  
  const handleNewFirstNameInput = (e) => {
    setNewPlayerFirstName(e.target.value);
  }

  const handleNewLastNameInput = (e) => {
    setNewPlayerLastName(e.target.value)
  }

  const handleNewSexClick = (sex) => {
    setNewPlayerSex(sex);
  }

  const handleEditedFirstNameInput = (e) => {
    setEditedPlayerFirstName(e.target.value);
  }

  const handleEditedLastNameInput = (e) => {
    setEditedPlayerLastName(e.target.value)
  }

  const handleEditedSexClick = (sex) => {
    setEditedPlayerSex(sex);
  }

  const newPlayerModal = () => {
    return (
      <div className="new-player-modal-div">
        <Modal show={showNewPlayer} onHide={() => handleNewPlayerClose()}>
            <Modal.Header closeButton>
              <Modal.Title>Add Player To Roster</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <div className="new-player-modal-inputs">
                <input type="email" className="form-control" id="first-name-input" placeholder="First name" onChange={(e) => {handleNewFirstNameInput(e)}}/>
                <br/>
                <input type="email" className="form-control" id="last-name-input" placeholder="Last name" onChange={(e) => {handleNewLastNameInput(e)}}/>
                <br/>

                <div className="row">
                  <div className="col-1">
                    Sex:
                  </div>
                  <div className="col-5 vert-add-new-roster-sex-col">
                    <button className="btn btn-sm btn-outline-primary male-btn"onClick={()=>{handleNewSexClick('male')}}>Male</button>
                    <button className="btn btn-sm btn-outline-primary"onClick={()=>{handleNewSexClick('female')}}>Female</button>
                  </div>
                </div>
              </div>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => handleNewPlayerClose()}>
                Cancel
              </Button>
              <Button variant="primary" onClick={()=>{addNewPlayer()}}>
                Add Player
              </Button>
            </Modal.Footer>
          </Modal>
      </div>
    )
  }

  const editPlayerModal = () => {
    return (
      <div>
        <Modal show={showPlayerEdit} onHide={() => handlePlayerEditClose()} className="edit-player-modal">

          <Modal.Header closeButton>
            <Modal.Title>Edit Player</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          <div className="row">
            <div className="col-3">
              <h6>First Name</h6>
            </div> 
            <div className="col-9">   
            <input type="email" className="form-control" id="exampleFormControlInput1" defaultValue={activePlayer.firstName} onChange={(e) => {handleEditedFirstNameInput(e)}}/>
            </div> 
          </div>
          <br/>

          <div className="row">
            <div className="col-3">
              <h6>Last Name</h6>
            </div> 
            <div className="col-9">   
            <input type="email" className="form-control" id="exampleFormControlInput1" defaultValue={activePlayer.lastName} onChange={(e) => {handleEditedLastNameInput(e)}}/>
            </div> 
          </div>
          <br/>

          <div className="row">
            <div className="col-3">
              <h6>Listed Sex:</h6>
            </div> 
            <div className="col-9 sex-select-input">   
              <div className="vert-edit-roster-sex-col">
                <button className="btn btn-sm btn-outline-primary male-btn vert-male-btn" onClick={()=>{handleEditedSexClick('male')}}>Male</button>
                <button className="btn btn-sm btn-outline-primary" onClick={()=>{handleEditedSexClick('female')}}>Female</button>
              </div>
            </div> 
          </div>
          </Modal.Body>

          <Modal.Footer>
                <Button variant="danger" className="delete-player-button" onClick={() => deletePlayerFromRoster(activePlayer)}>
                  Delete Player</Button>

                <Button variant="secondary" onClick={() => handlePlayerEditClose()}>
                  Cancel</Button>

                <Button variant="primary" onClick={() => editPlayer(activePlayer._id)}>
                  Save</Button>
          </Modal.Footer>

        </Modal>
      </div>
    )
  }
  
  const handlePlayerStatusToggle = (player) => {

    dispatch(updatePlayerBattingRotation(paramId, player._id, null));

    let checkOwnIdInRotation = players.filter(plyr => {
      return plyr.battingRotateWith === player._id;
    })

    let checkOthersIdInRotation = (player.battingRotateWith && player.battingRotateWith !== "exclude");

    if (checkOwnIdInRotation[0]) {
      dispatch(updatePlayerBattingRotation(paramId, checkOwnIdInRotation[0]._id, null));
    }

    if (checkOthersIdInRotation) {
      dispatch(updatePlayerBattingRotation(paramId, player.battingRotateWith, null));
    }

    dispatch(updatePlayerAvailability(paramId, player._id));
    dispatch(updatePlayerBattingOrder(paramId, player._id, null));
  
    for (let i = 0; i < 7; i++) {
      dispatch(updatePlayerLineup(paramId, player._id, '-', i));
    }
  }

  const renderStatus = (player) => {
    if (!player.availability) {
      return (
      <p className="player-out-alert">OUT</p>
      )
    }
  }

  const renderPlayerAvailButtons = (player) => {
    if (showEditStatus) {
      return (
        <div>
          <FingerPrintOutline className="fingerprint-button" width="25px" height="25px" onClick={() => handlePlayerStatusToggle(player)}/>
        </div>
      )
    }
  }

  const nameSortHandler = () => {
    dispatch(fetchPlayers(paramId, 'name'));
    setSortBy("name");
  }

  const sexSortHandler = () => {
    dispatch(fetchPlayers(paramId, 'sex'));
    setSortBy("sex");
  }

  const availSortHandler = () => {
    dispatch(fetchPlayers(paramId, 'availability'));
    setSortBy("avail");
  }

  const handleTouchRow = (player) => {
    setActivePlayer(player);
    handlePlayerEditShow();
  }

  const renderRoster = () => {
   return (
    players && players.length > 0 && players.map((player) => {

      return (
        <div key={player._id}>
          <div className={`row player-row row-${player.sex}`}>
            <div className="col-10 vert-player-row"> 
              <div className="row touchable-row" onClick={()=>{handleTouchRow(player)}}>
                <div className="col-6 vert-player-name-roster-col">
                  <p className="player-name-on-roster"><strong>{`${player.firstName} ${player.lastName}`}</strong></p>
                </div>
                <div className="col-3 text-start">
                  <p>{player.sex}</p>
                </div>
                <div className="col-3 text-center">
                  <div className="col out-alert-col">
                    {renderStatus(player)}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-2 text-end">
              {renderPlayerAvailButtons(player)}
            </div>

          </div>
          {editPlayerModal()}
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

    if (team && players) {
      return(
        <div className="team-desc-section">
          <div className="col">
            <div className="row">
              <h4 className="vert-roster-team-name"><strong>{team.teamName}</strong></h4>
            </div>
            <div className="row">
              <div className="col-6 vert-ttl-player-col">
                  <p>{`Total: ${players.length} players (${filterFemalesFromTeam.length || 0}F, ${players.length - filterFemalesFromTeam.length || 0}M)`}</p>
              </div>
              <div className="col-6 roster-sorting-col">
                <p>Sort:<u className={`sort-title namesort-${sortBy}`} onClick={() => nameSortHandler()}>Name</u> <u className={`sort-title sexsort-${sortBy}`} onClick={() => sexSortHandler()}>Sex</u> <u className={`sort-title availsort-${sortBy}`} onClick={() => availSortHandler()}>Availability</u></p>
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
      <p>{filterFemalesFromAvailable.length || 0}F, {filterForAvailable.length - filterFemalesFromAvailable.length || 0}M</p>
    </div>
  )
}

const renderToggleButtonText = () => {
  return (showEditStatus ? 'Off' : 'Toggle Availability');
}
      
  return (
    <div className="container-md roster-container">
      <div className="row">
        <div className="col">
          <h2 className="roster-page-title text-center"><strong><u>ROSTER</u></strong></h2>
        </div>
      </div>

      <div className="row">
        <div className="col-10 vert-roster-first-col">
          {renderTeamDesc()}
          <div className="row">
            <div className="col roster-col">
              {renderRoster()}
            </div>
          </div>
        </div>
        <div className="col-2 roster-side-col">
          <div className="row vert-roster-side-col-row">
            {renderAvailableStats()}

            <button type="button" className="btn btn-sm add-new-player-btn" onClick={() => handleNewPlayerShow()}>Add New Player</button>

            {newPlayerModal()}

            <button type="button" className={`btn btn-sm edit-avail-btn toggle-edit-button-${showEditStatus}`} onClick={() => toggleShowEditStatus()}>{renderToggleButtonText()}</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Roster