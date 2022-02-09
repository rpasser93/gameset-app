import { useEffect, useState } from 'react';
import { useHistory } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayers, fetchTeamById, updatePlayerBattingOrder, updatePlayerBattingRotation, updatePlayerLineup } from "../actions/actions"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import printJS from 'print-js';
import { Print, Backspace } from 'react-ionicons'

const Lineup = () => {
  const [printToggle, setPrintToggle] = useState("off");
  const [spinToggle, setSpinToggle] = useState("off");
  const [rotateBattingToggle, setRotateBattingToggle] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();
  const paramId = window.location.pathname.substr(window.location.pathname.length - 24);

  let players = useSelector(state => state.players);
  let team = useSelector(state => state.team[0]);

  let battingPlayers = [];

  let currentPlayerMin = 0;
  let currentSexMin = {};
  let currentInfieldReq = {};
  let currentOutfieldReq = {};
  let currentBattingReq = {};

  if (team && team.settings[0]) {
    currentPlayerMin = team.settings[0].minPlayers;
    currentSexMin = team.settings[0].sexMin;
    currentInfieldReq = team.settings[0].infieldReq;
    currentOutfieldReq = team.settings[0].outfieldReq;
    currentBattingReq = team.settings[0].battingReq;
  }

  if (players && players.length > 0) {
    players = players.filter(player => {
      return (player.availability)
    });
    battingPlayers = players.filter(player => {
      return (player.availability && (player.battingRotateWith !== "exclude"))
    })
  };

  const battingOrderList = battingPlayers.map(player => {
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
    players.forEach(plyr => {
      if (plyr.lineup[num] === pos && pos !== '-') {
        dispatch(updatePlayerLineup(paramId, plyr._id, '-', num));
      }
    })

    dispatch(updatePlayerLineup(paramId, playerId, pos, num));
  }

  const handlePasteAllInnings = (playerId, inning) => {    
    let currentPlayer = players.filter( plyr => {
      return plyr._id === playerId
    })

    let pos = currentPlayer[0].lineup[inning];

    for (let num=0; num<7; num++) {
      players.forEach(plyr => {
        if (plyr.lineup[num] === (pos) && plyr._id !== playerId && pos !== '-') {
          dispatch(updatePlayerLineup(paramId, plyr._id, '-', num))
        }
      })

      dispatch(updatePlayerLineup(paramId, playerId, pos, num))
    }
  }

  const handleRotateBattingClick = (playerId, playername) => {

    if (!rotateBattingToggle) {
      setRotateBattingToggle(playerId);
      document.getElementById(`${playerId}`).style.border="ridge cyan";

    } else {

      const revertBattingOrderStyling = () => {
        const batterCollection = document.getElementsByClassName(`batting-order-player`);
          for (let i = 0; i < batterCollection.length; i++) {
            batterCollection[i].style.border="thin solid black";
          }
        }

      const battingRotatePrompt = (rotatedPlayer) => {
        //eslint-disable-next-line
        const isConfirmed = confirm(`Rotate ${playername} and ${rotatedPlayer.firstName} within a single batting order slot?`);

        if (isConfirmed) {
          dispatch(updatePlayerBattingRotation(paramId, playerId, rotateBattingToggle));
          dispatch(updatePlayerBattingRotation(paramId, rotateBattingToggle, 'exclude'));

          //add CSS to rotate player


          revertBattingOrderStyling();
        } else {
          revertBattingOrderStyling();
          }
        }

      if (rotateBattingToggle !== playerId) {
        document.getElementById(`${playerId}`).style.border="ridge cyan";

        setTimeout(() => {
          let rotatedPlayer = players.filter(plyr => {
            return plyr._id === rotateBattingToggle;
          })

          let playersCurrentlyRotating = players.filter(plyr => {
            return (plyr.battingRotateWith)
          })

          let idsOfPlayersCurrentlyRotating = playersCurrentlyRotating.map(plyr => {
            return plyr._id;
          })

          console.log(idsOfPlayersCurrentlyRotating);
          console.log(playerId);
          console.log(rotateBattingToggle);

          if (idsOfPlayersCurrentlyRotating.includes(playerId) || idsOfPlayersCurrentlyRotating.includes(rotateBattingToggle)) {
            alert("Players are already rotating within this batting order slot.")
            revertBattingOrderStyling();
          } else {
            battingRotatePrompt(rotatedPlayer[0]);
          }
      
        }, 1)
      } else {

        let currentPlayer = players.filter(plyr => {
          return plyr._id === playerId;
        })

        if (currentPlayer[0].battingRotateWith) {
        //eslint-disable-next-line
          const isConfirmed = confirm(`Stop rotating players within this batting order slot?`);

          if (isConfirmed) {
            let rotatedPlayer = players.filter(plyr => {
              return plyr._id === rotateBattingToggle;
            })

            let otherPlayersId = rotatedPlayer[0].battingRotateWith;

            dispatch(updatePlayerBattingRotation(paramId, playerId, null));
            dispatch(updatePlayerBattingRotation(paramId, otherPlayersId, null));
            dispatch(updatePlayerBattingOrder(paramId, otherPlayersId, null));
          }
        }
        revertBattingOrderStyling();
      }

      setRotateBattingToggle(null);
    }
  }

  const handleFieldView = () => {
    history.push(`/lineup-field/${paramId}`);
  }

  const renderPlayerLineupRows = () => {
    let positionArray = ['-','P','C','1B','2B','3B','SS','LF','CF','RCF','RF', '>>'];

    const renderPositions = (playerId, num) => {

      const assignedPositions = players.map(plyr=> {
        return plyr.lineup[num];
      })

      return (
        positionArray.map(pos => {

          if(pos === '>>') {
            return (
              <div key={pos}>
                <button type="button" className="btn-sm btn-warning btn-paste-all-innings position-selection" onClick={()=>handlePasteAllInnings(playerId, num)}>{pos}</button>
              </div>
            )
          }

          if(pos === '-') {
            return (
            <div key={pos}>
              <button type="button" className="btn-sm btn-danger position-selection" onClick={()=>handlePositionSelect(playerId, pos, num)}>{pos}</button>
            </div>
            )
          }

          if(assignedPositions.includes(pos) && pos !== '-' && pos !== '>>') {
            return (
              <div key={pos}>
                <button type="button" className="btn-sm btn-chosen-pos position-selection" onClick={()=>handlePositionSelect(playerId, pos, num)}>{pos}</button>
              </div>
            )
          }

          return (
            <div key={pos}>
              <button type="button" className="btn-sm btn-primary position-selection" onClick={()=>handlePositionSelect(playerId, pos, num)}>{pos}</button>
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
          <tr key={player._id} className={`print-toggle-${printToggle} lineup-row-${player.sex}`}>
            <td className="player-row-header text-start">
              <div className="player-row-header-wrapper">
                {playername}
              </div>
            </td>
            <td>
              <div className="btn-group dropend">
                <button type="button" className={`btn-sm print-toggle-${printToggle} pos-dd-btn`} data-bs-toggle="dropdown" aria-expanded="false">
                {player.lineup[0]}
                </button>
                <ul className="dropdown-menu pos-dd-ul text-center">
                  {renderPositions(player._id, 0)}
                </ul>
              </div>
            </td>
            <td>
              <div className="btn-group dropend">
              <button type="button" className={`btn-sm print-toggle-${printToggle} pos-dd-btn`} data-bs-toggle="dropdown" aria-expanded="false">
                {player.lineup[1]}
                </button>
                <ul className="dropdown-menu pos-dd-ul text-center">
                  {renderPositions(player._id, 1)}
                </ul>
              </div>
            </td>
            <td>
              <div className="btn-group dropend">
              <button type="button" className={`btn-sm print-toggle-${printToggle} pos-dd-btn`} data-bs-toggle="dropdown" aria-expanded="false">
                {player.lineup[2]}
                </button>
                <ul className="dropdown-menu pos-dd-ul text-center">
                  {renderPositions(player._id, 2)}
                </ul>
              </div>
            </td>
            <td>
              <div className="btn-group dropend">
              <button type="button" className={`btn-sm print-toggle-${printToggle} pos-dd-btn`} data-bs-toggle="dropdown" aria-expanded="false">
                {player.lineup[3]}
                </button>
                <ul className="dropdown-menu pos-dd-ul text-center">
                  {renderPositions(player._id, 3)}
                </ul>
              </div>
            </td>
            <td>
              <div className="btn-group dropend">
              <button type="button" className={`btn-sm print-toggle-${printToggle} pos-dd-btn`} data-bs-toggle="dropdown" aria-expanded="false">
                {player.lineup[4]}
                </button>
                <ul className="dropdown-menu pos-dd-ul text-center">
                  {renderPositions(player._id, 4)}
                </ul>
              </div>
            </td>
            <td>
              <div className="btn-group dropend">
              <button type="button" className={`btn-sm print-toggle-${printToggle} pos-dd-btn`} data-bs-toggle="dropdown" aria-expanded="false">
                {player.lineup[5]}
                </button>
                <ul className="dropdown-menu pos-dd-ul text-center">
                  {renderPositions(player._id, 5)}
                </ul>
              </div>
            </td>
            <td>
              <div className="btn-group dropend">
              <button type="button" className={`btn-sm print-toggle-${printToggle} pos-dd-btn`} data-bs-toggle="dropdown" aria-expanded="false">
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

      let femalesInfieldTotals = [0,0,0,0,0,0,0];
      let femalesOutfieldTotals = [0,0,0,0,0,0,0];
      let malesInfieldTotals = [0,0,0,0,0,0,0];
      let malesOutfieldTotals = [0,0,0,0,0,0,0];

      let totalAvailable = players.filter(player => {
        return (player.availability);
      });
      let totalAvailableNumber = totalAvailable.length;

      let femalesAvailable = totalAvailable.filter(player => {
        return (player.sex === "female");
      });
      let femalesAvailableNumber = femalesAvailable.length;

      let malesAvailable = totalAvailable.filter(player => {
        return (player.sex === "male");
      });
      let malesAvailableNumber = malesAvailable.length;

      let femalesInfieldArray = femalesAvailable.map(female => {
        return (
          [
            female.lineup[0],
            female.lineup[1],
            female.lineup[2],
            female.lineup[3],
            female.lineup[4],
            female.lineup[5],
            female.lineup[6]
          ]
        )
      })

      femalesInfieldArray.forEach(arrayOuter => {
        arrayOuter.forEach((arrayInner, index) => {
          if (arrayInner === "P" || arrayInner === "C" || arrayInner === "1B" || arrayInner === "2B" || arrayInner === "3B" || arrayInner === "SS") {
            femalesInfieldTotals[index]++;
          }
        })
      })

      let femalesOutfieldArray = femalesAvailable.map(female => {
        return (
          [
            female.lineup[0],
            female.lineup[1],
            female.lineup[2],
            female.lineup[3],
            female.lineup[4],
            female.lineup[5],
            female.lineup[6]
          ]
        )
      })

      femalesOutfieldArray.forEach(arrayOuter => {
        arrayOuter.forEach((arrayInner, index) => {
          if (arrayInner === "LF" || arrayInner === "CF" || arrayInner === "RCF" || arrayInner === "RF") {
            femalesOutfieldTotals[index]++;
          }
        })
      })

      let malesInfieldArray = malesAvailable.map(male => {
        return (
          [
            male.lineup[0],
            male.lineup[1],
            male.lineup[2],
            male.lineup[3],
            male.lineup[4],
            male.lineup[5],
            male.lineup[6]
          ]
        )
      })

      malesInfieldArray.forEach(arrayOuter => {
        arrayOuter.forEach((arrayInner, index) => {
          if (arrayInner === "P" || arrayInner === "C" || arrayInner === "1B" || arrayInner === "2B" || arrayInner === "3B" || arrayInner === "SS") {
            malesInfieldTotals[index]++;
          }
        })
      })

      let malesOutfieldArray = malesAvailable.map(male => {
        return (
          [
            male.lineup[0],
            male.lineup[1],
            male.lineup[2],
            male.lineup[3],
            male.lineup[4],
            male.lineup[5],
            male.lineup[6]
          ]
        )
      })

      malesOutfieldArray.forEach(arrayOuter => {
        arrayOuter.forEach((arrayInner, index) => {
          if (arrayInner === "LF" || arrayInner === "CF" || arrayInner === "RCF" || arrayInner === "RF") {
            malesOutfieldTotals[index]++;
          }
        })
      })

      const battingOrderBySex = battingOrderList.map(plyr => {
        return plyr.sex[0];
      })

      const frontSliceOfBattingOrderBySex = battingOrderBySex.slice(0,currentBattingReq.min-1);

      const combinedBattingOrderBySex = [...battingOrderBySex, ...frontSliceOfBattingOrderBySex];

      let testPortion = [];

      for (let i = 0; i < currentBattingReq.min; i++) {
        if (currentBattingReq.sex === 'female') {
          testPortion.push('m')
        } else { testPortion.push('f') }
      }

      //ALERTS
    
      if (totalAvailableNumber < currentPlayerMin) {
        violations.push(`Total available players (${totalAvailableNumber}) below the minimum required (${currentPlayerMin}).`)
      }

      if (currentSexMin.sex === "female" && femalesAvailableNumber < currentSexMin.min) {
        violations.push(`Available females (${femalesAvailableNumber}) below the minimum required (${currentSexMin.min}).`)
      }

      if (currentSexMin.sex === "male" && malesAvailableNumber < currentSexMin.min) {
        violations.push(`Available males (${malesAvailableNumber}) below the minimum required (${currentSexMin.min}).`)
      }

      if (currentInfieldReq.sex === "female") {
        let violatedInnings = [];
        femalesInfieldTotals.forEach((quantity, index) => {
          if (quantity < currentInfieldReq.min) {
            violatedInnings.push(` ${index+1}`);
          }
        });
        if (violatedInnings.length > 0) {violations.push(`Not enough females infield (min: ${currentInfieldReq.min}) for innings: [${violatedInnings} ].`)}
      }

      if (currentOutfieldReq.sex === "female") {
        let violatedInnings = [];
        femalesOutfieldTotals.forEach((quantity, index) => {
          if (quantity < currentOutfieldReq.min) {
            violatedInnings.push(` ${index+1}`);
          }
        });
        if (violatedInnings.length > 0) {violations.push(`Not enough females outfield (min: ${currentOutfieldReq.min}) for innings: [${violatedInnings} ].`)}
      }

      if (currentInfieldReq.sex === "male") {
        let violatedInnings = [];
        malesInfieldTotals.forEach((quantity, index) => {
          if (quantity < currentInfieldReq.min) {
            violatedInnings.push(` ${index+1}`);
          }
        });
        if (violatedInnings.length > 0) {violations.push(`Not enough males infield (min: ${currentInfieldReq.min}) for innings: [${violatedInnings} ].`)}
      }

      if (currentOutfieldReq.sex === "male") {
        let violatedInnings = [];
        malesOutfieldTotals.forEach((quantity, index) => {
          if (quantity < currentOutfieldReq.min) {
            violatedInnings.push(` ${index+1}`);
          }
        });
        if (violatedInnings.length > 0) {violations.push(`Not enough males outfield (min: ${currentOutfieldReq.min}) for innings: [${violatedInnings} ].`)}
      }

      if (currentBattingReq.min > 0) {
        if (combinedBattingOrderBySex.toString().includes(testPortion.toString())) {
          violations.push(`Need at least 1 ${currentBattingReq.sex} every ${currentBattingReq.min} batters.`)
        }
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

                          <div className={`col print-toggle-${printToggle} batting-order-player batting-order-row-${player.sex}`} key={player.id} id={player.id} onClick={() => {handleRotateBattingClick(player.id, playername)}}>
                            <div className="batting-order-player-name">{playername}<span className={`rotate-on-${player.id}`}></span></div>
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

  const renderSpinningWheel = () => {
    if (spinToggle === "on") {
      return (
        <div>
          <div className="spinner-border spinner-border-sm print-loading-icon" role="status"></div>
        </div>
      )
    }
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

  const printForm = () => {

    setSpinToggle("on");

    setTimeout(() => {
      printJS(
        {
          printable: 'print-this',
          type: 'html',
          targetStyles: ['*'],
          ignoreElements: ['ignore'],
          onLoadingStart: setPrintToggle("on")
        }) 
    },1)

    setTimeout(()=>{setPrintToggle("off"); setSpinToggle("off")},1000);
  }

  const clearLineup = () => {
    //eslint-disable-next-line
    const isConfirmed = confirm('Clear positions across all innings?');
    if (isConfirmed) {
      players.forEach(plyr => {
        for (let i = 0; i < 7; i++) {
          if(plyr.lineup[i] !== '-') {
            dispatch(updatePlayerLineup(paramId,plyr._id,'-',i));
          }
        }
      })
    }
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

          <div className="col print-col text-end">

            <div className="row">
             <div className="col-9">{renderSpinningWheel()}</div>

             <div className="col-3">
               <Print className="print-button" height="30px" width="30px" onClick={()=>{printForm()}} />
              </div>
            </div>

          </div>
        </div>

        <div className="row violation-alert-row">
          <div className="col text-center">{renderAlerts()}</div>
        </div>

        <div className="row" id="print-this">
          <div className="col-9">
            <table className="text-center">
              <tbody>
                <tr className="inning-row">
                  <td className={`empty-cell print-toggle-${printToggle}`}>
                    <div id="ignore">
                      <Backspace className="clear-lineup-button" onClick={()=>{clearLineup()}}/>
                    </div>
                  </td>
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