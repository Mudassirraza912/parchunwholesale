import React, { useState } from 'react'
import {View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Alert, FlatList, Vibration} from 'react-native'
 import NumericInput from 'react-native-numeric-input'
import { themeGreen, themeGrey } from './color'
const rightChevron = require('../../assets/right-chevron.png')
const deleteIcon = require('../../assets/delete.png')
import {widthPercentageToDP as wp, heightPercentageToDP as hp, widthPercentageToDP} from 'react-native-responsive-screen';
import { connect } from 'react-redux'
import { addToCart, getCarItem, deleteItem } from '../Redux/Actions/cartActions'
import { Icon, Spinner } from 'native-base'
import Toast from 'react-native-simple-toast';
import RequestItem from '../Constant/requestItemCard'
const  RenderTabContent = (props) => {
    const { data, cartItems, userDetails, addToCart, getCarItem, deleteItem, showUnit, fetching, horizontal, isShow = true, quantityEdit = true } = props
    const [loaderIndex, setLoaderIndex] = useState(false)
    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.container}>
                <FlatList
                    data={data ? data : []}
                    horizontal={horizontal ? horizontal : false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        const index1 = cartItems ? cartItems.findIndex(e => e.key === item.key) : null
                        const currentValue = (index1 != -1 && index1 != null) ? cartItems[index1].quantity : item.quantity
                        if(!horizontal) {
                            return(
                                <TouchableOpacity activeOpacity={.6} key={index} onPress={props.onPress ? () => props.onPress(item.key) : null} style={[styles.rowProductContainer]}>
                                    {/* ITEM IMAGE */}
                                    <View style={{padding: 5}}>
                                        <Image source={{uri: item.itemImage}} style={styles.productImg} />
                                    </View>
    
                                    {/* ITEM CONTENT */}
                                    <View style={[styles.itemContainer, {width: widthPercentageToDP(60)}]}>
                                        <Text style={[styles.semiBoldTxt, {width: widthPercentageToDP(35)}]}>
                                            {item.itemName}
                                        </Text>
                                        {props.showUnit &&
                                        <View>
                                            <Text style={[styles.semiBoldTxt, {paddingVertical: 0}]}>{item.unit}</Text>
                                        </View>}
                                        {item.itemSale ? 
                                        <Text style={[styles.boldTxt, {fontSize: 19}]}>
                                            Rs {item.itemSale} <Text style={styles.crossPrice}>Rs: {item.itemPrice}</Text>
                                        </Text> :
                                        <Text style={[styles.boldTxt, {fontSize: 19}]}>
                                            Rs {item.itemPrice}
                                        </Text>}
                                    </View>
                                        
                                    {/* ADD TO CART */}
                                    <View style={styles.itemContainer}>
                                      {props.rightChevron &&
                                        <View>
                                            <Image source={rightChevron} style={{height: 20, width: 20, paddingVertical: 10}} />
                                        </View>}
                                        
    
                                       {props.deleteIcon &&
                                        <TouchableOpacity 
                                        onPress={() => {
                                            deleteItem(item)
                                            .then((res) => {
                                                getCarItem(userDetails && userDetails._user && userDetails._user.uid )
                                                Vibration.vibrate()

                                            })
                                            .catch((err) => {
                                                console.log("err deleteItem", err)
                                            })
                                        }}
                                        style={{paddingVertical: 10, bottom: 5}}>
                                            <Icon name="close" />
                                        </TouchableOpacity>}
    
                                        {!quantityEdit ?
                                            <View>
                                               <Text style={{right: 20}}>
                                                    QTY {currentValue}
                                               </Text>
                                            </View>
                                            :
                                            <View>
                                                {props.showQty && 
                                                <View>
                                                    {userDetails ?   
                                                        <>
                                                        {(fetching && loaderIndex === index) ?
                                                        <Spinner style={{right: 20}} />
                                                        :
                                                            <>
                                                            {item.inStock ? 
                                                            <>
                                                        {currentValue < 1 ?
                                                        <TouchableOpacity 
                                                        onPress={() => {
                                                            setLoaderIndex(index)
                                                            item.quantity = 1
                                                            if( !item.quantity && item.quantity == 0) {
                                                                if (index1 != -1 && index1 != null) {
                                                                    deleteItem(cartItems[index1])
                                                                    .then((res) => {
                                                                        getCarItem(userDetails && userDetails._user && userDetails._user.uid )
                                                                        Vibration.vibrate()

                                                                    })
                                                                    .catch((err) => {
                                                                        console.log("err deleteItem", err)
                                                                    })
                                                                }else {
                                                                    Alert.alert("Alert", "Quantity should be greater than 1")
                                                                }
                                                            }else {
                                                                item.quantity = 1
                                                                addToCart(item, userDetails && userDetails._user && userDetails._user.uid)
                                                                .then((res) => {
                                                                    getCarItem(userDetails && userDetails._user && userDetails._user.uid )
                                                                    Vibration.vibrate()

                                                                })
                                                                .catch((err) => {
                                                                    console.log("err userDetails", err)
                                                                })
                                                            }
                                                        }}
                                                        style={{backgroundColor: themeGreen, borderRadius: 5, alignItems:'center', right: '70%', paddingHorizontal
                                                        : 10}}>
                                                                    <Text style={[styles.semiBoldTxt, {color: '#fff'}]}>Add to cart</Text>
                                                        </TouchableOpacity>
                                                        :
                                                            <NumericInput
                                                            value={currentValue}
                                                            containerStyle={{right: 50}}
                                                            editable={false}
                                                            onChange={num => {
                                                                setLoaderIndex(index)
                                                                item.quantity = num
                                                                if( !item.quantity && item.quantity == 0) {
                                                                    if (index1 != -1 && index1 != null) {
                                                                        deleteItem(cartItems[index1])
                                                                        .then((res) => {
                                                                            getCarItem(userDetails && userDetails._user && userDetails._user.uid )
                                                                            Vibration.vibrate()
                                                                        })
                                                                        .catch((err) => {
                                                                            console.log("err deleteItem", err)
                                                                        })
                                                                    }else {
                                                                        Alert.alert("Alert", "Quantity should be greater than 1")
                                                                    }
                                                                }else {
                                                                    item.quantity = num
                                                                    addToCart(item, userDetails && userDetails._user && userDetails._user.uid)
                                                                    .then((res) => {
                                                                        getCarItem(userDetails && userDetails._user && userDetails._user.uid )
                                                                        Vibration.vibrate()
                                                                    })
                                                                    .catch((err) => {
                                                                        console.log("err userDetails", err)
                                                                    })
                                                                }
                                                            }} 
                                                            totalWidth={80}
                                                            totalHeight={30}
                                                            rounded
                                                            onLimitReached={(isMax, msg) => {
                                                                if(isMax) {
                                                                    Toast.show(msg, Toast.SHORT, [
                                                                        'UIAlertController',
                                                                        ]);
                                                                }
                                                            }}
                                                            minValue={0}
                                                            maxValue={item.limit != 0 ? item.limit : 10}
                                                            textColor={themeGrey}
                                                            iconStyle={{ color: 'white' }}
                                                            rightButtonBackgroundColor={themeGreen}
                                                            leftButtonBackgroundColor={themeGreen}
                                                            /> }
                                                            </>
                                                            :
                                                            <View style={{right: 50}}>
                                                                <Text style={{color: "red", fontWeight: "bold"}}>Out of Stock</Text>
                                                            </View>}
                                                            </>
                                                        }
                                                        </>
                                                        :
                                                        <TouchableOpacity 
                                                        onPress={() => {
                                                            props.navigation.navigate('UserLogin')
                                                        }}
                                                        style={{alignSelf:'center', right: "70%"}}>
                                                            <Text style={styles.greenTxtBoldTxt}>Login to cart</Text>
                                                        </TouchableOpacity>}
                                                </View>
                                                }
                                        </View>}
                                    </View>
                                </TouchableOpacity>
                                )
                        }else {
                            return(
                                <TouchableOpacity activeOpacity={.6} key={index} onPress={props.onPress ? () => props.onPress(item.key) : null}>
                                    {/* ITEM IMAGE */}
                                    <View style={{padding: 5}}>
                                        <Image source={{uri: item.itemImage}} style={styles.productImg} />
                                    </View>
    
                                    {/* ITEM CONTENT */}
                                    <View style={[styles.itemContainer, {width: widthPercentageToDP(35), height: hp(20)}]}>
                                        <Text style={[styles.semiBoldTxt, {width: widthPercentageToDP(33), textAlign:'center'}]}>
                                            {item.itemName}
                                        </Text>
                                        {props.showUnit &&
                                        <View>
                                            <Text style={[styles.semiBoldTxt, {paddingVertical: 0, alignSelf: 'center'}]}>{item.unit}</Text>
                                        </View>}
                                        {item.itemSale ? 
                                        <Text style={[styles.boldTxt, {textAlign: 'center', fontSize: 16}]}>
                                            Rs {item.itemSale} <Text style={styles.crossPrice}>Rs: {item.itemPrice}</Text>
                                        </Text> :
                                        <Text style={[styles.boldTxt, {textAlign:'center', fontSize: 16}]}>
                                            Rs {item.itemPrice}
                                        </Text>}
                                    </View>
                                        
                                    {/* ADD TO CART */}
                                    <View>
                                      {props.rightChevron &&
                                        <View>
                                            <Image source={rightChevron} style={{height: 20, width: 20, paddingVertical: 10}} />
                                        </View>}
                                        
    
                                       {props.deleteIcon &&
                                        <TouchableOpacity 
                                        onPress={() => {
                                            deleteItem(item)
                                            .then((res) => {
                                                getCarItem(userDetails && userDetails._user && userDetails._user.uid )
                                            })
                                            .catch((err) => {
                                                console.log("err deleteItem", err)
                                            })
                                        }}
                                        style={{paddingVertical: 10, bottom: 5}}>
                                            <Icon name="close" />
                                        </TouchableOpacity>}
    
                                        {props.showQty && 
                                        <View>
                                            {userDetails ?   
                                                <>
                                                {(fetching && loaderIndex === index) ?
                                                 <Spinner style={{right: 20, height: 30}} />
                                                :
                                                    <>
                                                    {item.inStock ? 
                                                    <>
                                                    {currentValue < 1 ? 
                                                        <TouchableOpacity 
                                                        onPress={() => {
                                                         setLoaderIndex(index)
                                                         item.quantity = 1
                                                         if( !item.quantity && item.quantity == 0) {
                                                             if (index1 != -1 && index1 != null) {
                                                                 deleteItem(cartItems[index1])
                                                                 .then((res) => {
                                                                     getCarItem(userDetails && userDetails._user && userDetails._user.uid )
                                                                     Vibration.vibrate()
                                                                 })
                                                                 .catch((err) => {
                                                                     console.log("err deleteItem", err)
                                                                 })
                                                             }else {
                                                                 Alert.alert("Alert", "Quantity should be greater than 1")
                                                             }
                                                         }else {
                                                             item.quantity = 1
                                                             addToCart(item, userDetails && userDetails._user && userDetails._user.uid)
                                                             .then((res) => {
                                                                 getCarItem(userDetails && userDetails._user && userDetails._user.uid )
                                                                 Vibration.vibrate()
                                                             })
                                                             .catch((err) => {
                                                                 console.log("err userDetails", err)
                                                             })
                                                         }
                                                        }}
                                                        style={{backgroundColor: themeGreen, borderRadius: 5, width: '80%', alignItems:'center'}}>
                                                            <Text style={[styles.semiBoldTxt, {color: '#fff'}]}>Add to cart</Text>
                                                        </TouchableOpacity>
                                                        :
                                                       <NumericInput
                                                        value={currentValue}
                                                        containerStyle={{alignSelf: 'center'}}
                                                        editable={false}
                                                        onChange={num => {
                                                            setLoaderIndex(index)
                                                            item.quantity = num
                                                            if( !item.quantity && item.quantity == 0) {
                                                                if (index1 != -1 && index1 != null) {
                                                                    deleteItem(cartItems[index1])
                                                                    .then((res) => {
                                                                        getCarItem(userDetails && userDetails._user && userDetails._user.uid )
                                                                        Vibration.vibrate()
                                                                    })
                                                                    .catch((err) => {
                                                                        console.log("err deleteItem", err)
                                                                    })
                                                                }else {
                                                                    Alert.alert("Alert", "Quantity should be greater than 1")
                                                                }
                                                            }else {
                                                                item.quantity = num
                                                                addToCart(item, userDetails && userDetails._user && userDetails._user.uid)
                                                                .then((res) => {
                                                                    getCarItem(userDetails && userDetails._user && userDetails._user.uid )
                                                                    Vibration.vibrate()
                                                                })
                                                                .catch((err) => {
                                                                    console.log("err userDetails", err)
                                                                })
                                                            }
                                                        }} 
                                                        totalWidth={80}
                                                        totalHeight={30}
                                                        rounded
                                                        onLimitReached={(isMax, msg) => {
                                                            if(isMax) {
                                                                Toast.show(msg, Toast.SHORT, [
                                                                    'UIAlertController',
                                                                    ]);
                                                            }
                                                        }}
                                                        minValue={0}
                                                        maxValue={item.limit != 0 ? item.limit : 10}
                                                        textColor={themeGrey}
                                                        iconStyle={{ color: 'white' }}
                                                        rightButtonBackgroundColor={themeGreen}
                                                        leftButtonBackgroundColor={themeGreen} />}
                                                    </>
                                                    :
                                                    <View style={{right: 50}}>
                                                        <Text style={{color: "red", fontWeight: "bold"}}>Out of Stock</Text>
                                                    </View>}
                                                    </>
                                                }
                                                </>
                                                :
                                                <TouchableOpacity 
                                                onPress={() => {
                                                    props.navigation.navigate('UserLogin')
                                                }}
                                                style={{alignSelf:'center', borderColor: themeGreen, borderWidth: 1, borderRadius: 5, alignItems:'center'}}>
                                                    <Text style={[styles.greenTxtBoldTxt, {textAlign:'center', padding: 5}]}>Login to buy</Text>
                                                </TouchableOpacity>}
                                        </View>
                                        }
                                    </View>
                                </TouchableOpacity>
                                )
                        }
                    }}
                    keyExtractor={(item, index1) => index1}
                />
                </View>
            {(!horizontal && isShow) && <RequestItem />}
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rowProductContainer: {
        flexDirection:'row',
        borderBottomWidth: 1,
        borderBottomColor: '#efefef',
        alignItems:'center',
    },
    colProductContainer: {
        alignItems:'center',
    },
    itemContainer: {
        // padding: 10
    },
    productImg: {
        height: 100,
        width: 100,
        borderRadius: 10
    },
    semiBoldTxt: {
        fontWeight: '900',
        paddingVertical: 5,
        letterSpacing: 1
    },
    boldTxt: {
        fontWeight:'bold',
        paddingVertical: 5,
        letterSpacing: 1
    },
    itemContent: {
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    discountContainer: {
        borderRadius: 10,
        backgroundColor: 'red',
        padding: 2,
        width: 60
    },
    discounTxt: {
        color:'#fff',
        textAlign:'center',
        fontWeight:'bold',
    },
    buttonContainer: {
        backgroundColor: themeGreen,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 10, 
        top: 15,
        // alignSelf: 'baseline'
    },
    crossPrice: {
        textDecorationLine:'line-through',
        fontWeight:'300',
        color: 'red'
    },
    greenTxtBoldTxt: {
        color: themeGreen,
        fontWeight:'bold'
    }
})



const mapStateToProps = state => {
	return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
        cartItems: state.cart.cartItems
	};
  };
  
  const mapDispatchToProps = {
    addToCart, getCarItem, deleteItem
  };

export default connect(mapStateToProps, mapDispatchToProps)(RenderTabContent);