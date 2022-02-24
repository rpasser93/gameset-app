import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Modal, Button } from "react-bootstrap";
import { fetchTeamById } from "../actions/actions";
import { CheckmarkCircle } from "react-ionicons"
import { updateTeamName, updateTeamPassword, updatePlayerMinSettings, updateSexMinSettings, updateInfieldMinSettings, updateOutfieldMinSettings, updateBattingReqSettings, deleteTeam } from "../actions/actions";

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

  const [saveTextTeamName, setSaveTextTeamName] = useState("Save");
  const [saveTextMinPlayers, setSaveTextMinPlayers] = useState("Save");
  const [saveTextMinSex, setSaveTextMinSex] = useState("Save");
  const [saveTextInfieldReq, setSaveTextInfieldReq] = useState("Save");
  const [saveTextOutfieldReq, setSaveTextOutfieldReq] = useState("Save");
  const [saveTextBattingReq, setSaveTextBattingReq] = useState("Save");

  const [show, setShow] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [currentPassError, setCurrentPassError] = useState(false);
  const [newPassError, setNewPassError] = useState(false);

  const paramId = window.location.pathname.substr(window.location.pathname.length - 24);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchTeamById(paramId));
    if (newPassword === confirmNewPassword && confirmNewPassword !== "") {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [dispatch, paramId, newPassword, confirmNewPassword]);

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

  const handleClose = () => {
    setShow(false);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");

    setCurrentPassError(false);
    setNewPassError(false);
  }

  const handleShow = () => setShow(true);

  const handleTeamNameEditChange = (e) => {
    setTeamNameEdit(e.target.value);
  }

  const saveTeamNameEdit = () => {
    if (teamNameEdit === "") {
      return alert('Please enter a valid name.');
    }
    dispatch(updateTeamName(paramId, teamNameEdit));
    setSaveTextTeamName("Saved!");
    setTimeout(()=>{setSaveTextTeamName("Save")}, 1000);
  }

  const handleMinPlayerChange = (e) => {
    setMinPlayers(e.target.value)
  }

  const saveMinPlayers = () => {
    if (isNaN(minPlayers) || minPlayers < 0 ) {
      return alert('Please enter a valid number.');
    }
    dispatch(updatePlayerMinSettings(paramId, minPlayers))
    setSaveTextMinPlayers("Saved!");
    setTimeout(()=>{setSaveTextMinPlayers("Save")}, 1000);
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
    setSaveTextMinSex("Saved!");
    setTimeout(()=>{setSaveTextMinSex("Save")}, 1000);
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
    setSaveTextInfieldReq("Saved!");
    setTimeout(()=>{setSaveTextInfieldReq("Save")}, 1000);
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
    setSaveTextOutfieldReq("Saved!");
    setTimeout(()=>{setSaveTextOutfieldReq("Save")}, 1000);
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
    setSaveTextBattingReq("Saved!");
    setTimeout(()=>{setSaveTextBattingReq("Save")}, 1000);
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

      setTimeout(()=>{window.location.reload()},50);
    }
  }

  const handleCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);

    setCurrentPassError(false);
    setNewPassError(false);
  }

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);

    setCurrentPassError(false);
    setNewPassError(false);

    if (newPassword === confirmNewPassword && newPassword !== "") {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }

  const handleConfirmNewPassword = (e) => {
    setConfirmNewPassword(e.target.value);

    setCurrentPassError(false);
    setNewPassError(false);
    
    if (newPassword === confirmNewPassword && confirmNewPassword !== "") {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }

  const handleDispatchPasswordChange = () => {
    if (currentPassword === "" || newPassword === "" || confirmNewPassword === "") {
      return alert('Please fill in all fields.');
    }

    else if (team && currentPassword !== team.password) {
      setCurrentPassError(true);
      setTimeout(() => {
        return alert('The entered value for "Current Password" is incorrect.');
      }, 100)
    }

    else if (newPassword !== confirmNewPassword) {
      setNewPassError(true);
      setTimeout(() => {
        return alert('The "New Password" fields do not match.');
      }, 100)
    }

    else if (team && (newPassword === team.password || confirmNewPassword === team.password)) {
      setNewPassError(true);
      setTimeout(() => {
        return alert('The entered value for "New Password" is currently in use.');
      }, 100)
    }

    else {
      //eslint-disable-next-line
      dispatch(updateTeamPassword(paramId, newPassword));
      alert('Password changed!');
      handleClose();
    }
  }
  

  const handleDeleteTeam = () => {
     //eslint-disable-next-line
     const isConfirmed1 = confirm('Permenantly delete your account and all team information?');
     if (isConfirmed1) {
       //eslint-disable-next-line
       const isConfirmed2 = prompt('Please note that deleting your account is irreversible.\nType "delete" to confirm.')
       if (isConfirmed2 && isConfirmed2.toLowerCase() === 'delete') { 
         dispatch(deleteTeam(paramId));
         alert('Account deleted.');
         history.push(`/login`);
       } else {
         alert('Cancelled account deletion.');
       }
     }
  }

  const renderPasswordMatchCheckmark = () => {
    if (passwordsMatch) {
      return (
        <div>
          <CheckmarkCircle className="password-match-checkmark" color={'#007800'} height='35px' width='35px' />
        </div>
      )
    }

    return (
      <div></div>
    )
  }

  const renderModalPassButton = () => {

    return (
      <div>
        <div>
          <button type="button" className="btn btn-secondary change-pass-btn" onClick={() =>{handleShow()}}>Change Password</button>   
        </div>

        <Modal show={show} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Change Your Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <div>
          <form>
            <input type="password" className={`form-control login-password-input login-password-input-current-${currentPassError}`} placeholder="Current Password" onChange={(e) => handleCurrentPassword(e)}/>

            <input type="password" className={`form-control login-password-input login-password-input-new-${newPassError}`} placeholder="New Password" onChange={(e) => handleNewPassword(e)}/>

            <input type="password" className={`form-control login-password-input login-password-input-new-${newPassError}`} placeholder="Confirm New Password" onChange={(e) => handleConfirmNewPassword(e)}/>
          </form>
        </div>

        </Modal.Body>
        <Modal.Footer>
          <div>
            {renderPasswordMatchCheckmark()}
          </div>
          <Button variant="secondary" onClick={() => handleClose()}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleDispatchPasswordChange()}>
            Change Password
          </Button>
        </Modal.Footer>
        </Modal>
      </div>
    )
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
                    <button className="btn btn-outline-primary" type="button" onClick={()=>{saveTeamNameEdit()}}>{saveTextTeamName}</button>
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
                      <button className="btn btn-outline-primary" type="button" onClick={()=>saveMinPlayers()}>{saveTextMinPlayers}</button>
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
                    <button type="button" className="btn btn-outline-primary" onClick={()=>{saveMinSexNumber()}}>{saveTextMinSex}</button>
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
                    <button type="button" className="btn btn-outline-primary" onClick={()=>{saveMinSexNumberInfield()}}>{saveTextInfieldReq}</button>
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
                    <button type="button" className="btn btn-outline-primary" onClick={()=>{saveMinSexNumberOutfield()}}>{saveTextOutfieldReq}</button>
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
                    <button type="button" className="btn btn-outline-primary" onClick={()=>{saveMinSexNumberBatting()}}>{saveTextBattingReq}</button>
                  </div>
                </div>
                
              <hr/>
              <div className="row">
                <div className="col">
                  <button type="button" className="btn btn-primary defaults-btn" onClick={()=>{restoreDefaultSettings()}}>Restore Defaults</button>                
                </div>
              </div>
              <br/>
              <div className="row">
                <div className="col">
                  {renderModalPassButton()}             
                </div>
              </div>
              <br/>
              <div className="row">
                <div className="col">
                  <button type="button" className="btn btn-danger delete-team-btn" onClick={()=> {handleDeleteTeam()}}>Delete Account</button>
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