import React, {Component} from 'react';
import {FlatList, ActivityIndicator, View, ImageBackground, Dimensions, SafeAreaView} from 'react-native';
import SignIn from '../procurement_mobile/components/User/Sign_In_Component'
import {createStackNavigator,TransitionConfiguration} from 'react-navigation-stack';
import DashBoard from '../procurement_mobile/components/Dashboard'
import SignUp from './components/User/Sign_Up'
import { fromLeft,fadeIn,fromRight } from 'react-navigation-transitions';

class App extends Component {

    render() {
        console.disableYellowBox = true;
        return (
            <SafeAreaView style={{flex: 6}}>
                <createStackNavigator/>
            </SafeAreaView>
        )
    }

};

export default App = createStackNavigator(
    {
        First: {
            screen: SignIn,
            navigationOptions: {
                header: null,
            }
        },
        Second: {
            screen: DashBoard,
            navigationOptions: {
                header: null,
            }
        },
        SignUp: {
            screen: SignUp,
            navigationOptions: {
                header: null,
            }
        },
    },{
        initialRouteName: 'First',
        transitionConfig: () => fromRight(200),


    })
const styles = {
    Background: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },

};



