// import bballdiamond from './constants/bballdiamond.jpg';
import { useHistory } from "react-router";

const LineupField = () => {

  const history = useHistory();
  const paramId = window.location.pathname.substr(window.location.pathname.length - 24);

  const handleTableView = () => {
    history.push(`/lineup/${paramId}`);
  }

  return (
    <div className="container-fluid lineup-container">
      <div className="row">
        <div className="col text-start">
          <button type="button" className="btn-sm table-view-btn" onClick={() => {handleTableView()}}>TableView</button>
        </div>
        <div className="col">
          <h2 className="lineup-field-page-title text-center"><strong><u>LINEUP</u></strong></h2>
        </div>
        <div className="col"></div>
      </div>

      <div className="row">

      </div>
      
    </div>
  )
}

export default LineupField