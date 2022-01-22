import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Header from '../../Constant/Header';
import { CustomBtn } from '../../Constant/Button'
import LinearGradient from 'react-native-linear-gradient';
import { themeGreen, themeGrey } from '../../Constant/color';
import moment from 'moment';
import { copyText } from '../../Constant/utils';

const empty = require('../../../assets/empty.png')
const moneyImg = require('../../../assets/money.png')
const phoneImg = require('../../../assets/phone.png')
const user = require('../../../assets/user.png')
const location = require('../../../assets/location.png')

const Orders = (props) => {
    const { orders } = props
    return( 
        <View>
            <Header 
                backIcon
                centerHeading="My Orders"
                centerHeadingColor="#fff"
                navigation={props.navigation}
                searchbar
                />

            <ScrollView contentContainerStyle={{paddingBottom: 130}}>
                {(orders && orders.length > 0) ?
                    <>
                    {orders.map((value, index) => {
                        const date = value.createdAt ? `${moment(value.createdAt.toDate()).format("MMMM Do YYYY, hh:mm:ss a")}` : `${moment(new Date()).format("MMMM Do YYYY, hh:mm:ss a")}`
                        return(
                            <TouchableOpacity onPress={() => {props.navigation.navigate('OrderDetail', {data: value})}} key={index} style={styles.orderItemContainer}>
                                <View style={[styles.row, {paddingVertical: 10}]}>
                                    <Text style={[{fontSize: 18, paddingHorizontal: 5, color: themeGrey}]}>
                                        OrderId# {value.docKey}
                                    </Text>
                                    <TouchableOpacity onPress={() => {copyText(value.docKey)}}>
                                        <Image source={require('../../../assets/copy.png')} style={styles.imgIcon} />
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.row, {paddingVertical: 10}]}>
                                    <Text style={[{fontSize: 18, paddingHorizontal: 5, color: themeGreen, fontWeight: 'bold'}]}>
                                        {date}
                                    </Text>
                                </View>
                               <View style={[styles.row, {paddingVertical: 10}]}>
                                    <Image source={user} style={styles.imgIcon} />
                                    <Text style={styles.itemText}>
                                        {value.name}
                                    </Text>
                                </View>
                                <View style={[styles.row, {paddingVertical: 10}]}>
                                    <Image source={phoneImg} style={styles.imgIcon} />
                                    <Text style={styles.itemText}>
                                        {value.phoneNumber}
                                    </Text>
                                </View>
                                <View style={[styles.row, {paddingVertical: 10}]}>
                                    <Image source={location} style={styles.imgIcon} />
                                    <Text style={styles.itemText}>
                                        {value.address}
                                    </Text>
                                </View>
                                <View style={[styles.row, {paddingVertical: 10}]}>
                                    <Image source={moneyImg} style={styles.imgIcon} />
                                    <Text style={styles.itemText}>
                                        Rs: {value.totalAmount}
                                    </Text>
                                </View>
                                <View style={[styles.row, {paddingVertical: 10}]}>
                                    <Text style={styles.itemText}>
                                        Status :
                                    </Text>
                                    <Text style={[{fontSize: 18, paddingHorizontal: 5, color: themeGreen, fontWeight: "bold"}]}>
                                        {value.status}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                    </>
                :    
                <View style={styles.container}>
                    <View style={{alignItems:'center', justifyContent:'center'}}>
                        <Image source={empty} />
                    </View>
                    
                    <View style={styles.itemContiner}>
                        <Text style={[styles.boldTxt, styles.heading]}>
                          Order List is empty
                        </Text>
                    </View>
                    <View style={styles.itemContiner}>
                        <Text style={[styles.normatTxt, styles.heading]}>
                          There is no orders in your order list.
                        </Text>
                    </View>

                    <CustomBtn style={{alignSelf: 'center'}} onPress={() => {props.navigation.navigate("Dashboard")}} width={90} title={'START SHOPPING'} />
                </View>
           }
           </ScrollView>
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

const mapStateToProps = state => {
	return {
        userDetails: state.user.userDetails,
        orders: state.user.orders,
        fetching: state.user.fetching,
	};
  };
  
  const mapDispatchToProps = {
  };

export default connect(mapStateToProps, mapDispatchToProps)(Orders);