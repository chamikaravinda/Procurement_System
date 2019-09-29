import React, { Component } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBCardHeader,
  MDBBtn
} from "mdbreact";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class UserRegister extends Component {
  
  render() {
    return (
      <MDBContainer className="w-25 mt-5">
        <MDBCard className="d-flex justify-content-center align-self-center">
          <MDBCardHeader className="text-center" color="success-color-dark" tag="h3">
            Sign Up
          </MDBCardHeader>
          <MDBCardBody>
            <form onSubmit={this.onSubmit}>
              <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                Your name
              </label>
              <input
                type="text"
                id="defaultFormRegisterNameEx"
                className="form-control"
              />
              <br />
              <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                Your email
              </label>
              <input
                type="email"
                id="defaultFormRegisterEmailEx"
                className="form-control"
              />
              <br />
              <label
                htmlFor="defaultFormRegisterPasswordEx"
                className="grey-text"
              >
                Your password
              </label>
              <input
                type="password"
                id="defaultFormRegisterPasswordEx"
                className="form-control"
              />
              <br />
              <label
                htmlFor="defaultFormRegisterPasswordEx"
                className="grey-text"
              >
                Confirm Your password
              </label>
              <input
                type="password"
                id="defaultFormRegisterPasswordEx"
                className="form-control"
              />
              <div className="text-center mt-4 mr-2">
                <MDBBtn className="btn-block " color="dark-green" type="submit">
                  <MDBIcon icon="user-plus" /> Register
                </MDBBtn>
              </div>
            </form>
            <br />
            <p class="text-center font-weight-light">
              Have an account ?<Link to="/login"> Login From Here</Link>
            </p>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
  }
}
