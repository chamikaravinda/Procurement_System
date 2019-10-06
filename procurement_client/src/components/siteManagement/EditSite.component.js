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
    this.onChangeSiteName =this.onChangeSiteName.bind(this);
    this.onChangeSiteAddress =  this.onChangeSiteAddress.bind(this);
    this.onChangeSiteManager = this.onChangeSiteManager.bind(this);
    this.onChangeEmpCount = this.onChangeEmpCount.bind(this);

  }

   onChangeSiteName(event){
    this.setState({ siteName: event.target.value });
   }
   onChangeSiteAddress(event){
    this.setState({ siteAddress: event.target.value });
   }
   onChangeEmpCount(event){
    this.setState({ employeeCount: event.target.value});
   }
   onChangeSiteManager(event){
    console.log("onchange value"+event.target.value)
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

        console.log(this.state.siteManager);

        axios.post('http://localhost:5001/api/construction/site/add',newSite)
        .then((response) => {
          console.log(response);
        }, (error) => {
          console.log(error);
        });
  }

  componentDidMount(){
    axios.get('http://localhost:5001/api/construction/data?RT=76&Uid='+this.props.match.params.id)
    .then(res => {
        this.setState({
          siteName:res.data.siteName,
          siteAddress:res.data.siteAddress,
          siteManager:res.data.siteManagerld,
          employeeCount:res.data.employeeCount
        })
    })
    .catch(err => {
        console.log(err);
    });

  
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
              value={this.state.siteName}
              name="siteName" onChange={this.onChangeSiteName}
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
              value={this.state.siteAddress}
              name="siteAddress" onChange={this.onChangeSiteAddress}
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
              value={this.state.employeeCount}
              name="employeeCount" onChange={this.onChangeEmpCount}
              required
            />
            <br />
            <label htmlFor="siteManager" className="grey-text">
              Site Manager
            </label>
            <select
              id="siteManager"
              className="form-control"
              value={this.state.siteManager}
              name="siteManager" onChange={this.onChangeSiteManager}
              required
            >
                {this.state.allManagers.map((res, index) => (
                    <option value={res.staffId}>{res.firstName}</option>
                  )
                  )}
            </select>
            <br />
         
            <div className="text-center mt-4">
              <MDBBtn color="unique" type="submit">
                Update
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