import { useHistory } from "react-router";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTeam, fetchTeamByLogin } from "../actions/actions"

const Login = () => {
  const [show, setShow] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [newAccountLogin, setNewAccountLogin] = useState("");
  const [newAccountPassword, setNewAccountPassword] = useState("");

  const team = useSelector(state => state.team[0]);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchTeamByLogin("",""))
  }, [dispatch]);

  const handleSignInClick = () => {

    if (login === "" || password === "") {
      return alert('Please fill in all fields.')
    } else {

    dispatch(fetchTeamByLogin(login, password));

    team && history.push(`/roster/${team._id}`);
  
    setLogin("");
    setPassword("");
  }
}

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreateAccount = () => {
    if (newAccountLogin === "" || newAccountPassword === "") 
    {
      return (alert('Please fill in all fields.'))
    }

    dispatch(addTeam(newAccountLogin, newAccountPassword));
    alert('Account successfully created! Please sign in.')
    setNewAccountLogin("");
    setNewAccountPassword("");
    setShow(false);
  }

  const handleLogin = (e) => {
    setLogin(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleNewAccountLogin = (e) => {
    setNewAccountLogin(e.target.value);
  }

  const handleNewAccountPassword = (e) => {
    setNewAccountPassword(e.target.value);
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
    <div className="container-fluid login-container">
      <div className="diamond-logo"></div>
      <div className="login-content-field text-center">

        <div className="row login-title-row">
          <div className="col">
            <div className="login-title"><strong><em>GameSet</em></strong>App</div>
            <h5 className="login-subtitle"><em>Manage Easy, Play Hard</em></h5>
            <br></br>
          </div>
        </div>

        <div className="row login-input-row">
          <div className="col login-input-col">
            
              <input type="text" className="form-control login-username-input" placeholder="Username" onChange={(e) => handleLogin(e)}/>
          
              <input type="password" className="form-control login-password-input" placeholder="Password" onChange={(e) => handlePassword(e)}/>

              <button type="button" className="btn login-button" onClick={() => handleSignInClick()}><strong>Sign In</strong></button>

            {renderModalButton()}
            
          </div>
        </div>

      </div>
    </div>
  )
};

export default Login