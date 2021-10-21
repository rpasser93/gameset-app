import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchTeamById } from "../actions/actions"
import { updateTeamName, updatePlayerMinSettings, updateSexMinSettings, updateInfieldMinSettings, updateOutfieldMinSettings, updateBattingReqSettings, deleteTeam } from "../actions/actions"

const Settings = () => {
  const [teamNameEdit, setTeamNameEdit] = useState("");

  const [minPlayers, setMinPlayers] = useState(0);  

  const [minSpecificSex, setMinSpecificSex] = useState(true);
  const [minSexNumber, setMinSexNumber] = useState(0);

  const [minSexInfield, setMinSexInfield] = useState(true);
  const [minSexNumberInfield, setMinSexNumberInfield] = useState(0);

  const [minSexOutfield, setMinSexOutfield] = useState(true);
  const [minSexNumberOutfield, setMinSexNumberOutfield] = useState(0);

  const [minSexBatting, setMinSexBatting] = useState(true);
  const [minSexNumberBatting, setMinSexNumberBatting] = useState(0);

  const paramId = window.location.pathname.substr(window.location.pathname.length - 24);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchTeamById(paramId));
  }, [dispatch, paramId]);

  let team = useSelector(state => state.team[0]);
  
  let currentSex = ""
  let oppositeSex = ""

  let currentSexInfield = ""
  let oppositeSexInfield = ""

  let currentSexOutfield = ""
  let oppositeSexOutfield = ""

  let currentSexBatting = ""
  let oppositeSexBatting = ""

  if (team) {
    currentSex = team.settings[0].sexMin.sex;
    currentSexInfield = team.settings[0].infieldReq.sex;
    currentSexOutfield = team.settings[0].outfieldReq.sex;
    currentSexBatting = team.settings[0].battingReq.sex;
  }

  if (team) {
    if (currentSex === "male") {
      oppositeSex = "female"
    } else {
      oppositeSex = "male"
    }
  }

  if (team) {
    if (currentSexInfield === "male") {
      oppositeSexInfield = "female"
    } else {
      oppositeSexInfield = "male"
    }
  }

  if (team) {
    if (currentSexOutfield === "male") {
      oppositeSexOutfield = "female"
    } else {
      oppositeSexOutfield = "male"
    }
  }

  if (team) {
    if (currentSexBatting === "male") {
      oppositeSexBatting = "female"
    } else {
      oppositeSexBatting = "male"
    }
  }

  const handleTeamNameEditChange = (e) => {
    setTeamNameEdit(e.target.value);
  }

  const saveTeamNameEdit = () => {
    if (teamNameEdit === "") {
      return alert('Please enter a valid name.');
    }
    dispatch(updateTeamName(paramId, teamNameEdit));
  }

  const handleMinPlayerChange = (e) => {
    setMinPlayers(e.target.value)
  }

  const saveMinPlayers = () => {
    if (isNaN(minPlayers) || minPlayers < 0 ) {
      return alert('Please enter a valid number.');
    }
    dispatch(updatePlayerMinSettings(paramId, minPlayers))
  }

  const handleMinSexNumChange = (e) => {
    setMinSexNumber(e.target.value)
  }

  const changeMinSpecificSex = () => {
    setMinSpecificSex(!minSpecificSex)
  }

  const saveMinSexNumber = () => {
    if (isNaN(minSexNumber) || minSexNumber < 0 ) {
      return alert('Please enter a valid number.');
    }

    let sexToSend = "";
    if (minSpecificSex) {
      sexToSend = currentSex;
    } else {
      sexToSend = oppositeSex;
    }

    let numToSend = 0;
    if (minSexNumber === 0) {
      numToSend = team.settings[0].sexMin.min;
    } else {
      numToSend = minSexNumber;
    }

    dispatch(updateSexMinSettings(paramId, sexToSend, numToSend));
  }

  const handleMinSexNumChangeInfield = (e) => {
    setMinSexNumberInfield(e.target.value);
  }

  const changeMinSexInfield = () => {
    setMinSexInfield(!minSexInfield);
  }

  const saveMinSexNumberInfield = () => {
    if (isNaN(minSexNumberInfield) || minSexNumberInfield < 0 ) {
      return alert('Please enter a valid number.');
    }

    let sexToSend = "";
    if (minSexInfield) {
      sexToSend = currentSexInfield;
    } else {
      sexToSend = oppositeSexInfield;
    }

    let numToSend = 0;
    if (minSexNumberInfield === 0) {
      numToSend = team.settings[0].infieldReq.min;
    } else {
      numToSend = minSexNumberInfield;
    }

    dispatch(updateInfieldMinSettings(paramId, sexToSend, numToSend));
  }

  const handleMinSexNumChangeOutfield = (e) => {
    setMinSexNumberOutfield(e.target.value);
  }

  const changeMinSexOutfield = () => {
    setMinSexOutfield(!minSexOutfield);
  }

  const saveMinSexNumberOutfield = () => {
    if (isNaN(minSexNumberOutfield) || minSexNumberOutfield < 0 ) {
      return alert('Please enter a valid number.');
    }

    let sexToSend = "";
    if (minSexOutfield) {
      sexToSend = currentSexOutfield;
    } else {
      sexToSend = oppositeSexOutfield;
    }

    let numToSend = 0;
    if (minSexNumberOutfield === 0) {
      numToSend = team.settings[0].outfieldReq.min;
    } else {
      numToSend = minSexNumberOutfield;
    }

    dispatch(updateOutfieldMinSettings(paramId, sexToSend, numToSend));
  }

  const handleMinSexNumChangeBatting = (e) => {
    setMinSexNumberBatting(e.target.value);
  }

  const changeMinSexBatting = () => {
    setMinSexBatting(!minSexBatting);
  }

  const saveMinSexNumberBatting = () => {
    if (isNaN(minSexNumberBatting) || minSexNumberBatting < 0 ) {
      return alert('Please enter a valid number.');
    }

    let sexToSend = "";
    if (minSexBatting) {
      sexToSend = currentSexBatting;
    } else {
      sexToSend = oppositeSexBatting;
    }

    let numToSend = 0;
    if (minSexNumberBatting === 0) {
      numToSend = team.settings[0].battingReq.min;
    } else {
      numToSend = minSexNumberBatting;
    }

    dispatch(updateBattingReqSettings(paramId, sexToSend, numToSend));
  }

  const restoreDefaultSettings = () => {
    //eslint-disable-next-line
    const isConfirmed = confirm('Restore all requirement settings to default?');
    if (isConfirmed) {
      dispatch(updatePlayerMinSettings(paramId, 0));
      setMinPlayers(0);

      dispatch(updateSexMinSettings(paramId,'female', 0));
      setMinSpecificSex(true);
      setMinSexNumber(0);

      dispatch(updateInfieldMinSettings(paramId, 'female', 0));
      setMinSexInfield(true);
      setMinSexNumberInfield(0);

      dispatch(updateOutfieldMinSettings(paramId, 'female', 0));
      setMinSexOutfield(true);
      setMinSexNumberOutfield(0);

      dispatch(updateBattingReqSettings(paramId, 'female', 0));
      setMinSexBatting(true);
      setMinSexNumberBatting(0);
    }
  }

  const handleDeleteTeam = () => {
     //eslint-disable-next-line
     const isConfirmed1 = confirm('Permenantly delete your account and all team information?');
     if (isConfirmed1) {
       //eslint-disable-next-line
       const isConfirmed2 = confirm('This is irreversible. Are you sure you want to proceed?')
       if (isConfirmed2) { 
         dispatch(deleteTeam(paramId));
         history.push(`/login`);
       }
     }
  }

  if (team) {
    return (
      <div className="container-md settings-container">
        <div className="row">
          <div className="col">
            <h2 className="settings-page-title text-center"><strong><u>SETTINGS</u></strong></h2>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-8  settings-col">
            <div className="row">
              <div className="col text-center">

                <div className="row gen-settings-header">
                  <div className="col">
                  <h5><strong><em>General</em></strong></h5>
                  <p className="text-start">Edit team name:</p>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" defaultValue={`${team.teamName}`} onChange={(e)=>{handleTeamNameEditChange(e)}}/>
                    <button className="btn btn-outline-primary" type="button" onClick={()=>{saveTeamNameEdit()}}>Save</button>
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

                <div className="row requirements-row-second">
                  <div className="col">
                    <p className="text-start">Minimum of specific Sex needed:</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-1 text-center at-least">
                  <em>at least</em>
                  </div>
                  <div className="col-2 text-start">
                   <input className="form-control form-control-sm" type="text" defaultValue={`${team.settings[0].sexMin.min}`} onChange={(e)=>{handleMinSexNumChange(e)}}/>
                  </div>
                  <div className="col-2 current-sex-label text-end">
                    <p><strong><em>{currentSex}s</em></strong></p>
                  </div>
                  <div className="col-2">
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onClick={()=>{changeMinSpecificSex()}}/>
                      <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
                    </div>
                  </div>
                  <div className="col-2 opp-sex-label text-start">
                    <p><strong><em>{oppositeSex}s</em></strong></p>
                  </div>
                  <div className="col-3 text-end save-sexmin-btn">
                    <button type="button" className="btn btn-outline-primary" onClick={()=>{saveMinSexNumber()}}>Save</button>
                  </div>
                </div>

                <div className="row requirements-row">
                  <div className="col">
                    <p className="text-start">Sex minimum required <u>Infield</u>:</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-1 text-center at-least">
                  <em>at least</em>
                  </div>
                  <div className="col-2 text-start">
                   <input className="form-control form-control-sm" type="text" defaultValue={`${team.settings[0].infieldReq.min}`} onChange={(e)=>{handleMinSexNumChangeInfield(e)}}/>
                  </div>
                  <div className="col-2 current-sex-label text-end">
                    <p><strong><em>{currentSexInfield}s</em></strong></p>
                  </div>
                  <div className="col-2">
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onClick={()=>{changeMinSexInfield()}}/>
                      <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
                    </div>
                  </div>
                  <div className="col-2 opp-sex-label text-start">
                    <p><strong><em>{oppositeSexInfield}s</em></strong></p>
                  </div>
                  <div className="col-3 text-end save-sexmin-btn">
                    <button type="button" className="btn btn-outline-primary" onClick={()=>{saveMinSexNumberInfield()}}>Save</button>
                  </div>
                </div>

                <div className="row requirements-row">
                  <div className="col">
                    <p className="text-start">Sex minimum required <u>Outfield</u>:</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-1 text-center at-least">
                  <em>at least</em>
                  </div>
                  <div className="col-2 text-start">
                   <input className="form-control form-control-sm" type="text" defaultValue={`${team.settings[0].outfieldReq.min}`} onChange={(e)=>{handleMinSexNumChangeOutfield(e)}}/>
                  </div>
                  <div className="col-2 current-sex-label text-end">
                    <p><strong><em>{currentSexOutfield}s</em></strong></p>
                  </div>
                  <div className="col-2">
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onClick={()=>{changeMinSexOutfield()}}/>
                      <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
                    </div>
                  </div>
                  <div className="col-2 opp-sex-label text-start">
                    <p><strong><em>{oppositeSexOutfield}s</em></strong></p>
                  </div>
                  <div className="col-3 text-end save-sexmin-btn">
                    <button type="button" className="btn btn-outline-primary" onClick={()=>{saveMinSexNumberOutfield()}}>Save</button>
                  </div>
                </div>

                <div className="row requirements-row-last">
                  <div className="col">
                    <p className="text-start">Batting order Sex requirement:</p>
                  </div>
                </div>

                <div className="row dx-fluid align-items-center">
                  <div className="col-1 text-start at-least">
                  <em>at least one</em>
                  </div>
                  <div className="col-2 current-sex-label text-end">
                    <p><strong><em>{currentSexBatting}</em></strong></p>
                  </div>
                  <div className="col-2">
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onClick={()=>{changeMinSexBatting()}}/>
                      <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
                    </div>
                  </div>
                  <div className="col-2 opp-sex-label text-start">
                    <p><strong><em>{oppositeSexBatting}</em></strong></p>
                  </div>
                  <div className="col-2 text-center">
                    <em className="at-least">every</em>
                    <input className="form-control form-control-sm" type="text" defaultValue={`${team.settings[0].battingReq.min}`} onChange={(e)=>{handleMinSexNumChangeBatting(e)}}/>
                    <em className="at-least">batters</em>
                  </div>
                  <div className="col-3 text-end save-sexmin-btn">
                    <button type="button" className="btn btn-outline-primary" onClick={()=>{saveMinSexNumberBatting()}}>Save</button>
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
                  <button type="button" className="btn btn-danger delete-team-btn" onClick={()=> {handleDeleteTeam()}}>Delete Team</button>
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