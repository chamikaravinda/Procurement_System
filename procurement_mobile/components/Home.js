import React from "react";
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput
} from "react-native";

import {Table, TableWrapper, Rows,Row, Col, Cell} from 'react-native-table-component';
import axios from "axios";


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            userID: '5d9940f0f5e79c12700b275d',
            tableHead: ['', 'Head1', 'Head2', 'Head3'],
            tableTitle: ['Title', 'Title2', 'Title3', 'Title4','Title', 'Title2', 'Title3', 'Title4','Title4'],
            tableData: [
                ['1', '2', '3'],
                ['a', 'b', 'c'],
                ['1', '2', '3'],
                ['a', 'b', 'c']
            ]
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        fetch("http://192.168.8.101:5001/api/construction/data?RT=31")  //add get all items url here
            .then(response => response.json()
            .then(responseJson => {
                this.setState({tableData: responseJson});
                alert(responseJson);
                console.log(responseJson + "All Orders");

            }).catch(error => {
            console.log(error);
        }))
    };



    render() {
        const state = this.state;
        return (
                <View style={tableStyles.container}>
                    <View style={styles.container}>
                        <Table borderStyle={{borderWidth: 1}}>
                            <Row data={state.tableHead} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={styles.text}/>
                            <TableWrapper style={styles.wrapper}>
                                <Col data={state.tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
                                <Rows data={state.tableData} flexArr={[1, 2, 1, 1,1,1,1,1,1]} style={styles.row} textStyle={styles.text}/>
                            </TableWrapper>
                        </Table>
                    </View>
                </View>

        )
    }
}
const tableStyles = StyleSheet.create({
    container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#ddffcb'},
    head: {paddingLeft: 10, height: 40, backgroundColor: '#61e32d'},
    text: {margin: 6},
    row: {flexDirection: 'row', height: 40, margin: 2},
    btn: {width: 55, height: 20, backgroundColor: '#78B7BB', borderRadius: 2, margin: 2},
    btnText: {textAlign: 'center', color: '#fff'}
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingVertical: 50,
        position: "relative"
    },
    title: {
        fontSize: 20,
        color: "#5bb50f",
        textAlign: "center",
        marginBottom: 10
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    list: {
        paddingVertical: 5,
        margin: 3,
        flexDirection: "row",
        backgroundColor: "#e8ffd5",
        justifyContent: "flex-start",
        alignItems: "center",
        zIndex: -1
    },
    lightText: {
        color: '#000000',
        width: 200,
        paddingLeft: 15,
        fontSize: 12
    },
    line: {
        height: 0.5,
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.5)"
    },
    icon: {
        position: "absolute",
        bottom: 20,
        width: "100%",
        left: 290,
        zIndex: 1
    },
    numberBox: {
        position: "absolute",
        bottom: 75,
        width: 30,
        height: 30,
        borderRadius: 15,
        left: 330,
        zIndex: 3,
        backgroundColor: "#e3e3e3",
        justifyContent: "center",
        alignItems: "center"
    },
    number: {fontSize: 14, color: "#000"},
    selected: {backgroundColor: "#61b53f"},
    modal: {
        width: ((Dimensions.get('window').width) / 5) * 4,
        height: ((Dimensions.get('window').height) / 5) * 3,
        borderWidth: 2,
        borderColor: '#61b53f',
    },
    modalSummery: {
        width: ((Dimensions.get('window').width) / 5) * 4,
        height: ((Dimensions.get('window').height) / 5) * 3,
        borderWidth: 2,
        borderColor: '#61b53f',
    }
})