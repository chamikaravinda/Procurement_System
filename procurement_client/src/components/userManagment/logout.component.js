import React,{Component} from 'react';

export default class Logout extends Component{
    componentDidMount(){
        console.log("Login outttttttttttttt");
        localStorage.clear();
        window.location.href = '/';
    }
    render(){
        return(
            <div>Log Out</div>
        );
    }
}