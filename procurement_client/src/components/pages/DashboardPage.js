import React, {Component} from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow, MDBIcon} from "mdbreact";
import axios from "axios";
import {MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";


export default class DashboardPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allUsers: [],
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
                                        <br/>
                                        <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                                            Your email
                                        </label>
                                        <input
                                            type="email"
                                            id="defaultFormRegisterEmailEx"
                                            className="form-control"
                                            name="email" onChange={this.OnChange}
                                        />
                                        <br/>


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
            </React.Fragment>;

        var _getSiteManagerBoard = () =>
            <React.Fragment>
                <h6>Site Manager</h6>
            </React.Fragment>;

        var _getFinancialEmployeeBoard = () =>
            <React.Fragment>
                <h6>Wlcome</h6>
            </React.Fragment>;


        console.log(localStorage.getItem('userType'));
        if (localStorage.getItem('userType') === "Site Manager") {
            return (<_getSiteManagerBoard/>)
        } else if (localStorage.getItem('userType') === "Procurement Manager") {
            return (<_getSiteProcurementManagerBoard/>)
        } else if (localStorage.getItem('userType') === "Finance") {
            return (<_getFinancialEmployeeBoard/>)
        }
    }
}







