import React, { Component } from "react";
import axios from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn,MDBCard, MDBCardBody } from 'mdbreact';


export  class AddSupplier extends Component {
  state = {
    name: '',
    email:''
  }

  OnChange = event => {
    this.setState({ name: event.target.value });
    this.setState({ email: event.target.value });
  }

  onSubmit(e){

    const addSupplier = {
      name: this.state.name,
      email:this.state.email
    };
    e.preventDefault();
 
        axios.post('https://localhost/27017/api/addSupplier' ,{ addSupplier })
        
        .then((response) => {
          console.log(response);
        }, (error) => {
          console.log(error);
        });
  }

render(){
  return (
    <MDBContainer className="text-center">
      <MDBRow>
        <MDBCol md="6">
        <MDBCard>
            <MDBCardBody>
          <form>
            <p className="h4 text-center mb-4">Add Supplier</p>
            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
              Your name
            </label>
            <input
              type="text"
              id="defaultFormRegisterNameEx"
              className="form-control"
              name="name" onChange={this.OnChange}
            />
            <br />
            <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
              Your email
            </label>
            <input
              type="email"
              id="defaultFormRegisterEmailEx"
              className="form-control"
              name="email" onChange={this.OnChange}
            />
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

export default AddSupplier;