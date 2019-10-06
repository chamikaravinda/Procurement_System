    import React, {Component, Fragment} from 'react';
import {MDBBtn,MDBView, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow, MDBIcon} from "mdbreact";
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
            withoutQtyItem:[],
            withQtyItemDelete:[],
            withoutQtyItemDelete:[],
            sites:[],
            siteType:"allSites"

        }

        this.onChangeSityType=this.onChangeSityType.bind(this);
    }


    onChangeSityType(e){
        this.setState({
            siteType:e.target.value
        })
        // this.getSiteDetails(localStorage.getItem("id"),e.target.value);
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

  deleteSiteById(_id) {
        axios.get('http://localhost:5001/api/construction/data?RT=73&Uid=' + _id)
            .then(res => {
                this.getSiteDetails(localStorage.getItem("id"))
            })
            .catch(err => {
                console.log(err);
            });
    }

      itemDelete(_id) {
        console.log("Auto Called" + _id);
        axios.get('http://localhost:5001/api/construction/data?RT=1006&Uid=' + _id)
            .then(res => {
                console.log("Response From Delete Request" + res.data.body);
                this.setState({
                    withQtyItem: res.data.body,
                })
            })
            .catch(err => {
                console.log(err);
            });
    }
       withoutItemDelete(_id) {
        console.log("Auto Called" + _id);
        axios.get('http://localhost:5001/api/construction/data?RT=1006&Uid=' + _id)
            .then(res => {
                console.log("Response From Delete Request" + res.data.body);
                this.setState({
                    withoutQtyItemDelete:res.data.body,
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    Updateitem(_id) {
        console.log("Auto Called" + _id);
        axios.get('http://localhost:5001/api/construction/data?RT=1005&Uid=' + _id)
            .then(res => {
                console.log("Response From Delete Request" + res.data.body);
                this.setState({
                    withQtyItem: res.data.body,
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

        if (localStorage.getItem('userType') === "Supervisor") {
            axios.get('http://localhost:5001/api/construction/data?RT=72')
            .then(res => {
                this.setState({
                    sites: res.data,

                })
            })
            .catch(err => {
                console.log(err);
            })
        }else{
            console.log("My sites loaded");
            axios.get('http://localhost:5001/api/construction/data?RT=74&Uid=' + localStorage.getItem("id"))
            .then(res => {
                if(res.data.length>0){
                    this.setState({
                        sites: res.data

                    })
                }else{
                    console.log("no sites to show")
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
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
                                                        <th>Status</th>
                                                        <th>Total</th>
                                                        <th>Date</th>
                                                    </tr>
                                                </MDBTableHead>
                                                <MDBTableBody>
                                                    {this.state.allOrders.map((res, index) => (
                                                            <tr>
                                                                <td>{res._id}</td>
                                                                <td>{
                                                                    res.items.map((result, index) => (
                                                                        <tr>
                                                                            <td>{result._id}</td>
                                                                            <td>{result.itemName}</td>
                                                                            {/*<td>{result.quantity}</td>*/}
                                                                            {/*<td>{result.unitPrice}</td>*/}
                                                                        </tr>
                                                                    ))
                                                                }</td>
                                                                <td>{res.requistion.status}</td>
                                                                <td>{res.totalAmount}</td>
                                                                <td>{res.orderDate}</td>
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
                                    <MDBView className="gradient-card-header blue darken-2">
                                    <h4 className="h4-responsive text-white">
                                     Available Quantity
                                     <Link to="/addItem"><button className="btn btn-primary btn-sm" >New</button></Link>
                                    </h4>
                                    </MDBView>

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
                                                                            onClick={() =>this.itemDelete(res._id)}

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
                                    <MDBView className="gradient-card-header blue darken-2">
                                    <h4 className="h4-responsive text-white">
                                    Not Available Quantity
                                    </h4>
                                    </MDBView>
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
                                    <MDBRow md="12">
                                        <MDBCol md="3">
                                            <select
                                                id="siteType"
                                                className="form-control"
                                                value={this.state.siteType}
                                                name="siteType" onChange={this.onChangeSityType}
                                                required
                                                >
                                                    <option value="allSites" selected>All Sites</option>
                                                    <option value="mySites">My Sites</option>
                                            </select>
                                        </MDBCol>
                                        <MDBCol md="9">
                                            <Link to="/add-site" ><MDBBtn className="float-right" color="primary" size="sm">Add Site</MDBBtn></Link>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBTable bordered>
                                        <MDBTableHead>
                                            <tr className="bg-dark text-light">
                                                <th>Site Name</th>
                                                <th>Address</th>
                                                <th>Employees</th>
                                                <th>Manager</th>
                                                {
                                                    this.state.siteType ==="mySites" &&
                                                    <th></th>
                                                }
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                                    {this.state.sites.map((res,index) => (
                                                            <tr>
                                                                <td>{res.siteName}</td>
                                                                <td>{res.siteAddress}</td>
                                                                <td>{res.employeeCount}</td>
                                                                <td>{res.siteManagerld}</td>
                                                                {
                                                                    // this.state.siteType ==="mySites"
                                                                    <td>
                                                                        <div className="btn-group">
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => this.deleteSiteById(res.siteId)}
                                                                                className="btn btn-danger btn-sm"
                                                                            >
                                                                                {" "}<MDBIcon far icon="trash-alt"/>
                                                                                {" "} Delete{" "}
                                                                            </button>

                                                                        </div>
                                                                    </td>
                                                                }
                                                            </tr>
                                                        )
                                                    )}

                                        </MDBTableBody>
                                    </MDBTable>
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







