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
            email: ''
        }
    }

    fileDelete(_id) {
        console.log("AUto Called" + _id);
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
            })
    }

    OnChange = event => {
        this.setState({name: event.target.value});
        this.setState({email: event.target.value});
    }

    onSubmit(e) {

        const addSupplier = {
            name: this.state.name,
            email: this.state.email
        };
        e.preventDefault();

        // axios.post('https://localhost/27017/api/addSupplier' ,{ addSupplier })
        //
        //     .then((response) => {
        //         console.log(response);
        //     }, (error) => {
        //         console.log(error);
        //     });
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
                                                                        {/*<Link to={"/report/" + result.staffId}*/}
                                                                        {/*      className="btn btn-primary btn-sm">*/}
                                                                        {/*    {" "}<MDBIcon icon="chart-line"/>*/}
                                                                        {/*    {" "} Analyse{" "}*/}
                                                                        {/*</Link>*/}
                                                                        {/*<Link to={"/assign/" + result.staffId}*/}
                                                                        {/*      className="btn btn-primary btn-sm">*/}
                                                                        {/*    {" "}<MDBIcon icon="bug"*/}
                                                                        {/*                  style={{color: '#FFF'}}/>*/}
                                                                        {/*    {" "} Assign{" "}*/}
                                                                        {/*</Link>*/}
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
                                                                            < td> {result.itemName}</td>
                                                                        </tr>
                                                                    ))
                                                                }</td>
                                                                <td>{res.placedEmployee}</td>
                                                                {/*<td>*/}
                                                                {/*    <div className="btn-group">*/}
                                                                {/*        <button*/}
                                                                {/*            type="button"*/}
                                                                {/*            onClick={() => this.fileDelete(res.staffId)}*/}
                                                                {/*            className="btn btn-danger btn-sm"*/}
                                                                {/*        >*/}
                                                                {/*            {" "}<MDBIcon far icon="trash-alt"/>*/}
                                                                {/*            {" "} Delete{" "}*/}
                                                                {/*        </button>*/}
                                                                {/*        /!*<Link to={"/report/" + result.staffId}*!/*/}
                                                                {/*        /!*      className="btn btn-primary btn-sm">*!/*/}
                                                                {/*        /!*    {" "}<MDBIcon icon="chart-line"/>*!/*/}
                                                                {/*        /!*    {" "} Analyse{" "}*!/*/}
                                                                {/*        /!*</Link>*!/*/}
                                                                {/*        /!*<Link to={"/assign/" + result.staffId}*!/*/}
                                                                {/*        /!*      className="btn btn-primary btn-sm">*!/*/}
                                                                {/*        /!*    {" "}<MDBIcon icon="bug"*!/*/}
                                                                {/*        /!*                  style={{color: '#FFF'}}/>*!/*/}
                                                                {/*        /!*    {" "} Assign{" "}*!/*/}
                                                                {/*        /!*</Link>*!/*/}
                                                                {/*    </div>*/}
                                                                {/*</td>*/}
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
                <h6>Wlcome</h6>
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







