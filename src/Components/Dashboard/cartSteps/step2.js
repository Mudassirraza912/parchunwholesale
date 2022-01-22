
import React from 'react'
import {View, Text, StyleSheet, Image, ImagePropTypes} from 'react-native'
import {Item, Input} from 'native-base'
import { themeGreen, themeGrey } from '../../../Constant/color'

const user = require('../../../../assets/user.png')
const location = require('../../../../assets/location.png')
const phone = require('../../../../assets/phone.png')

const Step2 = (props) => {
    const {handleOnChange , name, phoneNum, address} = props
    return(
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <View style={styles.itemContainer}>
                    <Item regular style={styles.inputContainer}>
                        <Image source={user} style={styles.imgIcon} />
                        <Input value={name} onChangeText={(text) => handleOnChange('name', text)} placeholder="Enter your name" />
                    </Item>
                </View> 
                <View style={styles.itemContainer}>
                    <Item regular style={styles.inputContainer}>
                        <Image source={phone} style={styles.imgIcon} />
                        <Input value={phoneNum} keyboardType="phone-pad" onChangeText={(text) => handleOnChange('phone', text)} placeholder="Enter your phone number" />
                    </Item>
                </View>  
                <View style={styles.itemContainer}>
                    <Item regular style={styles.inputContainer}>
                        <Image source={location} style={{...styles.imgIcon, top: 5, position:'absolute'}} />
                        <Input value={address} onChangeText={(text) => handleOnChange('address', text)} style={{minHeight: 80, left: 35}} multiline placeholder="Enter your Address" />
                    </Item>
                </View>                 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    itemContainer: {
        padding: 10
    },
    inputContainer: {
        borderColor: themeGreen,
        borderRadius: 5,
        flexDirection: 'row'
    },
    imgIcon: {
        width: 25,
        height: 25,
        marginHorizontal: 5,
        left: 5,
    }
})

export default Step2;