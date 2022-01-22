import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList} from 'react-native'
import Header from '../../Constant/Header'
import { themeGreen, themeGrey } from '../../Constant/color';
import moment from 'moment';
import { copyText } from '../../Constant/utils';
import ItemCard from '../../Constant/itemCard';
import RenderTabContent from '../../Constant/itemCardDetails'
const empty = require('../../../assets/empty.png')
const moneyImg = require('../../../assets/money.png')
const phoneImg = require('../../../assets/phone.png')
const user = require('../../../assets/user.png')
const location = require('../../../assets/location.png')
const OrderDetail = (props) => {
    const {data} = props.navigation.state.params

    const date = data.createdAt ? `${moment(data.createdAt.toDate()).format("MMMM Do YYYY, hh:mm:ss a")}` : `${moment(new Date()).format("MMMM Do YYYY, hh:mm:ss a")}`
    return (
        <View style={{flex: 1}}>
            <Header 
                backIcon
                centerHeading="My Orders"
                centerHeadingColor="#fff"
                navigation={props.navigation}
                searchbar
                />
            <View style={{flex: 1 ,paddingHorizontal: 10, width: '100%', marginVertical: 20}}>
                {/* <View style={[styles.row]}>
                    <Text style={[{fontSize: 18, paddingHorizontal: 5, color: themeGrey, fontWeight: 'bold'}]}>
                        OrderId# {data.docKey}
                    </Text>
                    <TouchableOpacity onPress={() => {copyText(data.docKey)}}>
                        <Image source={require('../../../assets/copy.png')} style={styles.imgIcon} />
                    </TouchableOpacity>
                </View> */}
                <View style={[styles.row, {paddingVertical: 10}]}>
                    <Text style={[{fontSize: 18, paddingHorizontal: 5, color: themeGreen, fontWeight: 'bold'}]}>
                        {date}
                    </Text>
                </View>
                <View style={[styles.row, {paddingVertical: 10}]}>
                    <Text style={styles.itemText}>
                        Name: 
                    </Text>
                    <Text style={styles.itemText}>
                        {data.name}
                    </Text>
                </View>
                <View style={[styles.row, {paddingVertical: 10}]}>
                    <Text style={styles.itemText}>
                        Phone Number: 
                    </Text>
                    <Text style={styles.itemText}>
                        {data.phoneNumber}
                    </Text>
                </View>
                <View style={[styles.row, {paddingVertical: 10}]}>
                    <Text style={styles.itemText}>
                        Deliver Address: 
                    </Text>
                    <Text style={styles.itemText}>
                        {data.address}
                    </Text>
                </View>
                <View style={[styles.row, {paddingVertical: 10}]}>
                    <Text style={styles.itemText}>
                        Total Amount:
                    </Text>
                    <Text style={styles.itemText}>
                        Rs: {data.totalAmount}
                    </Text>
                </View>
                {data.appliedPromo && 
                <View style={[styles.row, {paddingVertical: 10, width: "90%"}]}>
                    <Text style={styles.itemText}>
                        Promo:
                    </Text>
                    <Text style={styles.itemText}>
                        {data.appliedPromo[0].freeShipping && 'Free Shipping &'} RS:{data.appliedPromo[0].couponAmount} "{data.appliedPromo[0].couponCode}" promo applied

                    </Text>
                </View>}
                <View style={[styles.row, {paddingVertical: 10}]}>
                    <Text style={styles.itemText}>
                        Status :
                    </Text>
                    <Text style={[{fontSize: 18, paddingHorizontal: 5, color: themeGreen, fontWeight: "bold"}]}>
                        {data.status}
                    </Text>
                </View>

                <View style={[styles.row, {paddingVertical: 10}]}>
                    <Text style={[{fontSize: 18, paddingHorizontal: 5, color: themeGreen, fontWeight: 'bold'}]}>
                        ITEMS: 
                    </Text>
                </View>

                <RenderTabContent
                    horizontal={false}
                    data={data.items} 
                    navigation={props.navigation} 
                    onPress={(id) => {
                        // specificItemData(id)
                    }}
                    showQty
                    isShow={false}
                    quantityEdit={false}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    normatTxt: {
        color:'#75787B',
        marginVertical: 3,
        textAlign:'center'
    },
    boldTxt: {
        marginVertical: 3,
        fontWeight:'bold',
        textAlign:'center'
    },
    itemContiner: {
        padding: 10
    },
    heading: {
        fontSize: 20
    },
    whiteBold: {
        color:'#fff',
        fontWeight:'bold'
    },
    whiteNormal: {
        color:'#fff',
    },
    orderItemContainer: {
        borderColor: themeGreen,
        borderWidth: 2,
        padding: 10,
        margin: 10,
        borderRadius: 10
    },
    row: {
        flexDirection: 'row'
    },
    imgIcon: {
        width: 25,
        height: 25,
        paddingHorizontal: 5,
        // left: 5,
    },
    itemText: {fontSize: 18, paddingHorizontal: 5, color:'#000'}
})

export default OrderDetail