import React, { useState } from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { connect, useDispatch, useSelector } from 'react-redux'
import { themeGreen } from '../../../Constant/color'
import RenderTabContent from '../../../Constant/itemCardDetails'
import { applyPromo, removePromo } from '../../../Redux/Actions/cartActions'
import { specificItemData } from '../../../Redux/Actions/userAction'
const item = require('../../../../assets/item.png')
const Step1 = (props) => {
    const { cartItems, specificItemData, totalAmount } = props

    const [ promoCode ,setPromoCode] = useState('')
    const [ havePromo ,setHavePromo] = useState(false)

    const dispatch = useDispatch()

    const appliedPromo = useSelector((state) => state.cart.appliedPromo)

    const applyPromoCode = () => {
       if(promoCode) {
        dispatch(applyPromo(promoCode, totalAmount))
       }else {
           Alert.alert('Alert', 'Please enter promo code!')
       }
    }
    
    // total amount
   
    if (cartItems) {
        return(
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <RenderTabContent
                        data={cartItems} 
                        navigation={props.navigation} 
                        onPress={(id) => {
                            // specificItemData(id)
                        }}
                        deleteIcon
                        showQty
                        isShow={false}
                        />
                </View>
    
                <View style={styles.itemContainer}>
                    <View style={[styles.container, styles.rowStyle, styles.spacebtw, styles.itemContainer]}>
                        <Text>
                            Sub Total
                        </Text>
                        <Text>
                            Rs {((appliedPromo && appliedPromo[0]?.freeShipping) || (totalAmount > 2000)) ? totalAmount : (totalAmount - 45)}
                        </Text>
                    </View>
                    <View style={[styles.container, styles.rowStyle, styles.spacebtw, styles.itemContainer]}>
                        <Text>
                            Delivery Charges
                        </Text>
                        {(appliedPromo && appliedPromo[0]?.freeShipping) ? 
                        <Text>
                            Rs 0
                        </Text> :
                        <Text>
                            Rs {totalAmount > 2000 ? 0 : 45}
                        </Text>}
                    </View>
                    <View style={[styles.container, styles.rowStyle, styles.spacebtw, styles.itemContainer]}>
                        <Text style={styles.boldTxt}>
                            Total Amount
                        </Text>
                        <Text style={styles.boldTxt}>
                            Rs {totalAmount}
                            {/* {totalAmount > 2000 ? totalAmount : totalAmount + 45} */}
                        </Text>
                    </View>

                    {havePromo || appliedPromo ?
                        <>
                        {!appliedPromo ?
                        <View>
                            <Text style={[styles.regularBold, {fontSize: 18, paddingHorizontal: 5}]}>
                                    Promo Code
                            </Text>
                            <View style={styles.promoContainer}>
                                <TextInput value={promoCode} style={{width: '85%'}} onChangeText={(e) => setPromoCode(e)} placeholder="Enter Promo code" />
                                <TouchableOpacity
                                    onPress={() => applyPromoCode()}
                                > 
                                    <Text>
                                        Apply
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View> :
                        <View>
                            <Text style={styles.itemText}>
                                {appliedPromo[0].freeShipping && 'Free Shipping &'} RS:{appliedPromo[0].couponAmount} "{appliedPromo[0].couponCode}" promo applied
                            </Text> 

                            <Pressable
                                style={{
                                    alignSelf: 'center',
                                    marginVertical: 5,
                                    borderRadius: 5,
                                    borderColor: themeGreen,
                                    borderWidth: 1
                                }}
                                onPress={() => dispatch(removePromo())}
                            >
                                <Text style={{color: themeGreen, fontWeight: 'bold', paddingHorizontal: 10, fontSize: 18, }}>
                                    Remove Promo
                                </Text>
                            </Pressable>
                        </View>
                        }
                        </>
                        :
                        <>
                            <Pressable
                                onPress={() => setHavePromo(!havePromo)}
                            >
                                <Text style={{color: themeGreen, fontWeight: 'bold', paddingHorizontal: 10, fontSize: 18, }}>
                                    Hava a promo?
                                </Text>
                            </Pressable>
                        </>}
                </View>
    
    
            </View>
        )
    }else {
        props.navigation.navigate('Cart')
        return (
            <View />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    itemContainer: {
        paddingVertical: 15,
        // paddingHorizontal: 10
    },
    rowStyle: {
        flexDirection:'row'
    },
    spacebtw:{
        justifyContent:'space-between',
        paddingHorizontal: 10
    },
    spaceAround: {
        justifyContent:'space-around'
    },
    semiBoldTxt: {
        fontWeight: '900',
        paddingVertical: 5,
        letterSpacing: 1
    },
    boldTxt: {
        fontWeight:'bold',
        paddingVertical: 5,
        letterSpacing: 1,
    },
    regularBold: {
        fontFamily: 'Nunito-Bold'
    },
    promoContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', borderColor: '#efefef', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, margin: 10 },
     itemText: {fontSize: 18, paddingHorizontal: 10, color:'#000', textAlign: 'center'}
})


const mapStateToProps = state => {
	return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
        cartItems: state.cart.cartItems
	};
  };
  
  const mapDispatchToProps = {
    specificItemData
  };


export default connect(mapStateToProps, mapDispatchToProps)(Step1);