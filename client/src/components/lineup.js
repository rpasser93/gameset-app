import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayers, fetchTeamById, updatePlayerLineup } from "../actions/actions"

const Lineup = () => {
  
  const dispatch = useDispatch();
  const paramId = window.location.pathname.substr(window.location.pathname.length - 24);

  let team = useSelector(state => state.team[0]);

  let players = useSelector(state => state.players[0]);

  if (players && players.length > 0) {
    players = players.filter(player => {
      return (player.availability)
    });
  };
  
  useEffect(() => {
    dispatch(fetchPlayers(paramId,""));
    dispatch(fetchTeamById(paramId));
  }, [dispatch, paramId]);

  const handlePositionSelect = (playerId, pos, num) => {
    console.log(`${playerId} change to ${pos} for inning ${num+1}`);
    dispatch(updatePlayerLineup(paramId, playerId, pos, num))
  }

  const renderPlayerLineupRows = () => {
    let positionArray = []

    if (team && team.length > 0 && team.settings && team.settings[0] && team.setttings[0].positions && team.settings[0].positions.length > 0) {
      positionArray = team.settings[0].positions;
      positionArray.push('-');
    } else {
      positionArray = ['-','P','C','1B','2B','3B','SS','LF','CF','RCF','RF'];
    }

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
        return (
          <tr key={player._id} className={`lineup-row-${player.sex}`}>
            <td className="player-row-header text-start">
              <div className="player-row-header-wrapper">
                {`${player.firstName} ${player.lastName.substr(0,1)}.`}
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

  const renderBattingOrder = () => {

    return (
    players && players.length >0 && players.map(player => {
      return (
        <div className={`batting-order-player batting-order-row-${player.sex}`} key={player._id}>
          {`${player.firstName} ${player.lastName.substr(0,1)}.`}
        </div>
      )
    }))};

  return (
    <div className="container-fluid lineup-container">
      <div className="row">
        <div className="col text-start">
          <button type="button" class="btn-sm field-view-btn">Field View</button>
        </div>
        <div className="col">
          <h2 className="lineup-page-title text-center"><strong><u>LINEUP</u></strong></h2>
        </div>
        <div className="col"></div>
      </div>

      <div className="row violation-alert-row">
        <div className="col text-center">**alerts here**</div>
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
        </div>

        <div className="col-3 text-start batting-order-col">
          <div className="batting-order-title"><strong>Batting Order:</strong></div>
          {renderBattingOrder()}
        </div>

      </div>
    </div>
  )
};

export default Lineup