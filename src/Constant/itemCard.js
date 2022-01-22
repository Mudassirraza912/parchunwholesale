import React, { useState } from 'react'
import { Item, Spinner } from 'native-base';
import {View, Text, TouchableOpacity, Image, StyleSheet,} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { themeGreen, themeGrey } from './color';
import { deleteItem , getCarItem, addToCart} from '../Redux/Actions/cartActions'
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import NumericInput from 'react-native-numeric-input';
const ItemCard = ({item, navigation, ind, userDetails, fetching, cartItems, getCarItem, addToCart, deleteItem}) => {

    const [loaderIndex, setLoaderIndex] = useState(false)

    const index = cartItems ? cartItems.findIndex(e => e.key === item.key) : null
    return(
        <TouchableOpacity key={ind} style={{ margin: 5, width: wp(33)}}>
            <View>
                <Image source={{uri: item.itemImage}} style={{height: 120, width: 120, alignSelf:"center"}} />
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around', paddingVertical: 5}}>
                {item.itemSale ? 
                <Text style={[styles.boldTxt,]}>
                    Rs {item.itemSale} <Text style={styles.crossPrice}>{item.itemPrice}</Text>
                </Text> :
                <Text style={[styles.boldTxt,]}>
                    Rs {item.itemPrice}
                </Text>}
            </View>
            <View style={{}}>
                <Text style={{color:'#bdbdbd', fontWeight:'bold', textAlign:'center'}}>
                Rs {item.itemName}
                </Text>
            </View>


            {/* NUMERIC INPUT */}
            <View style={{paddingVertical: 10}}>
            {userDetails ?   
                <>
                {(fetching && loaderIndex == ind) ?
                    <Spinner style={{right: 20}} />
                :
                    <>
                    {item.inStock ? 
                    <NumericInput
                    value={(index != -1 && index != null) ? cartItems[index].quantity : item.quantity}
                    containerStyle={{ alignSelf: 'center' }}
                    editable={false}
                    onChange={num => {
                        setLoaderIndex(ind)
                        item.quantity = num
                        if( !item.quantity && item.quantity == 0) {
                            if (index != -1 && index != null) {
                                deleteItem(cartItems[index])
                                .then((res) => {
                                    getCarItem(userDetails && userDetails._user && userDetails._user.uid )
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
                            })
                            .catch((err) => {
                                console.log("err addToCart", err)
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
                    minitemue={0}
                    maxitemue={item.limit != 0 ? item.limit : 10}
                    textColor={themeGrey}
                    iconStyle={{ color: 'white' }}
                    rightButtonBackgroundColor={themeGreen}
                    leftButtonBackgroundColor={themeGreen} /> 
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
                    <Text style={styles.greenTxtBoldTxt}>Login to buy</Text>
                </TouchableOpacity>}
        </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    productContainer: {
        flexDirection:'row',
        borderBottomWidth: 1,
        borderBottomColor: '#efefef',
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
        fontWeight:'300'
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
        cartItems: state.cart.cartItems,
	};
  };
  
  const mapDispatchToProps = {
    getCarItem, addToCart, deleteItem
  };


export default connect(mapStateToProps, mapDispatchToProps)(ItemCard);