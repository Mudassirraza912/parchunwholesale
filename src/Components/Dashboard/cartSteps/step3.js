import React, { useState } from 'react'
import {View, Text, Image, TouchableOpacity, Alert, Pressable} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { useDispatch, useSelector } from 'react-redux'
import { themeGreen } from '../../../Constant/color'
import { applyPromo } from '../../../Redux/Actions/cartActions'
import { styles } from '../styles'

const moneyImg = require('../../../../assets/money.png')
const phoneImg = require('../../../../assets/phone.png')
const user = require('../../../../assets/user.png')
const location = require('../../../../assets/location.png')


const Step3 = ({ name, phone, address, totalAmount} ) => {



   
    const appliedPromo = useSelector((state) => state.cart.appliedPromo)

    return(
        <View style={{ alignItems: 'center', flex: 1 }}>
            <ScrollView>
                <View style={[styles.shadowBox,]}>
                    <View style={{width: widthPercentageToDP(90) , borderRadius: 10}}>
                        <View style={[styles.row, styles.spaceBtw, styles.itemContainer]}>
                            <View style={styles.row}>
                                <Image source={user} style={styles.imgIcon} />
                                <Text style={[styles.themeGreenBold, {fontSize: 18, paddingHorizontal: 5}]}>
                                    Name
                                </Text>
                            </View>
                            <Text style={styles.regularTxT}>
                                {name}
                            </Text>
                        </View>
                        <View style={[styles.row, styles.spaceBtw, styles.itemContainer]}>
                            <View style={styles.row}>
                                <Image source={phoneImg} style={styles.imgIcon} />
                                <Text style={[styles.themeGreenBold, {fontSize: 18, paddingHorizontal: 5}]}>
                                    Ph. Number
                                </Text>
                            </View>
                            <Text style={styles.regularTxT}>
                                {phone}
                            </Text>
                        </View>
                        <View style={[styles.row, styles.spaceBtw, styles.itemContainer]}>
                            <View style={styles.row}>
                                <Image source={location} style={styles.imgIcon} />
                                <Text style={[styles.themeGreenBold, {fontSize: 18, paddingHorizontal: 5}]}>
                                    Address
                                </Text>
                            </View>
                            <Text style={[styles.regularTxT, {width: widthPercentageToDP(50), textAlign:'right'}]}>
                                {address}
                            </Text>
                        </View>
                        <View style={[styles.row, styles.spaceBtw, styles.itemContainer]}>
                            <View style={styles.row}>
                                <Image source={moneyImg} style={styles.imgIcon} />
                                <Text style={[styles.themeGreenBold, {fontSize: 18, paddingHorizontal: 5}]}>
                                    Total Amount
                                </Text>
                            </View>
                            <Text style={styles.regularTxT}>
                               Rs: {totalAmount > 2000 ? totalAmount : totalAmount + 45}
                            </Text>
                        </View>

                        
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}


export default Step3;