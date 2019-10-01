import HomeScreen from "./Home";
import SettingsScreen from "./Login";
import React, {Component} from "react";
import {SafeAreaView,Text,FlatList} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import {createMaterialTopTabNavigator} from 'react-navigation';
import OrderWindow from './order/OrderWindow';


export default class Dashboard extends Component {

    render() {
        console.disableYellowBox = true;
        return (
            <SafeAreaView style={{flex: 6}}>
               <TopTabNavigator/>
            </SafeAreaView>
        )
    }

};


const TopTabNavigator = createMaterialTopTabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({tintColor}) => (<Icon name="ios-home" color={tintColor} size={18}/>)
            }
        },
        Settings: {
            screen: SettingsScreen,
            navigationOptions: {
                tabBarLabel: 'Profile',
                tabBarIcon: ({tintColor}) => (<Icon name="ios-person" color={tintColor} size={18}/>)
            }
        },
        Profile: {
            screen: OrderWindow,
            navigationOptions: {
                tabBarLabel: 'Order',
                tabBarIcon: ({tintColor}) => (<Icon name="md-add-circle" color={tintColor} size={18}/>)
            }
        },
        Order: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarLabel: 'My Orders',
                tabBarIcon: ({tintColor}) => (<Icon name="ios-book" color={tintColor} size={18}/>)
            }
        },

    }
    , {
        initialRouteName: 'Settings',
        tabBarPosition: 'bottom',
        tabBarOptions: {
            showLabel: false,
            activeTintColor: 'grey',
            style: {
                backgroundColor: '#61b53f'
            },
            showIcon: true,
        },

    });
