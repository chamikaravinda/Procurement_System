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
    Alert, KeyboardAvoidingView
} from 'react-native'
import {
    SCLAlert,
    SCLAlertButton
} from 'react-native-scl-alert'
import axios from 'axios';

class Signup2 extends Component {
    state = {
        name: '',
        cPassword: '',
        email: '',
        password: '',
        show: false,
        show1: false,
        show2: false,
        show3: false

    };
    handleClose = () => {
        this.setState({show: false});
        this.props.navigation.navigate('First')
    };
    handleClose1 = () => {
        this.setState({show1: false})
    };
    handleClose2 = () => {
        this.setState({show2: false})
    };
    handleName = (text) => {
        this.setState({name: text})
    };
    handlecPassword = (text) => {
        this.setState({cPassword: text})
    };
    handleEmail = (text) => {
        this.setState({email: text})
    };
    handlePassword = (text) => {
        this.setState({password: text})
    };
    back = () => {
        this.props.navigation.navigate('First')
    };
    login = (name, email, password, cPassword) => {
        if (name.length === 0 || cPassword.length === 0 || email.length === 0 || password.length === 0) {
            this.setState({show1: true})
        } else {
            var lastAtPos = email.lastIndexOf('@');
            var lastDotPos = email.lastIndexOf('.');
            if (lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2) {
                // alert("loopinside")
                if (password !== cPassword) {
                    alert("Password mismatch")
                } else {
                    let User = {
                        name: name,
                        password: password,
                        email: email
                    };
                    axios.post('http://192.168.16.95:5001/api/construction/user/add', User)
                        .then(res => {
                            let resData = res.data;
                            if (resData.toString() === "Invalid") {
                                this.props.navigation.navigate('SignUp')
                                this.setState({show2: true});
                            } else {
                                this.setState({show: true})
                            }
                        });


                }
            } else {
                this.setState({show2: true})
            }
            // alert("loop55")
        }
    };

    render() {
        return (
            <ImageBackground source={require('../../assets/upbkg.jpg')} style={styles.Background}
                             resizeMode={'stretch'}>

                <View style={styles.View}>
                    <Text style={styles.q}>Create Your Profile</Text>
                    <View style={{paddingTop: 80}}>
                        <TextInput style={styles.input}
                                   placeholder='Name'
                                   placeholderTextColor="#fff2f9"
                                   autoCapitalize="none"
                                   onChangeText={this.handleName}
                                   clearButtonMode='always'
                        />
                    </View>
                    <View style={{paddingTop: 7}}>
                        <TextInput style={styles.input}
                                   placeholder='Email'
                                   placeholderTextColor="#fff2f9"
                                   autoCapitalize="none"
                                   onChangeText={this.handleEmail}/>
                    </View>
                    <View style={{paddingTop: 7}}>
                        <TextInput style={styles.input}
                                   placeholder='Password'
                                   placeholderTextColor="#fff2f9"
                                   autoCapitalize="none"
                                   onChangeText={this.handlePassword}/>
                    </View>
                    <View style={{paddingTop: 7}}>
                        <TextInput style={styles.input}
                                   placeholder='Confirm Password'
                                   placeholderTextColor="#fff2f9"
                                   autoCapitalize="none"
                                   onChangeText={this.handlecPassword}/>
                    </View>
                </View>
                <View style={{flexDirection: "row", paddingLeft: 60, paddingTop: 500,}}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={
                            () => this.back()
                        }>
                        <Text style={styles.backButtonText}>BACK</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={
                            () => this.login(this.state.name, this.state.email, this.state.password, this.state.cPassword)
                        }>
                        <Text style={styles.submitButtonText}> REGISTER </Text>
                    </TouchableOpacity>
                    <SCLAlert
                        theme="success"
                        show={this.state.show}
                        title="Welcome to procurement Master"
                        subtitle="Yaay ! Please Login to continue!"
                    ><SCLAlertButton theme="success" onPress={this.handleClose}>Proceed</SCLAlertButton></SCLAlert>
                    <SCLAlert
                        theme="danger"
                        show={this.state.show1}
                        title="Fill all the fields "
                        subtitle="You have to fill all the fields"
                    ><SCLAlertButton theme="danger" onPress={this.handleClose1}>OK</SCLAlertButton></SCLAlert>
                    <SCLAlert
                        theme="danger"
                        show={this.state.show2}
                        title="Email is not valid "
                        subtitle="You have to enter a valid email address "
                    ><SCLAlertButton theme="danger" onPress={this.handleClose2}>OK</SCLAlertButton></SCLAlert>
                </View>

            </ImageBackground>
        )
    }
}

export default Signup2

const styles = StyleSheet.create({
    container: {
        paddingTop: 2
    },
    q1: {
        marginLeft: 55,
        marginTop: 40,
        fontWeight: 'bold',
        fontSize: 14,
        color: "#f8102e"
    },
    q2: {
        marginTop: 40,
        marginLeft: 20,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        fontSize: 17,
        textDecorationLine: 'underline',
        color: "#ffffff"
    },
    textBox: {
        margin: 3,
        height: 40,
        // backgroundColor : '#4c50ff',
        color: '#00b489',
        borderWidth: 1,
        borderColor: '#3e7dff'
    },
    textStyle: {
        margin: 24,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left',
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
        margin: 4,
        height: 40,
        // backgroundColor : '#4c50ff',
        color: '#00b489',
        borderWidth: 1,
        borderColor: '#3e7dff'
    },
    input: {
        marginLeft: 12,
        marginRight: 12,
        paddingTop: 2,
        textAlign: 'left',
        // paddingTop: -30,
        height: 40,
        backgroundColor: 'transparent',
        color: "#ffffff",
        borderWidth: 1,
        borderColor: '#3e7dff',
        opacity: 0.8
    },
    View: {
        position: 'absolute',
        backgroundColor: 'black',
        opacity: 0.5,
        width: (Dimensions.get('window').width / 4) * 3,
        height: 440,
        borderColor: '#ffffff',
        borderRadius: 8,
        borderWidth: 0.5,
        marginTop: 150,
        marginLeft: (Dimensions.get('window').width / 4) - (Dimensions.get('window').width / 8)
    },
    ResultContainer: {
        marginTop: 5,
        backgroundColor: 'grey',
        opacity: 0.7,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'white'
    },
    ResultTextImp: {
        marginLeft: 10,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    ResultTextNormal: {
        marginLeft: 10,
        color: 'white',
        fontSize: 18
    },
    backButton: {

        borderRadius: 8,
        backgroundColor: 'transparent',
        paddingTop: 5,
        paddingLeft: 15,
        opacity: 5.0,
        borderColor: 'red',
        width: 70,

        borderWidth: 0.5,
        height: 35,
        textAlign: 'center',
    },
    backButtonText: {
        color: 'red',
        paddingLeft: -55,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        fontSize: 16,
        width: 100
    },
    backButtonView: {
        paddingTop: -50
    },
    submitButton: {
        borderWidth: 0.5,
        borderRadius: 8,
        backgroundColor: '#7BA6EF',
        marginLeft: 100,
        paddingTop: 8,
        width: 70,
        height: 35,
        textAlign: 'center',
    },
    submitButtonText: {
        color: 'white',
        paddingTop: -50,
        textAlign: 'center',
    },
    Icon: {
        flexDirection: 'column',
        alignItems: 'center',

        // borderWidth: 0.5,
        height: 120,
        width: 120,
        borderRadius: 5,
        marginLeft: 125,
        marginTop: 10
    },
    IconStyle: {
        padding: 10,
        height: '85%',
        width: '65%',
        resizeMode: 'stretch',
    },
    SignIcon: {
        flexDirection: 'column',
        alignItems: 'center',

        // borderWidth: 0.5,
        height: 100,
        width: 100,
        borderRadius: 5,
        marginLeft: 125,
        marginTop: -20
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
    q: {
        paddingTop: 3,
        paddingLeft: 10,
        fontWeight: 'bold',
        fontSize: 25,
        fontFamily: 'sans-serif',
        color: "#ffffff"
    },
});
