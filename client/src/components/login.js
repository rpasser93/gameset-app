import { useHistory } from "react-router";

const Login = () => {
  const history = useHistory();

  const loginFormSubmit = () => {
    console.log('Logged in!');
    history.push("/roster/:id") //update with Team ID associated with logged in user
    //eslint-disable-next-line
    location.reload(true);
  }

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
            <form onSubmit={loginFormSubmit}>
              <input type="text" className="form-control login-username-input" placeholder="Username"/>
          
              <input type="password" className="form-control login-password-input" placeholder="Password"/>

              <button type="submit" className="btn login-button"><strong>Sign In</strong></button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
};

export default Login