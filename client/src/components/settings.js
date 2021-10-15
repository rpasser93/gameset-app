import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeamById } from "../actions/actions"

const Settings = () => {
  const [teamNameEdit, setTeamNameEdit] = useState("");
  const [minPlayers, setminPlayers] = useState(0);  
  const [minSexNumber, setMinSexNumber] = useState(0);

  const paramId = window.location.pathname.substr(window.location.pathname.length - 24);

  const dispatch = useDispatch();

  let team = useSelector(state => state.team[0]);

  useEffect(() => {
    dispatch(fetchTeamById(paramId));
  }, [dispatch, paramId]);

  const handleTeamNameEditChange = (e) => {
    setTeamNameEdit(e.target.value);
  }

  const saveTeamNameEdit = () => {
    //DISPATCH
  }

  const handleMinPlayerChange = (e) => {
    setminPlayers(e.target.value)
  }

  const saveMinPlayers = () => {
    if (isNaN(minPlayers)) {
      return alert('Please enter a valid number.');
    }
    //DISPATCH
  }

  const handleMinSexNumChange = (e) => {
    setMinSexNumber(e.target.value)
  }

  const saveMinSexNumber = () => {
    if (isNaN(minSexNumber)) {
      return alert('Please enter a valid number.');
    }
    //DISPATCH
  }

  const saveMinSpecificSex = () => {
    //DISPATCH
  }

  const restoreDefaultSettings = () => {
    //DISPATCH////////
  }

  if (team) {
    return (
      <div className="container-fluid settings-container">
        <div className="row">
          <div className="col">
            <h2 className="settings-page-title text-center"><strong><u>SETTINGS</u></strong></h2>
          </div>
        </div>

        <div className="row">
          <div className="col-8 offset-2 settings-col">
            <div className="row">
              <div className="col text-center">

                <div className="row gen-settings-header">
                  <div className="col">
                  <h5><strong><em>General</em></strong></h5>
                  <p className="text-start">Edit team name:</p>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" defaultValue={`${team.teamName}`} onChange={(e)=>{handleTeamNameEditChange(e)}}/>
                    <button className="btn btn-outline-success" type="button" onClick={()=>{saveTeamNameEdit()}}>Change</button>
                  </div>
                  </div>
                </div>
              
                <hr/>

                <div className="row req-settings-header">
                  <div className="col">
                    <h5><strong><em>Requirements</em></strong></h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p className="text-start">Minimum players needed:</p>
                  </div>
                  <div className="col">
                    <div className="input-group mb-3">
                      <input type="text" className="form-control" defaultValue={`${team.settings[0].minPlayers}`} onChange={(e)=>{handleMinPlayerChange(e)}} />
                      <button className="btn btn-outline-primary" type="button" onClick={()=>saveMinPlayers()}>Save</button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p className="text-start">Minimum of specific Sex:</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3 text-end">
                  <em>at least</em>
                  </div>
                  <div className="col-2 text-start">
                   <input className="form-control form-control-sm" type="text" defaultValue={`${team.settings[0].sexMin.min}`} onChange={(e)=>{handleMinSexNumChange(e)}}/>
                  </div>
                  <div className="col-2">
                    <p><strong><em>{team.settings[0].sexMin.sex}s</em></strong></p>
                  </div>
                  <div className="col-2">
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onClick={()=>{saveMinSpecificSex()}}/>
                      <label className="form-check-label" for="flexSwitchCheckDefault"></label>
                    </div>
                  </div>
                  <div className="col-3 text-end">
                    <button type="button" class="btn btn-outline-primary" onClick={()=>{saveMinSexNumber()}}>Save</button>
                  </div>
                </div>
               
              <hr/>
              <div className="row">
                <div className="col">
                  <button type="button" className="btn btn-secondary defaults-btn" onClick={()=>{restoreDefaultSettings()}}>Restore Defaults</button>                
                </div>
              </div>
              <br/>
              <div className="row">
                <div className="col">
                  <button type="button" className="btn btn-danger delete-team-btn">Delete Team</button>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
    }
    else {
      return (<div></div>)
    }
  };

export default Settings