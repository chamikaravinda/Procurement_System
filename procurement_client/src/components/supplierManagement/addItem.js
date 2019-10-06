import React, { Component } from "react";
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBBtn,MDBCard, MDBCardBody } from 'mdbreact';
import swal from "sweetalert";

export  class AddItem extends Component {


    constructor(props) {
        super(props);
        this.state = {
          itemName: null,
          quantity: null,
          unitPrice:null
            

           
        };

        this.onChangeItemName = this.onChangeItemName.bind(this);
        this.onChangeItemPrice = this.onChangeItemPrice.bind(this);
        this.onChangeItemQty = this.onChangeItemQty.bind(this);
       
        this.onSubmit = this.onSubmit.bind(this);
    }
 

  onChangeItemPrice(e) {
    this.setState({
      unitPrice: e.target.value
    });
  }
  onChangeItemQty(e) {
    this.setState({
      quantity: e.target.value
    });
  }

  onChangeItemName(e) {
    this.setState({
      itemName: e.target.value
    });
  }




  onSubmit(e){
    e.preventDefault();
    const addItem = {
      itemName: this.state.itemName,
      quantity:this.state.quantity,
      unitPrice:this.state.unitPrice
    };
  
    axios
        .post('http://localhost:5001/api/construction/item/addItem' ,addItem)
        .then(res => {
            console.log(res);
            swal("Success", "Item added sucessfully", "success");
            this.props.history.push("/dashboard");
            window.location.reload();
        })
        .catch(err => {
            swal("Error","Item Already Exists","Error");
            this.props.history.push("/dashboard");
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
            <p className="h4 text-center mb-4">Add Item</p>
            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
              Item name
            </label>
            <input
              type="text"
              id="defaultFormRegisterNameEx"
              className="form-control"
              name="itemName" onChange={this.onChangeItemName}
            />
            <br />
            <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
             Unit Price
            </label>
            <input
              type="number"
              id="defaultFormRegisterEmailEx"
              className="form-control"
              name="unitPrice" onChange={this.onChangeItemPrice}
            />
            <br />
            <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
             Item Quantity
            </label>
            <input
              type="number"
              id="defaultFormRegisterEmailEx"
              className="form-control"
              name="quantity" onChange={this.onChangeItemQty}
            />
            <br />
        
         
            <div className="text-center mt-4">
              <MDBBtn color="green" type="submit">
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

export default AddItem;