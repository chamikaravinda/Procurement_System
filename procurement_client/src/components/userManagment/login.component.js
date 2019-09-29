import React, { Component } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBCardHeader
} from "mdbreact";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class UserLogin extends Component {

  constructor(props) {
    super(props)
}

  onSubmit(e){
    e.preventDefault();
    localStorage.setItem('status',true);

    if(localStorage.getItem('status')){
      this.props.history.push("/");
      window.location.reload();
    }
  }

  render() {
    return (
      <MDBContainer className="w-25 mt-5">
        <br />
        <br />
        <br />
        <MDBCard className="d-flex justify-content-center align-self-center">
          <MDBCardHeader className="text-center" color="success-color-dark" tag="h3">
            Sign in
          </MDBCardHeader>
          <MDBCardBody>
            <form onSubmit={this.onSubmit}>
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                Your email
              </label>
              <input
                type="email"
                id="defaultFormLoginEmailEx"
                className="form-control"
              />

              <br />
              <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                {" "}
                Your password{" "}
              </label>
              <input
                type="password"
                id="defaultFormLoginPasswordEx"
                className="form-control"
              />

              <div className="text-center mt-4 mr-2">
                <MDBBtn className="btn-block" color="dark-green" type="submit">
                  <i class="fas fa-sign-in-alt" /> Login
                </MDBBtn>
              </div>
            </form>
            <br />

            <p class="text-center font-weight-light">
              Don't have a account ?
              <Link to="/register"> Register From Here</Link>
            </p>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
  }
}
