    import React, {Component, Fragment} from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow, MDBIcon} from "mdbreact";
import axios from "axios";
import {MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";


export default class DashboardPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allUsers: [],
            allOrders: [],
            param: "chamika@gmail.com",
            name: '',
            email: '',
            withQtyItem:[],
            withoutQtyItem:[]
        }
    }

    fileDelete(_id) {
        console.log("Auto Called" + _id);
        axios.get('http://localhost:5001/api/construction/data?RT=30&Uid=' + _id)
            .then(res => {
                console.log("Response From Delete Request" + res.data.body);
                this.setState({
                    allUsers: res.data.body,
                })
            })
            .catch(err => {
                console.log(err);
            });
    }


    componentDidMount() {
        axios.get('http://localhost:5001/api/construction/data?RT=29')
            .then(res => {
                console.log(res.data);
                this.setState({
                    allUsers: res.data,

                })
            })
            .catch(err => {
                console.log(err);
            });

        axios.get('http://localhost:5001/api/construction/data?RT=31')
            .then(res => {
                console.log("Order Data" + res.data);
                this.setState({
                    allOrders: res.data,

                })
            })
            .catch(err => {
                console.log(err);
            });

            axios.get('http://localhost:5001/api/construction/data?RT=1003')
            .then(res => {
                console.log("item with quantity" + res.data);
                this.setState({
                    withQtyItem: res.data,

                })
            })
            .catch(err => {
                console.log(err);
            });

            axios.get('http://localhost:5001/api/construction/data?RT=1004')
            .then(res => {
                console.log("item without quantity" + res.data);
                this.setState({
                    withoutQtyItem: res.data,

                })
            })
            .catch(err => {
                console.log(err);
            })

            
    }

    

    


    render() {
        var _getSiteProcurementManagerBoard = () =>
            <React.Fragment>
                <MDBContainer className="text-center">
                    <MDBRow md="12">
                        <MDBCol md="12">
                            <MDBCard>
                                <MDBCardBody>
                                    <>
                                        <div className="container border-bottom">
                                            <br/> <br/>
                                            <h4>All users</h4>
                                            <br/> <br/>
                                            <MDBTable bordered>
                                                <MDBTableHead>
                                                    <tr className="bg-dark text-light">
                                                        <th>Staff Id</th>
                                                        <th>User Name</th>
                                                        <th>Designation</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </MDBTableHead>
                                                <MDBTableBody>
                                                    {this.state.allUsers.map((result, index) => (
                                                            <tr>
                                                                <td>{result.staffId}</td>
                                                                <td>{result.firstName}</td>
                                                                <td>{result.type}</td>
                                                                <td>
                                                                    <div className="btn-group">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => this.fileDelete(result.staffId)}
                                                                            className="btn btn-danger btn-sm"
                                                                        >
                                                                            {" "}<MDBIcon far icon="trash-alt"/>
                                                                            {" "} Delete{" "}
                                                                        </button>
                                                                        
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}

                                                </MDBTableBody>
                                            </MDBTable>
                                        </div>
                                    </>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <br/><br/>
                    <MDBRow md="12">
                        <MDBCol md="12">
                            <MDBCard>
                                <MDBCardBody>
                                    <>
                                        <div className="container border-bottom">
                                            <br/> <br/>
                                            <h4>All Orders</h4>
                                            <br/> <br/>
                                            <MDBTable bordered>
                                                <MDBTableHead>
                                                    <tr className="bg-dark text-light">
                                                        <th>Order Id</th>
                                                        <th>Items</th>
                                                        <th>Ordered By</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </MDBTableHead>
                                                <MDBTableBody>
                                                    {this.state.allOrders.map((res, index) => (
                                                            <tr>
                                                                <td>{res._orderId}</td>
                                                                <td>{
                                                                    res.items.map((result, index) => (
                                                                        <tr>
                                                                            <td>{result._id}</td>
                                                                            <td>{result.itemName}</td>
                                                                        </tr>
                                                                    ))
                                                                }</td>
                                                                <td>{res.placedEmployee}</td>
                                                               
                                                            </tr>
                                                        )
                                                    )}

                                                </MDBTableBody>
                                            </MDBTable>
                                        </div>
                                    </>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </React.Fragment>;

        var _getSiteManagerBoard = () =>
            <React.Fragment>
                <h6>Site Manager</h6>
            </React.Fragment>;

        var _getFinancialEmployeeBoard = () =>
        <React.Fragment>
        <MDBContainer className="text-center">
             <MDBRow md="12">
                <MDBCol md="12">
                    <MDBCard>
                        <MDBCardBody>
                            <>
                                <div className="container border-bottom">
                                    <br/> <br/>
                                    <h4>Item with Quantity</h4>
                                    <br/> <br/>
                                    <MDBTable bordered>
                                        <MDBTableHead>
                                            <tr className="bg-dark text-light">
                                                <th>Item Id</th>
                                                <th>Item Name</th>
                                                <th>Unite Price</th>
                                                <th>Item Quantity</th>
                                                <th>Actions</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                                    {this.state.withQtyItem.map((res,index) => (
                                                            <tr>
                                                                <td>{res._id}</td>
                                                                <td>{res.itemName}</td>
                                                                <td>{res.unitPrice}</td>
                                                                <td>{res.quantity}</td>
                                                                
                                                                <td>
                                                                    <div className="btn-group">
                                                                        <button
                                                                            type="button"
                                                                           // onClick={() => this.fileDelete(result.staffId)}
                                                                            className="btn btn-danger btn-sm"
                                                                        >
                                                                            {" "}<MDBIcon far icon="trash-alt"/>
                                                                            {" "} Delete{" "}
                                                                        </button>
                                                                        
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}

                                        </MDBTableBody>
                                    </MDBTable>
                                </div>
                            </>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>

        <br/> <br/>
        <MDBContainer className="text-center">
             <MDBRow md="12">
                <MDBCol md="12">
                    <MDBCard>
                        <MDBCardBody>
                            <>
                                <div className="container border-bottom">
                                    <br/> <br/>
                                    <h4>Item without Quantity</h4>
                                    <br/> <br/>
                                    <MDBTable bordered>
                                        <MDBTableHead>
                                            <tr className="bg-dark text-light">
                                                <th>Item Id</th>
                                                <th>Item Name</th>
                                                <th>Unite Price</th>
                                                <th>Item Quantity</th>
                                                <th>Actions</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                                    {this.state.withoutQtyItem.map((res,index) => (
                                                            <tr>
                                                                <td>{res._id}</td>
                                                                <td>{res.itemName}</td>
                                                                <td>{res.unitPrice}</td>
                                                                <td>{res.quantity}</td>
                                                                
                                                                <td>
                                                                    <div className="btn-group">
                                                                        <button
                                                                            type="button"
                                                                           // onClick={() => this.fileDelete(result.staffId)}
                                                                            className="btn btn-danger btn-sm"
                                                                        >
                                                                            {" "}<MDBIcon far icon="trash-alt"/>
                                                                            {" "} Delete{" "}
                                                                        </button>
                                                                        
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}

                                        </MDBTableBody>
                                    </MDBTable>
                                </div>
                            </>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    </React.Fragment>;

        var _getSupervisorBoard = () =>
        <React.Fragment>
                <MDBContainer className="text-center">
                    <MDBRow md="12">
                        <MDBCol md="12">
                            <MDBCard>
                                <MDBCardBody>
                                    <Link to="/add-site" ><MDBBtn className="float-left" color="primary" size="sm">Add Site</MDBBtn></Link>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
        </React.Fragment>;                                                                    

        console.log(localStorage.getItem('userType'));
        if (localStorage.getItem('userType') === "Site Manager") {
            return (<_getSiteManagerBoard/>)
        } else if (localStorage.getItem('userType') === "Procurement Manager") {
            return (<_getSiteProcurementManagerBoard/>)
        } else if (localStorage.getItem('userType') === "Finance") {
            return (<_getFinancialEmployeeBoard/>)
        } else if (localStorage.getItem('userType') === "Supervisor") {
            return (<_getSupervisorBoard/>)
        }
    }
}







