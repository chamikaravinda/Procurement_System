import SplashScreen from "react-native-splash-screen";
import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Picker,
    StyleSheet,
    ImageBackground,
    FlatList,
    ActivityIndicator,
    Dimensions,
    Button,
    Image,
    Alert,
    KeyboardAvoidingView
} from 'react-native'
import {AsyncStorage} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import axios from 'axios';
import {
    SCLAlert,
    SCLAlertButton
} from 'react-native-scl-alert'


export default class Login extends Component {

    componentDidMount() {
        setTimeout(() => {
            SplashScreen.hide()
        }, 75)
    }

    constructor(props) {
        super(props);
        this.state = {
            Password: '',
            Email: '',
            type: '',
            show: false,
            show1: false,
            show2: false,
            loading: false,
        };
        this.login = this.login.bind(this);
    }

    handleClose = () => {
        this.setState({show: false})
    };
    handleClose1 = () => {
        this.setState({show1: false})
    };
    handlePassword = (text) => {
        this.setState({Password: text})
    };
    handleEmail = (text) => {
        this.setState({Email: text})
    };
    signUpButton = () => {
        this.props.navigation.navigate('SignUp')
    };


    login = (password, email) => {
        if (password.length === 0 || email.length === 0) {
            this.setState({show: true})
        } else {
            this.setState({loading: true});
            let User = {
                email: email,
                password: password
            };
            axios.post('http://192.168.8.101:5001/api/construction/user/get', User)
                .then(res => {
                    let resData = res;
                    if (res.data === "No User Found") {
                        this.setState({loading: false});
                        this.setState({show1: true});
                    } else if (res.data === "Invalid Password") {
                        this.setState({loading: false});
                        this.setState({show1: true});

                    } else {
                        this.setState({loading: false});
                        this.props.navigation.navigate('Second');
                        AsyncStorage.multiSet([
                            ['name', res.data.firstName],
                            ['userType', res.data.type],
                            ['id', res.data.id]
                        ]);

                    }
                    this.setState({loading: false});

                });
        }
    };

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="yellow"/>
                </View>
            );
        };
        return (
            <KeyboardAvoidingView style={styles.Background}>
                <ImageBackground source={require('../../assets/download.jpg')} style={styles.Background}
                                 resizeMode={'stretch'}>
                    <View>
                        {/*<TouchableOpacity style={styles.Icon} activeOpacity={0.5}>*/}
                        {/*    <Image*/}
                        {/*        source={require('../../assets/ic_launcher_round.png')}*/}
                        {/*        //Image Style*/}
                        {/*        style={styles.IconStyle}*/}
                        {/*    />*/}

                        {/*</TouchableOpacity>*/}
                    </View>
                    <View>
                        <TouchableOpacity style={styles.SignIcon} activeOpacity={0.5}>
                            <Text style={styles.q}>Hi!</Text>

                        </TouchableOpacity>
                    </View>

                    <View style={styles.viewForm}>
                        <TextInput style={styles.input}
                                   underlineColorAndroid="transparent"
                                   placeholder="Email"
                                   placeholderTextColor="#61b53f"
                                   autoCapitalize="none"
                                   onChangeText={this.handleEmail}
                                   clearButtonMode='always'
                        />
                        <TextInput style={styles.input}
                                   underlineColorAndroid="transparent"
                                   placeholder="Password"
                                   placeholderTextColor="#61b53f"
                                   autoCapitalize="none"
                                   onChangeText={this.handlePassword}
                                   clearButtonMode='always'
                                   secureTextEntry={true}
                        />

                    </View>
                    <View style={{flexDirection: "row", paddingLeft: 50, paddingTop: 250,}}>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={
                                () => this.login(this.state.Password, this.state.Email)
                            }>
                            <Text style={styles.submitButtonText}> Login </Text>
                        </TouchableOpacity>
                        <SCLAlert
                            theme="danger"
                            show={this.state.show}
                            title="Login fields are empty"
                            subtitle="Ha! Ha! you forgot to enter your credentials"
                        ><SCLAlertButton theme="danger" onPress={this.handleClose}>OK</SCLAlertButton></SCLAlert>
                        <SCLAlert
                            theme="danger"
                            show={this.state.show1}
                            title="Invalid login Details"
                            subtitle="mm ! Can't find your profile! Try Again"
                        ><SCLAlertButton theme="danger" onPress={this.handleClose1}>OK</SCLAlertButton></SCLAlert>
                    </View>
                    <View style={{flexDirection: 'row', paddingTop: -530,}}>
                        <Text style={styles.signUpQuote}>Create Account</Text>
                        <View style={{flexDirection: 'row', paddingTop: 35, marginLeft: -85}}>
                            <TouchableOpacity
                                style={styles.registerButton}
                                onPress={
                                    () => this.signUpButton()
                                }>
                                <Text style={styles.submitButtonText}> Sign Up </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 220
    },
    q: {

        fontWeight: 'bold',
        fontSize: 40,
        fontFamily: 'sans-serif',
        color: "#ffffff"
    },
    signUpQuote: {
        marginLeft: 70,
        marginTop: 40,
        fontWeight: 'bold',
        fontSize: 16,
        color: "#00791f"
    },
    q2: {
        marginTop: 40,
        marginLeft: 20,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        fontSize: 17,
        textDecorationLine: 'underline',
        color: "#fff2f9"
    },
    viewForm: {
        position: 'absolute',
        backgroundColor: '#ffffff',
        width: (Dimensions.get('window').width / 4) * 3,
        height: 320,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#61b53f',
        marginTop: 200,
        marginLeft: (Dimensions.get('window').width / 4) - (Dimensions.get('window').width / 8)
    },
    textStyle: {
        margin: 24,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    viewinput: {
        margin: 15,
        height: 40,
        backgroundColor: 'transparent',
        color: '#00b489',
        borderWidth: 1,
        borderColor: '#3e7dff'
    },
    pickerInput: {
        margin: 3,
        height: 40,
        // backgroundColor : '#4c50ff',
        color: "#fff2f9",
        borderWidth: 1,
        borderColor: '#3e7dff'
    },
    input: {
        margin: 18,
        height: 40,
        backgroundColor: 'transparent',
        color: "#61b53f",
        borderWidth: 1,
        borderColor: '#62a23a'
    },
    registerButton: {
        borderWidth: 0.5,
        borderRadius: 8,
        backgroundColor: 'transparent',
        marginLeft: 118,
        paddingTop: 5,
        width: 70,
        height: 35,
        textAlign: 'center',
        borderColor : '#62a23a'
    },
    submitButton: {
        borderWidth: 0.5,
        borderRadius: 8,
        backgroundColor: 'white',
        marginLeft: 90,
        paddingTop: 5,
        width: 70,
        height: 35,
        textAlign: 'center',
        borderColor : '#62a23a'
    },
    submitButtonText: {
        color: '#61b53f',
        textAlign: 'center',
    },
    Icon: {
        flexDirection: 'column',
        alignItems: 'center',

        // borderWidth: 0.5,
        height: 120,
        width: 110,
        borderRadius: 5,
        marginLeft: 125,
        marginTop: 25
    },
    IconStyle: {
        padding: 10,
        height: '85%',
        width: '95%',
        resizeMode: 'stretch',
    },
    SignIcon: {
        flexDirection: 'column',
        alignItems: 'center',

        // borderWidth: 0.5,
        height: 100,
        width: 140,
        borderRadius: 5,
        marginLeft: 110,
        marginTop: 5
    },
    ImageIconStyle: {
        padding: 10,
        height: 60,
        width: 170,
        resizeMode: 'stretch',
    },
    Background: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
});

