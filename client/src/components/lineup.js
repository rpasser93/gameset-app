import { useEffect } from 'react';
import { useHistory } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayers, fetchTeamById, updatePlayerBattingOrder, updatePlayerLineup } from "../actions/actions"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Lineup = () => {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const paramId = window.location.pathname.substr(window.location.pathname.length - 24);

  let players = useSelector(state => state.players);
  let team = useSelector(state => state.team[0]);

  let currentPlayerMin = 0;
  let currentSexMin = {};

  if (team && team.settings[0]) {
    currentPlayerMin = team.settings[0].minPlayers;
    currentSexMin = team.settings[0].sexMin;
  }

  if (players && players.length > 0) {
    players = players.filter(player => {
      return (player.availability)
    });
  };

  const battingOrderList = players.map(player => {
    return {
      firstName: player.firstName,
      lastName: player.lastName,
      sex: player.sex,
      id: player._id,
      battingOrder: player.battingOrder
    }
  }).sort((a,b) => { if (a.battingOrder === null) {return 1};
  if (b.battingOrder === null) {return -1};
  if (a.battingOrder < b.battingOrder ) {return -1};
  if (a.battingOrder > b.battingOrder ) {return 1};
  return 0;});

  useEffect(() => {
    dispatch(fetchPlayers(paramId,""));
    dispatch(fetchTeamById(paramId));
  }, [dispatch, paramId]);

  const handlePositionSelect = (playerId, pos, num) => {
    dispatch(updatePlayerLineup(paramId, playerId, pos, num))
  }

  const handleFieldView = () => {
    history.push(`/lineup-field/${paramId}`);
  }

  const renderPlayerLineupRows = () => {
    let positionArray = ['-','P','C','1B','2B','3B','SS','LF','CF','RCF','RF'];

    const renderPositions = (playerId, num) => {
      return (
        positionArray.map(pos => {
          return (
            <div key={pos}>
              <button type="button" className="btn-sm btn-primary" onClick={()=>handlePositionSelect(playerId, pos, num)}>{pos}</button>
            </div>
          );
        })
      );
    }

    if (players && players.length > 0) {
    return (
      players.map(player => {
        let playername = ""
        if (players.filter(plyr => {
          return plyr.firstName === player.firstName;
        }).length > 1) {
          playername = `${player.firstName} ${player.lastName.substr(0,1)}.`
        } else {playername = player.firstName}

        return (
          <tr key={player._id} className={`lineup-row-${player.sex}`}>
            <td className="player-row-header text-start">
              <div className="player-row-header-wrapper">
                {playername}
              </div>
            </td>
            <td>
              <div className="btn-group dropend">
                <button type="button" className="btn-sm pos-dd-btn" data-bs-toggle="dropdown" aria-expanded="false">
                {player.lineup[0]}
                </button>
                <ul className="dropdown-menu pos-dd-ul text-center">
                  {renderPositions(player._id, 0)}
                </ul>
              </div>
            </td>
            <td>
              <div className="btn-group dropend">
                <button type="button" className="btn-sm pos-dd-btn" data-bs-toggle="dropdown" aria-expanded="false">
                {player.lineup[1]}
                </button>
                <ul className="dropdown-menu pos-dd-ul text-center">
                  {renderPositions(player._id, 1)}
                </ul>
              </div>
            </td>
            <td>
              <div className="btn-group dropend">
                <button type="button" className="btn-sm pos-dd-btn" data-bs-toggle="dropdown" aria-expanded="false">
                {player.lineup[2]}
                </button>
                <ul className="dropdown-menu pos-dd-ul text-center">
                  {renderPositions(player._id, 2)}
                </ul>
              </div>
            </td>
            <td>
              <div className="btn-group dropend">
                <button type="button" className="btn-sm pos-dd-btn" data-bs-toggle="dropdown" aria-expanded="false">
                {player.lineup[3]}
                </button>
                <ul className="dropdown-menu pos-dd-ul text-center">
                  {renderPositions(player._id, 3)}
                </ul>
              </div>
            </td>
            <td>
              <div className="btn-group dropend">
                <button type="button" className="btn-sm pos-dd-btn" data-bs-toggle="dropdown" aria-expanded="false">
                {player.lineup[4]}
                </button>
                <ul className="dropdown-menu pos-dd-ul text-center">
                  {renderPositions(player._id, 4)}
                </ul>
              </div>
            </td>
            <td>
              <div className="btn-group dropend">
                <button type="button" className="btn-sm pos-dd-btn" data-bs-toggle="dropdown" aria-expanded="false">
                {player.lineup[5]}
                </button>
                <ul className="dropdown-menu pos-dd-ul text-center">
                  {renderPositions(player._id, 5)}
                </ul>
              </div>
            </td>
            <td>
              <div className="btn-group dropend">
                <button type="button" className="btn-sm pos-dd-btn" data-bs-toggle="dropdown" aria-expanded="false">
                {player.lineup[6]}
                </button>
                <ul className="dropdown-menu pos-dd-ul text-center">
                  {renderPositions(player._id, 6)}
                </ul>
              </div>
            </td>
          </tr>
        )
      })
    )
    } else {
      return null;
    }
  };
  
  const renderAlerts = () => {

    if (players && players.length > 0 ) {

      let violations = [];

      let totalAvailable = players.filter(player => {
        return (player.availability);
      });
      let totalAvailableNumber = totalAvailable.length;
      let femalesAvailable = totalAvailable.filter(player => {
        return (player.sex === "female");
      });
  
      let femalesAvailableNumber = femalesAvailable.length;
      let malesAvailableNumber = totalAvailableNumber - femalesAvailableNumber;
    
      if (totalAvailableNumber < currentPlayerMin) {
        violations.push(`Your number of total available players (${totalAvailableNumber}) is below the minimum requirement (${currentPlayerMin}).`)
      }

      if (currentSexMin.sex === "female" && femalesAvailableNumber < currentSexMin.min) {
        violations.push(`Your number of available females (${femalesAvailableNumber}) is below the minimum requirement (${currentSexMin.min}).`)
      }

      if (currentSexMin.sex === "male" && malesAvailableNumber < currentSexMin.min) {
        violations.push(`Your number of available males (${malesAvailableNumber}) is below the minimum requirement (${currentSexMin.min}).`)
      }

      if (violations.length === 0) {
        return (<div></div>)
      }

      const renderViolationAlertDetails = () => {
        return (
          violations.map(violation => {
            return (
              <li key={violations.indexOf(violation)} className="dropdown-item violation-dropdown">{violation}</li>
            )
          })
        )
      }

      return (
        <div className="btn-group">
          <button type="button" className="btn-sm btn-danger dropdown-toggle violation-dropdown-button" data-bs-toggle="dropdown" aria-expanded="false">
            {violations.length}
          </button>
          <ul className="dropdown-menu">
            {renderViolationAlertDetails()}
          </ul>
        </div>
      )

    } return (<div></div>)   
  }

  const renderBattingOrder = () => {

    return (
      battingOrderList.map((player,index) => {

        let playername = ""
        if (battingOrderList.filter(plyr => {
          return plyr.firstName === player.firstName;
        }).length > 1) {
          playername = `${player.firstName} ${player.lastName.substr(0,1)}.`
        } else {playername = player.firstName}

        return (
          <div className="row" key={player._id}>
            <div className="col-1">
              <strong>{battingOrderList.indexOf(player)+1}.</strong>
            </div>
            <div className="col">

              <Draggable draggableId={player.id} key={player.id} index={index}>
        
                {(provided, snapshot) => {
                  return (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <div>

                          <div className={`col batting-order-player batting-order-row-${player.sex}`} key={player._id}>
                            <div className="batting-order-player-name">{playername}</div>
                          </div>
                        
                      </div>
                    </div>
                  )
                }}

              </Draggable>
            </div>
        </div>
        )
      })
    )
  }

  const onStart = () => {
    battingOrderList.map(player => {
      return dispatch(updatePlayerBattingOrder(paramId, player.id, battingOrderList.indexOf(player)));
    })
  }

  const onEnd = (result) => {
    if (!result.destination) { return }
    battingOrderList.map(player => {
      if (player.id === result.draggableId) {
        return (
          dispatch(updatePlayerBattingOrder(paramId, player.id, result.destination.index))
        )
      }
      if (battingOrderList.indexOf(player) >= result.destination.index && battingOrderList.indexOf(player) < result.source.index) {
        return (
          dispatch(updatePlayerBattingOrder(paramId, player.id, battingOrderList.indexOf(player)+1))
        )
      }
      if (battingOrderList.indexOf(player) <= result.destination.index && battingOrderList.indexOf(player) > result.source.index) {
        return (
          dispatch(updatePlayerBattingOrder(paramId, player.id, battingOrderList.indexOf(player)-1))
        )
      }
      return(null);
    })
  }

  return (
    <DragDropContext onDragStart={onStart} onDragEnd={onEnd}>
      <div className="container-md lineup-container">
        <div className="row">
          <div className="col text-start">
            <button type="button" className="btn-sm field-view-btn" onClick={() => {handleFieldView()}}>Field View</button>
          </div>
          <div className="col">
            <h2 className="lineup-page-title text-center"><strong><u>LINEUP</u></strong></h2>
          </div>
          <div className="col"></div>
        </div>

        <div className="row violation-alert-row">
          <div className="col text-center">{renderAlerts()}</div>
        </div>

        <div className="row">
          <div className="col-9">
            <table className="text-center">
              <tbody>
                <tr className="inning-row">
                  <td className="empty-cell"></td>
                  <td><strong>1st</strong></td>
                  <td><strong>2nd</strong></td>
                  <td><strong>3rd</strong></td>
                  <td><strong>4th</strong></td>
                  <td><strong>5th</strong></td>
                  <td><strong>6th</strong></td>
                  <td><strong>7th</strong></td>
                </tr>

                {renderPlayerLineupRows()}

              </tbody>
            </table>
            <br></br>
          </div>

          <div className="col-3 text-start batting-order-col">
            <div className="batting-order-title text-center"><strong>Batting Order:</strong></div>

            <Droppable droppableId="droppable01">
              {(provided, snapshot) => (
                <div ref={provided.innerRef}>

                  {renderBattingOrder()}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            
          </div>

        </div>
      </div>
    </DragDropContext>
  )
};

export default Lineup