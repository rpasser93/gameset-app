import { useHistory } from "react-router";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams, addTeam, fetchTeamByLogin } from "../actions/actions"

const Login = () => {
  const [show, setShow] = useState(false);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [newAccountLogin, setNewAccountLogin] = useState("");
  const [newAccountPassword, setNewAccountPassword] = useState("");
  const [loginSpinner, setLoginSpinner] = useState(false);
  
  const teams = useSelector(state => state.teams);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(fetchTeamByLogin(login.toLowerCase(), password));
  }, [dispatch, login, password]);

  const handleSignInClick = (newLog, newPass) => {
    let alertLoginFailed = true;
    let lcUserLogin = login.toLowerCase();

    if (newLog && newPass) {
      const fetchNewTeamByLoginPromise = new Promise((res) => {
        res(dispatch(fetchTeamByLogin(newLog, newPass)))
      });
      
      return fetchNewTeamByLoginPromise.then((resTeam) => {
        alert('Account created!');
        resTeam && history.push(`/roster/${resTeam.payload.data._id}`);
      })
    }

    dispatch(fetchTeamByLogin(login, password));

    if (login === "" || password === "") {
      return alert('Please fill in all fields.')
    }

    teams.forEach(team => {
      if (team.login.toLowerCase() === lcUserLogin && team.password === password) {
        return alertLoginFailed = false;
      }
    });

    if (alertLoginFailed) {
      return alert('Your login information is invalid. Please try again.')
    } else {

      const fetchTeamByLoginPromise = new Promise((res) => {
        res(dispatch(fetchTeamByLogin(login, password)))
      });

      setLoginSpinner(true);
      
      fetchTeamByLoginPromise.then((resTeam) => {
        setTimeout(() => {
          console.log(resTeam.payload.data);
          resTeam.payload.data && history.push(`/roster/${resTeam.payload.data._id}`);
        }, 500)
      })
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreateAccount = () => {
    let cancelNewAccount = false;

    if (newAccountLogin === "" || newAccountPassword === "") 
    {
      return (alert('Please fill in all fields.'))
    }

    teams.forEach(team => {
      if (team.login.toLowerCase() === newAccountLogin.toLowerCase()) {
        cancelNewAccount = true;
        return (alert('That username already exists. Please choose a different one.'));
      }
    });

    if (!cancelNewAccount) {
      const addNewTeamPromise = new Promise((res) => {
        res(dispatch(addTeam(newAccountLogin.toLowerCase(), newAccountPassword)))
      });

      addNewTeamPromise.then((response) => {
        setShow(false);

        handleSignInClick(response.payload.data.login.toLowerCase(), response.payload.data.password);
      })
    }
  }

  const handleLogin = (e) => {
    setLogin(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleKeyUp = (e) => {
    if (e.keyCode === 13 && login !== "" && password !== "") {
      setTimeout(() => {
        handleSignInClick();
      }, 1)
    }
  }

  const handleNewAccountLogin = (e) => {
    setNewAccountLogin(e.target.value);
  }

  const handleNewAccountPassword = (e) => {
    setNewAccountPassword(e.target.value);
  }

  const renderSpinner = () => {
    if (loginSpinner) {
      return (
        <div className="spinner-border spinner-border-sm login-spinner text-light" role="status"></div>
      )
    }

    return (
      <div>
        <br></br>
      </div>
    )
  }

  const renderModalButton = () => {
    return (
      <div>
        <button type="button" className="btn new-account-button" onClick={() => handleShow()}>Create New Account</button>

        <Modal show={show} onHide={() => handleClose()}>
            <Modal.Header closeButton>
              <Modal.Title>Create Your Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <div>
              <form>
                <input type="text" className="form-control login-username-input" placeholder="Username" onChange={(e) => handleNewAccountLogin(e)}/>
            
                <input type="password" className="form-control login-password-input" placeholder="Password" onChange={(e) => handleNewAccountPassword(e)}/>
              </form>
            </div>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => handleClose()}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => handleCreateAccount()}>
                Create Account
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
    )
  };

  return (
    <div className="container-md login-container">
      <div className="diamond-logo"></div>
      <div className="login-content-field text-center">

        <div className="row login-title-row">
          <div className="col">
            <div className="login-title"><strong><em>GameSet</em></strong>App</div>
            <h5 className="login-subtitle"><em>Manage Easy, Play Hard</em></h5>
            <div>
              {renderSpinner()}
            </div>
          </div>
        </div>

        <div className="row login-input-row">
          <div className="col login-input-col">
            
              <input type="text" className="form-control login-username-input" placeholder="Username" onChange={(e) => handleLogin(e)} onKeyUp={(e) => handleKeyUp(e)}/>
          
              <input type="password" className="form-control login-password-input" placeholder="Password" onChange={(e) => handlePassword(e)} onKeyUp={(e) => handleKeyUp(e)}/>

              <button type="button" className="btn login-button" onClick={() => handleSignInClick()}><strong>Sign In</strong></button>

            {renderModalButton()}
          
          </div>
        </div>

      </div>
    </div>
  )
};

export default Login