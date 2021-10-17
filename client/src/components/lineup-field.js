import bballdiamond from '../constants/bballdiamond.jpg';
import { useHistory } from "react-router";

const LineupField = () => {

  const history = useHistory();
  const paramId = window.location.pathname.substr(window.location.pathname.length - 24);

  const handleTableView = () => {
    history.push(`/lineup/${paramId}`);
  }

  return (
    <div className="container-md lineup-container">
      <div className="row">
        <div className="col text-start">
          <button type="button" className="btn-sm table-view-btn" onClick={() => {handleTableView()}}>TableView</button>
        </div>
        <div className="col">
          <h2 className="lineup-field-page-title text-center"><strong><u>LINEUP</u></strong></h2>
        </div>
        <div className="col"></div>
      </div>

      <div className="row text-center">
        <div className="col"></div>
        <div className="col">

          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item"><a className="page-link" href="#">4</a></li>
              <li className="page-item"><a className="page-link" href="#">5</a></li>
              <li className="page-item"><a className="page-link" href="#">6</a></li>
              <li className="page-item"><a className="page-link" href="#">7</a></li>
            </ul>
          </nav>

        </div>
        <div className="col"></div>
      </div>

      <div className="row">
        <div className="col">
          <img src={bballdiamond} className="field-img" alt="diamond"></img>
        </div>
      </div>

    </div>
  )
}

export default LineupField