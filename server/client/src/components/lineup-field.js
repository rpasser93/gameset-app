import bballdiamond from '../constants/bballdiamond.jpg';
import { useHistory } from "react-router";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayers } from "../actions/actions";
import { ChevronBack, ChevronForward } from 'react-ionicons';

const LineupField = () => {
  const [inning, setInning] = useState("1");

  const dispatch = useDispatch();
  const history = useHistory();
  const paramId = window.location.pathname.substr(window.location.pathname.length - 24);

  const handleTableView = () => {
    history.push(`/lineup/${paramId}`);
  }

  const handleInningLeftButton = () => {
    if (inning !==1) {
      setInning(inning - 1);
    }
  }

  const handleInningRightButton = () => {
    if (inning === 1 || inning === "1") {
      setInning(2);
    }
    else if (inning !==7) {
      setInning(inning + 1);
    }
  }

  useEffect(() => {
    dispatch(fetchPlayers(paramId,""));
  }, [dispatch, paramId]);

  let players = useSelector(state => state.players);

  if (players && players.length > 0) {
    players = players.filter(player => {
      return (player.availability)
    });
  };

  let fieldPlayers = players.filter(player => {
    return (player.lineup[inning-1] !== "-");
  });

  let benchPlayers = players.filter(player => {
    return (player.lineup[inning-1] === "-");
  });

  const renderInningDisplay = () => {
    if (inning === 1 || inning === "1") {
      return (<h1>1st</h1>)
    }
    if (inning === 2) {
      return (<h1>2nd</h1>)
    }
    if (inning === 3) {
      return (<h1>3rd</h1>)
    }
    return (<h1>{inning}th</h1>)
  }

  const renderInningLeftButton = () => {
    if (inning !== 1 && inning !== "1") {
      return (
        <div>
          <ChevronBack className="inning-left-button" height='50px' width='50px' onClick={() => handleInningLeftButton()} />
        </div>
      )
    }
  }

  const renderInningRightButton = () => {
    if (inning !== 7) {
      return (
        <div>
          <ChevronForward className="inning-right-button" height='50px' width='50px' onClick={() => handleInningRightButton()} />
        </div>
      )
    }
  }

  return (
    <div className="container-md lineup-field-container">
      <div className="row">
        <div className="col text-start">
          <button type="button" className="btn-sm table-view-btn" onClick={() => {handleTableView()}}>Table View</button>
        </div>
        <div className="col">
          <h2 className="lineup-field-page-title text-center"><strong><u>LINEUP</u></strong></h2>
        </div>
        <div className="col"></div>
      </div>

      <div className="row text-center">
        <div className="col"></div>
        <div className="col d-flex justify-content-center">

          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item"><div className="page-link" onClick={()=>{setInning(1)}}>1st</div></li>
              <li className="page-item"><div className="page-link" onClick={()=>{setInning(2)}}>2nd</div></li>
              <li className="page-item"><div className="page-link" onClick={()=>{setInning(3)}}>3rd</div></li>
              <li className="page-item"><div className="page-link" onClick={()=>{setInning(4)}}>4th</div></li>
              <li className="page-item"><div className="page-link" onClick={()=>{setInning(5)}}>5th</div></li>
              <li className="page-item"><div className="page-link" onClick={()=>{setInning(6)}}>6th</div></li>
              <li className="page-item"><div className="page-link" onClick={()=>{setInning(7)}}>7th</div></li>
            </ul>
          </nav>

        </div>
        <div className="col"></div>
      </div>

      <div className="row">
        <div className="col-2 inning-display-column">
          <div className="row pos-filled-row">
            <div className="col pos-filled-col">
              <p className="pos-filled-num text-center"><strong><span className={`pos-num-color pos-num-color-${fieldPlayers.length}`}>{fieldPlayers.length}</span>/10</strong></p>
              <p className="pos-filled-text text-center">Pos. filled</p>
            </div>
          </div>

          <div className="row">
            <div className="big-inning-display">{renderInningDisplay()}</div>
            <p className="inning-subtitle">inning</p>
          </div>
        </div>

        <div className="col-1 switch-inning-left-col">
          <div>{renderInningLeftButton()}</div>
        </div>

        <div className="col-6 d-flex justify-content-center relative-pos-col">
          <ul>
          {fieldPlayers.map(player => {

          let playername = ""
          if (players.filter(plyr => {
            return plyr.firstName === player.firstName;
          }).length > 1) {
            playername = `${player.firstName} ${player.lastName.substr(0,1)}.`
          } else {playername = player.firstName}

            return (
              <div key={player._id} className={`col field-player-col playing-at-${player.lineup[inning-1]}`}>
                <div className="row text-center">
                  <strong>{player.lineup[inning-1]}</strong>
                </div>
                <div className={`row field-player field-player-${player.sex} text-center`}>
                  {playername}
                </div>
              </div>
            )
          })}
          </ul>
          <img src={bballdiamond} className="field-img" alt="diamond"></img>
        </div>

        <div className="col-1 switch-inning-right-col">
          <div>{renderInningRightButton()}</div>
        </div>
        
        <div className="col-2 bench-display-column">
          <div className="col on-bench-col">
            <h6 className="text-center"><u>Bench</u></h6>
            {benchPlayers.map(player => {

            let playername = ""
            if (players.filter(plyr => {
              return plyr.firstName === player.firstName;
            }).length > 1) {
              playername = `${player.firstName} ${player.lastName.substr(0,1)}.`
            } else {playername = player.firstName}

              return (
                <div key={player._id} className="on-bench-row">{playername}</div>
              )
            })}
          </div>
        </div>
      </div>

    </div>
  )
}

export default LineupField