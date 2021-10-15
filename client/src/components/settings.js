import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeamById } from "../actions/actions"

const Settings = () => {

  const paramId = window.location.pathname.substr(window.location.pathname.length - 24);

  const dispatch = useDispatch();

  let team = useSelector(state => state.team[0]);

  useEffect(() => {
    dispatch(fetchTeamById(paramId));
  }, [dispatch, paramId]);

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
                    <input type="text" className="form-control" placeholder={`${team.teamName}`} />
                    <button className="btn btn-outline-success" type="button">Change</button>
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
                      <input type="text" className="form-control" placeholder={`${team.settings[0].minPlayers}`} />
                      <button className="btn btn-outline-primary" type="button">Save</button>
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
                   <input className="form-control form-control-sm" type="text" defaultValue={`${team.settings[0].sexMin.min}`}/>
                  </div>
                  <div className="col-2">
                    <p><strong><em>{team.settings[0].sexMin.sex}s</em></strong></p>
                  </div>
                  <div className="col-2">
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onClick={()=>{console.log('click!')}}/>
                      <label className="form-check-label" for="flexSwitchCheckDefault"></label>
                    </div>
                  </div>
                  <div className="col-3 text-end">
                    <button type="button" class="btn btn-outline-primary">Save</button>
                  </div>
                </div>
               
              <hr/>
              <div className="row">
                <div className="col">
                  <button type="button" className="btn btn-secondary defaults-btn">Restore Defaults</button>                
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