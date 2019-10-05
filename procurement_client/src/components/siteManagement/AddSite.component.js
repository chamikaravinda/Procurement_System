import React, { Component } from "react";
import axios from "axios";
import { MDBContainer, MDBRow, MDBCol, MDBBtn,MDBCard, MDBCardBody } from 'mdbreact';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";


export  class AddSite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      siteName: '',
      siteAddress:'',
      employeeCount:'',
      siteManager:'',
      addedBy:'',
      allManagers:[]
    }

    this.onSubmit = this.onSubmit.bind(this);
  }


  OnChange = event => {
    this.setState({ siteName: event.target.value });
    this.setState({ siteAddress: event.target.value });
    this.setState({ employeeCount: event.target.value});
    this.setState({ siteManager: event.target.value});
  }

  onSubmit(e){
    e.preventDefault();

    const newSite = {
      siteName: this.state.siteName,
      siteAddress:this.state.siteAddress,
      employeeCount: this.state.employeeCount,
      siteManagerld:this.state.siteManager,
      addedBy:localStorage.getItem("id")

    };

 
        axios.post('http://localhost:5001/api/construction/site/add',newSite)
        .then((response) => {
          console.log(response);
        }, (error) => {
          console.log(error);
        });
  }

  componentDidMount(){
    axios.get('http://localhost:5001/api/construction/data?RT=71&Uid='+'Site Manager')
            .then(res => {
                this.setState({
                  allManagers: res.data,
                })
            })
            .catch(err => {
                console.log(err);
            });
  }

render(){
  return (
    <MDBContainer className="text-center">
      <MDBRow>
        <MDBCol md="6">
        <MDBCard>
            <MDBCardBody>
          <form onSubmit={this.onSubmit}>
            <p className="h4 text-center mb-4">Add Site</p>
            <label htmlFor="siteName" className="grey-text">
              Site Name
            </label>
            <input
              type="text"
              id="siteName"
              className="form-control"
              name="siteName" onChange={this.OnChange}
              required
            />
            <br />
            <label htmlFor="siteAddress" className="grey-text">
              Site Address
            </label>
            <input
              type="text"
              id="siteAddress"
              className="form-control"
              name="siteAddress" onChange={this.OnChange}
              required
            />
            <br />
            <label htmlFor="siteEmpCount" className="grey-text">
             Employee Count
            </label>
            <input
              type="text"
              id="employeeCount"
              className="form-control"
              name="employeeCount" onChange={this.OnChange}
              required
            />
            <br />
            <label htmlFor="siteManager" className="grey-text">
              Site Manager
            </label>
            <select
              id="siteManager"
              className="form-control"
              name="siteManager" onChange={this.OnChange}
              required
            >
                 <option disabled>--Select Site Manager--</option>
                {this.state.allManagers.map((res, index) => (
                    <option value={res.staffId}>{res.firstName}</option>
                  )
                  )}
            </select>
            <br />
         
            <div className="text-center mt-4">
              <MDBBtn color="unique" type="submit">
                Add
              </MDBBtn>
            </div>
          </form>
          
            </MDBCardBody>
            </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

}

export default AddSite;