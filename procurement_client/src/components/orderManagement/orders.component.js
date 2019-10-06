import React, { Component } from "react";
import axios from 'axios';
import { MDBContainer, MDBTable, MDBTableBody, MDBTableHead  } from 'mdbreact';
import swal from "sweetalert";

export default class OrdersComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            orders : [],
            status : 'Pending',
        };

        this.onClickApprove = this.onClickApprove.bind(this);
        this.onClickDecline = this.onClickDecline.bind(this);
        this.onChangeState=  this.onChangeState.bind(this);
    }

    onClickApprove(e){

        const newOrder = {
            _id : e.target.value,
            approvedUser : {
                staffId : localStorage.getItem("id")
            }
        }

        swal({
            title: "Warning ! ",
            text: "Are you sure you want approve this order ? ",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    axios.put("http://localhost:5001/api/construction/order/approve", newOrder )
                        .then(res=>{
                            swal("Order has been approved ! ", {
                                icon: "success",
                            });
                            this.loadOrders();
                        })
                        .catch(err=>{
                            console.log(err);
                        })

                } else {

                }
            });
    }

    onClickDecline(e){
        const newOrder = {
            _id : e.target.value,
            approvedUser : {
                staffId : localStorage.getItem("id")
            }
        }

        swal({
            title: "Warning ! ",
            text: "Are you sure you want decline this order ? ",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    axios.put("http://localhost:5001/api/construction/order/decline", newOrder )
                        .then(res=>{
                            swal("Order has been declined ! ", {
                                icon: "success",
                            });
                            this.loadOrders();
                        })
                        .catch(err=>{
                            console.log(err);
                        })

                } else {

                }
            });
    }

    loadOrders(){
        axios.get("http://localhost:5001/api/construction/order/" + this.state.status )
            .then(res=>{
                this.setState({
                    orders : res.data
                })
                console.log(res.data);
            })
            .catch(err=>{
                console.log(err);
            })
    }

    componentDidMount() {
        this.loadOrders();
    }

    onChangeState(e){
        this.setState({
            status : e.target.value
        })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.loadOrders();
    }

    render(){
        return (
            <MDBContainer>
                <button className='btn btn-dark text-light' value = "Pending" onClick={this.onChangeState}> Pending </button>
                <button className='btn btn-dark text-light' value = "Approved" onClick={this.onChangeState}> Approved </button>
                <button className='btn btn-dark text-light' value = "Declined" onClick={this.onChangeState}> Declined </button>
                {this.state.orders.map((order,index)=>(

                    <div className="col">
                        <div className="card shadow p-3 mb-5 bg-white rounded-lg">
                            <div className="card-body">

                                <div className="row">

                                    <div className="col">
                                        <font className='text-primary'> Item Quantity : </font> {order.quantity} <br/> <br/>
                                        <font className='text-primary'> Total Amount : </font> Rs. {order.totalAmount} <br/> <br/>
                                        <font className='text-primary'> Order Date : </font> {order.orderDate} <br/> <br/>
                                        <font className='text-primary'> Placed By : </font> {order.placedUser.firstName} <br/> <br/>
                                        <font className='text-primary'> Status : </font> {order.requistion.status} <br/> <br/>

                                        {order.approvedUser !== null ?
                                           <> <font className='text-primary'> {this.state.status} By  : </font> {order.approvedUser.firstName}<br/> <br/> </>
                                            :
                                            null
                                        }

                                        {this.state.status !== "Approved" ?
                                            <button className="btn btn-success" value = {order._id} onClick={this.onClickApprove} > Approve </button>
                                            :
                                            null
                                        }

                                        {this.state.status !== "Declined" ?
                                            <button className="btn btn-danger" value = {order._id} onClick={this.onClickDecline}> Decline  </button>
                                            :
                                            null
                                        }


                                    </div>
                                    <div className="col">
                                        <MDBTable scrollY maxHeight="250px" className='shadow p-3 mb-5 bg-white rounded form-group'>
                                            <MDBTableHead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>Item Name </th>
                                                    <th>Quantity</th>
                                                    <th>Unit Price</th>
                                                </tr>
                                            </MDBTableHead>
                                            <MDBTableBody>

                                                {order.items.map((item,index)=>
                                                        <tr>
                                                            <td> {index + 1 }</td>
                                                            <td> {item.itemName} </td>
                                                            <td> {item.quantity} </td>
                                                            <td> {item.unitPrice} </td>
                                                        </tr>
                                                )}
                                            </MDBTableBody>
                                        </MDBTable>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}


            </MDBContainer>
        );
    }

}