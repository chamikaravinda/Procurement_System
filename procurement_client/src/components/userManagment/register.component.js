import React, {Component} from "react";
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBCardHeader,
    MDBBtn, MDBDropdown, MDBDropdownItem
} from "mdbreact";
import Select from 'react-select';
import swal from "sweetalert";

import validationConstant from "../util/validationConstants";
import lengthCalculator from "../util/stringlengthCalculator";
import axios from "axios";


import {BrowserRouter as Router, Route, Link} from "react-router-dom";

const optionsSearch = [
    {key: 'Procurement Manager', name: 'Procurement Manager', label: 'Procurement Manager'},
    {key: 'Site Manager', name: 'Site Manager', label: 'Site Manager'},
    {key: 'Supervisor', name: 'Supervisor', label: 'Supervisor'},
    {key: 'Finance', name: 'Finance', label: 'Finance'}
];

export default class UserRegister extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangEmail = this.onChangEmail.bind(this);
        this.onChanagePassword = this.onChanagePassword.bind(this);
        this.onChanageConfirmPassword = this.onChanageConfirmPassword.bind(this);

        this.isValid = this.isValid.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: null,
            email: null,
            password: null,
            confirmpassword: null,
            optionsSearch: 'Select Here',

            isClicked: {
                name: false,
                email: false,
                password: false,
                confirmpassword: false
            },
            isError: {
                name: false,
                email: false,
                password: false,
                confirmpassword: false
            }
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });

        let tempClicked = this.state.isClicked;
        tempClicked.name = true;
        this.setState({
            isClicked: tempClicked
        });

        if (
            lengthCalculator.lengthWithoutSpaces(e.target.value + " ") < 3 ||
            !validationConstant.textOnlyRegExp.test(e.target.value)
        ) {
            let tempError = this.state.isError;
            tempError.name = true;
            this.setState({
                isError: tempError
            });
        } else {
            let tempError = this.state.isError;
            tempError.name = false;
            this.setState({
                isError: tempError
            });
        }
    }

    onChangEmail(e) {
        this.setState({
            email: e.target.value
        });

        let tempClicked = this.state.isClicked;
        tempClicked.email = true;
        this.setState({
            isClicked: tempClicked
        });

        if (!validationConstant.emailRegExp.test(e.target.value)) {
            let tempError = this.state.isError;
            tempError.email = true;
            this.setState({
                isError: tempError
            });
        } else {
            let tempError = this.state.isError;
            tempError.email = false;
            this.setState({
                isError: tempError
            });
        }
    }

    onChanagePassword(e) {
        this.setState({
            password: e.target.value
        });

        let tempClicked = this.state.isClicked;
        tempClicked.password = true;
        this.setState({
            isClicked: tempClicked
        });

        if (lengthCalculator.lengthWithoutSpaces(e.target.value + " ") < 6) {
            let tempError = this.state.isError;
            tempError.password = true;
            this.setState({
                isError: tempError
            });
        } else {
            let tempError = this.state.isError;
            tempError.password = false;
            this.setState({
                isError: tempError
            });
        }
    }

    onChanageConfirmPassword(e) {
        this.setState({
            confirmpassword: e.target.value
        });

        let tempClicked = this.state.isClicked;
        tempClicked.confirmpassword = true;
        this.setState({
            isClicked: tempClicked
        });

        if (
            lengthCalculator.lengthWithoutSpaces(e.target.value + " ") < 6 ||
            e.target.value !== this.state.password
        ) {
            let tempError = this.state.isError;
            tempError.confirmpassword = true;
            this.setState({
                isError: tempError
            });
        } else {
            let tempError = this.state.isError;
            tempError.confirmpassword = false;
            this.setState({
                isError: tempError
            });
        }
    }

    onOptionChange = e => {
        this.setState({optionsSearch: e.key});
    };


    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            let User = {
                firstName: this.state.name,
                email: this.state.email,
                password: this.state.password,
                type: this.state.optionsSearch,
            };
            console.log(User);
            axios
                .post('http://localhost:5001/api/construction/user/add/', User)
                .then(res => {
                    console.log(res);
                    swal("Success", "User added sucessfully", "success");
                    this.props.history.push("/");
                    window.location.reload();
                })
                .catch(err => {
                    swal("Error","User Already Exists","Error");
                    console.log(err);
                });
        }
    }

    isValid() {
        let tempClicked = this.state.isClicked;
        tempClicked.name = true;
        tempClicked.email = true;
        tempClicked.password = true;
        tempClicked.confirmpassword = true;

        this.setState({
            isClicked: tempClicked
        });

        let tempError = this.state.isError;

        if (
            lengthCalculator.lengthWithoutSpaces(this.state.name + " ") < 3 ||
            !validationConstant.textOnlyRegExp.test(this.state.name)
        ) {
            tempError.name = true;
        }
        if (!validationConstant.emailRegExp.test(this.state.email)) {
            tempError.email = true;
        }
        if (lengthCalculator.lengthWithoutSpaces(this.state.password + " ") < 6) {
            tempError.password = true;
        }
        if (
            lengthCalculator.lengthWithoutSpaces(this.state.confirmpassword + " ") <
            6 ||
            this.state.confirmpassword !== this.state.password
        ) {
            tempError.confirmpassword = true;
        }

        if (
            lengthCalculator.lengthWithoutSpaces(this.state.name + " ") >= 3 &&
            validationConstant.textOnlyRegExp.test(this.state.name)
        ) {
            if (validationConstant.emailRegExp.test(this.state.email)) {
                if (
                    lengthCalculator.lengthWithoutSpaces(this.state.password + " ") >= 6
                ) {
                    if (
                        lengthCalculator.lengthWithoutSpaces(
                            this.state.confirmpassword + " "
                        ) >= 6 &&
                        this.state.confirmpassword === this.state.password
                    ) {
                        console.log("name correct");
                        return true;
                    }
                }
            }
        }

        return false;
    }


    render() {
        return (
            <MDBContainer className="w-25 mt-5">
                <MDBCard className="d-flex justify-content-center align-self-center">
                    <MDBCardHeader className="text-center" color="primary-color" tag="h3">
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
                                className={`form-control ${
                                    !this.state.isClicked.name
                                        ? null
                                        : this.state.isError.name
                                        ? "is-invalid"
                                        : "is-valid"
                                    }`}
                                onChange={this.onChangeName}
                                value={this.state.name}
                            />
                            <br/>
                            <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                                Your email
                            </label>
                            <input
                                type="email"
                                id="defaultFormRegisterEmailEx"
                                className={`form-control ${
                                    !this.state.isClicked.email
                                        ? null
                                        : this.state.isError.email
                                        ? "is-invalid"
                                        : "is-valid"
                                    }`}
                                onChange={this.onChangEmail}
                                value={this.state.email}
                            />
                            <br/>
                            <label
                                htmlFor="defaultFormRegisterPasswordEx"
                                className="grey-text"
                            >
                                Your password
                            </label>
                            <input
                                type="password"
                                id="defaultFormRegisterPasswordEx"
                                className={`form-control ${
                                    !this.state.isClicked.password
                                        ? null
                                        : this.state.isError.password
                                        ? "is-invalid"
                                        : "is-valid"
                                    }`}
                                onChange={this.onChanagePassword}
                                value={this.state.password}
                            />
                            <br/>
                            <label
                                htmlFor="defaultFormRegisterPasswordEx"
                                className="grey-text"
                            >
                                Confirm Your password
                            </label>
                            <input
                                type="password"
                                id="defaultFormRegisterPasswordEx"
                                className={`form-control ${
                                    !this.state.isClicked.confirmpassword
                                        ? null
                                        : this.state.isError.confirmpassword
                                        ? "is-invalid"
                                        : "is-valid"
                                    }`}
                                onChange={this.onChanageConfirmPassword}
                                value={this.state.confirmpassword}
                            />

                            <br/>
                            <label
                                htmlFor="defaultFormRegisterPasswordEx"
                                className="grey-text"
                            >
                                Designation
                            </label>
                            <Select name="designation" value={this.state.optionsSearch} options={optionsSearch}
                                    onChange={this.onOptionChange} style={{width: '180px'}}
                                    placeholder={`${this.state.optionsSearch}`}/>


                            <div className="text-center mt-4">
                                <button className=" btn btn-primary  btn-block " type="submit">
                                    <MDBIcon icon="user-plus"/> Register
                                </button>
                            </div>
                        </form>
                        <br/>
                        <p class="text-center font-weight-light">
                            Have an account ?<Link to="/login"> Login From Here</Link>
                        </p>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        );
    }
}

