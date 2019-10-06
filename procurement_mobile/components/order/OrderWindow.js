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
import {Icon, Input} from "react-native-elements";
import Modal, {ModalContent} from 'react-native-modals';
import {Alert} from 'react-native';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import axios from "axios";
import {AsyncStorage} from 'react-native';

export default class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dataSource: [],
            visible: false,
            tableHead: ['Items', 'Qty', 'Confirm'],
            selectedArray: [],
            disableShopBtn: true,
            commonQty: '',
            Qtyvalue: '',
            orderItemsList: [],
            visibleOrderSummery: false,
            userID: '5d9940f0f5e79c12700b275d',
        };
    }

    _alertIndex(itemName) {
        Alert.alert('Confirm Order',
            "You Ordered " + itemName + " " + this.state.commonQty,
            [
                {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
                {text: 'YES', onPress: () => this.addToOrderList(itemName, this.state.commonQty)},
            ]);
    }

    _closeOrderWindow() {
        this.setState({visible: false});
        this.state = {
            dataSource: [],
            selectedArray: [],
            disableShopBtn: true,
            commonQty: '0',
        };
        this.setState({visibleOrderSummery: true});
    }

    _refreshOrderWindow() {
        console.log("Going to update update");
        this.setState({visible: false});
        this.state = {
            loading: false,
            dataSource: [],
            tableHead: ['Items', 'Qty', 'Confirm'],
            selectedArray: [],
            disableShopBtn: true,
            commonQty: '0',
        };

        this.fetchData();
        this.setState({visibleOrderSummery: true});
    }

    _sendOrderRequest() {
        this.setState({loading: true});
        console.log(this.state.orderItemsList+"Came here to the send request");
        let empId1;
        AsyncStorage.multiGet(['id']).then((data) => {
            this.setState({userID : data[0][1] });
            console.log(data[0][1]);
        });
        var OrderRequestMapper = {
            orderList1: this.state.orderItemsList,
            empId1 : this.state.userID,
        };

        console.log(OrderRequestMapper.orderList1+""+OrderRequestMapper.empId1+"Sent order");
        axios.post('http://192.168.8.101:5001/api/construction/order/add', OrderRequestMapper)
            .then(res => {
                let resData = res;
            }).catch(err => {
            console.log(err);
        });
        this.setState({loading: false});
        this.setState({orderItemsList: []});
        this.setState({visibleOrderSummery: false});
    }


    addToOrderList = (itemName, qty) => {
        var tempOrderList = this.state.orderItemsList;
        tempOrderList.push([itemName, qty]);
        console.log(tempOrderList);
        this.setState({orderItemsList: tempOrderList});
        console.log("Order Items  List :" + this.state.orderItemsList);
        this.setState({commonQty: '0'});
        var selectedList = this.state.selectedArray;
        selectedList = selectedList.filter(item => item[0] !== itemName);
        this.setState({selectedArray: selectedList});
        if (this.state.selectedArray.length === 0) {
            this._refreshOrderWindow();
            this.setState({visible: false});

        }
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        this.setState({loading: true});

        fetch("http://192.168.8.101:5001/api/construction/data?RT=27")  //add get all items url here
            .then(response => response.json())
            .then(responseJson => {
                responseJson = responseJson.map(item => {
                    item.isSelect = false;
                    item.selectedClass = styles.list;

                    return item;
                });
                this.setState({
                    loading: false,
                    dataSource: responseJson,
                });
            }).catch(error => {
            this.setState({loading: false});
        });
    };

    FlatListItemSeparator = () => <View style={styles.line}/>;


    changeQty = qty => {
        console.log(qty);
        this.setState({commonQty: qty});
    };

    selectItem = data => {
        data.item.isSelect = !data.item.isSelect;
        if (data.item.isSelect) {
            this.setState({disableShopBtn: false});
            data.item.selectedClass = styles.selected;
            var selectedList = this.state.selectedArray;
            console.log(data.item);
            selectedList.push([data.item.itemName, this.qtyInputField(), this.getCommonSubmitButton(data.item.itemName)]);
            this.setState({selectedArray: selectedList});
        } else {
            data.item.selectedClass = styles.list;
            var selectedList = this.state.selectedArray;
            selectedList.pop([data.item.itemName, this.qtyInputField(), this.getCommonSubmitButton()]);
            this.setState({selectedArray: selectedList});
            if (this.state.selectedArray.length === 0) {
                this.setState({disableShopBtn: true});
            }
        }
        const index = this.state.dataSource.findIndex(
            item => data.item._id === item._id
        );

        this.state.dataSource[index] = data.item;

        this.setState({
            dataSource: this.state.dataSource,
        });
    };

    showOrderQuote = () => this.setState({visible: !this.state.visible});

    goToStore = () => this.props.navigation.navigate("Expenses",
        {selected: this.state.selected,});

    renderItem = data =>
        <TouchableOpacity
            style={[styles.list, data.item.selectedClass]}
            onPress={() => this.selectItem(data)}
        >
            <Text
                style={styles.lightText}>  {data.item.itemName.charAt(0).toUpperCase() + data.item.itemName.slice(1)}  </Text>
        </TouchableOpacity>

    qtyInputField = () =>
        <TextInput style={{
            backgroundColor: 'transparent',
            borderColor: '#00b489',
            borderWidth: 1,
            height: 40,
        }}
                   onChangeText={this.changeQty}
                   defaultValue={this.state.Qtyvalue}

        />

    getCommonSubmitButton = (itemName) =>
        <TouchableOpacity onPress={() => this._alertIndex(itemName)}>
            <View style={tableStyles.btn}>
                <Text style={tableStyles.btnText}>Order</Text>
            </View>
        </TouchableOpacity>

    render() {
        const itemNumber = this.state.dataSource.filter(item => item.isSelect).length;
        if (this.state.loading) {
            return (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="purple"/>
                </View>
            );
        }

        const state = this.state;
        const element = (data, index) => (
            <TouchableOpacity onPress={() => this._alertIndex(index)}>
                <View style={tableStyles.btn}>
                    <Text style={tableStyles.btnText}>button</Text>
                </View>
            </TouchableOpacity>
        );


        return (
            <View style={styles.container}>
                <Text style={styles.title}>Materials available</Text>
                <FlatList
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={item => this.renderItem(item)}
                    keyExtractor={item => item._id.toString()}
                    extraData={this.state}
                />

                <View style={styles.numberBox}>
                    <Text style={styles.number}>{itemNumber}</Text>
                </View>

                <TouchableOpacity style={styles.icon}>
                    <View>
                        <Icon
                            raised
                            name="shopping-cart"
                            type="font-awesome"
                            color="#5bb50f"
                            size={30}
                            paddingRight={10}
                            disabled={this.state.disableShopBtn}
                            onPress={this.showOrderQuote}
                        />
                    </View>
                </TouchableOpacity>
                <Modal
                    visible={this.state.visible}
                    onTouchOutside={() => {
                        this.setState({visible: false});
                    }}
                >
                    <ModalContent>
                        <View style={styles.modal}>
                            <View style={tableStyles.container}>
                                <Table borderStyle={{borderColor: 'transparent'}}>
                                    <Row data={state.tableHead} style={tableStyles.head} textStyle={styles.text}/>
                                    {state.selectedArray.map((rowData, index) => (
                                        <TableWrapper key={index} style={tableStyles.row}>
                                            {
                                                rowData.map((cellData, cellIndex) => (
                                                    <Cell key={cellIndex}
                                                          data={cellIndex === 3 ? element(cellData, index) : cellData}
                                                          textStyle={tableStyles.text}/>
                                                ))
                                            }
                                        </TableWrapper>
                                    ))
                                    }
                                </Table>
                            </View>
                            <TouchableOpacity onPress={() => this._closeOrderWindow()}>
                                <View style={tableStyles.btn}>
                                    <Text style={tableStyles.btnText}>Finish</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ModalContent>
                </Modal>
                <Modal
                    visible={this.state.visibleOrderSummery}
                    onTouchOutside={() => {
                        this.setState({visibleOrderSummery: false});
                    }}
                >
                    <ModalContent>
                        <View style={styles.modalSummery}>
                            <View style={tableStyles.container}>
                                <Table borderStyle={{borderColor: 'transparent'}}>
                                    <Row data={["Item", "Qty."]} style={tableStyles.head} textStyle={styles.text}/>
                                    {state.orderItemsList.map((rowData, index) => (
                                        <TableWrapper key={index} style={tableStyles.row}>
                                            {
                                                rowData.map((cellData, cellIndex) => (
                                                    <Cell key={cellIndex}
                                                          data={cellIndex === 3 ? element(cellData, index) : cellData}
                                                          textStyle={tableStyles.text}/>
                                                ))
                                            }
                                        </TableWrapper>
                                    ))
                                    }
                                </Table>
                            </View>
                            <TouchableOpacity onPress={() => this._sendOrderRequest()}>
                                <View style={tableStyles.btn}>
                                    <Text style={tableStyles.btnText}>Confirm</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ModalContent>
                </Modal>
            </View>

        );
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