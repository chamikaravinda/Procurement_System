

import {Text,
    View} from "react-native";
import React,{Component} from 'react';
import SplashScreen from "react-native-splash-screen";


export default class Login extends Component{
    componentDidMount() {
        setTimeout(() => {
            SplashScreen.hide()
        }, 75)
    }

    render() {
        return (
            <View><Text>Hi</Text></View>
        )
    }
}
