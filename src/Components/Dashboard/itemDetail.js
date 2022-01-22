import React, { useState } from 'react'
import {View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, FlatList, Alert} from 'react-native'
import NumericInput from 'react-native-numeric-input'
import { connect } from 'react-redux'
import { themeGreen, themeGrey } from '../../Constant/color'
import Header from '../../Constant/Header'
import ItemCard from '../../Constant/itemCard'
import { addToCart, getCarItem } from '../../Redux/Actions/cartActions'



const item = require('../../../assets/item.png')
const heart = require('../../../assets/heart.png')
const heartFill = require('../../../assets/heart-fill.png')

const ItemDetails = (props) => {
    const { itemDetails, addToCart, userDetails, getCarItem } = props
    const itemData = {
        name: "Nestle Nido Fortigrow 390g",
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTHMoWcMQGa9kkA6igLjaWWNsvCuVABNDqHpg&usqp=CAU',
        price: '888',
        before: '900'
    }

// ACTIONS
const onSubmit = () => {
    if( !itemDetails.quantity && itemDetails.quantity == 0) {
        Alert.alert("Alert", "Quantity should be greater than 1")
    }else {
        addToCart(itemDetails, userDetails && userDetails._user && userDetails._user.uid)
        .then((res) => {
            getCarItem(userDetails && userDetails._user && userDetails._user.uid )
        })
    }
}


    return(
        <View style={styles.container}>
            <Header 
                backIcon
                centerHeading={itemDetails.itemName}
                centerHeadingColor={themeGreen}
                navigation={props.navigation}
                cart
                searchbar
            />
            <ScrollView>
                <View style={styles.container}>
                    {/* ITEM DETAIL CONTAINER */}
                    <View style={styles.itemContainer}>
                        <Text style={{...styles.boldTxt, fontSize: 20}}>
                            {itemDetails.itemName}
                        </Text>
                    </View>

                    <View style={[styles.centerItemStyle, styles.itemContainer]}>
                        <Image source={{uri: itemDetails.itemImage}}  style={{height: 200, width: 200}}/>
                    </View>


                    <View style={[styles.rowStyle, styles.spacebtw]}>
                        <View style={[styles.itemContainer, styles.rowStyle]}>
                            {itemDetails.itemSale ? 
                                <Text style={[styles.semiBoldTxt]}>
                                    Rs {itemDetails.itemSale} <Text style={styles.crossPrice}>{itemDetails.itemPrice}</Text>
                                </Text> 
                                :
                                <Text style={[styles.boldTxt,]}>
                                    Rs {itemDetails.itemPrice}
                                </Text>}

                            {/* <View style={styles.discountContainer}>
                                <Text style={styles.discounTxt}>
                                    100% Off
                                </Text>
                            </View> */}
                        </View>

                        <View style={{paddingHorizontal: 10}}> 
                            <NumericInput
                                    value={itemDetails.quantity}
                                    containerStyle={{padding: 10, 
                                        top: 15,}}
                                    onChange={num => {
                                        itemDetails.quantity = num
                                    }} 
                                    totalWidth={80}
                                    totalHeight={30}
                                    rounded
                                    minValue={1}
                                    maxValue={10}
                                    textColor={themeGrey}
                                    iconStyle={{ color: 'white' }}
                                    rightButtonBackgroundColor={themeGreen}
                                    leftButtonBackgroundColor={themeGreen} /> 
                        </View>

                        {/* <View style={styles.rowStyle}>
                            <View style={styles.itemContainer}>
                                <Image source={heart} style={styles.imgIcn}/>
                            </View>
                            <View style={styles.itemContainer}>
                                <Text>
                                    1 kg
                                </Text>
                            </View>
                        </View> */}
                    </View>
                    <TouchableOpacity onPress={() => onSubmit()} style={styles.buttonContainer}>
                        <Text style={styles.discounTxt}>
                            Add to cart
                        </Text>
                    </TouchableOpacity>
                    {/* <View style={styles.hr} /> */}


                    {/* SIMILAR ITEMS */}
                    <View style={styles.itemContainer}>
                        <Text style={{...styles.boldTxt, fontSize: 20}}>
                           Similar Items
                        </Text>
                    </View>

                    <View>
                        <FlatList 
                            data={[1,2,3,4,5,6]}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                                return(
                                    <ItemCard item={itemData} index={index} />
                                )
                            }}
                            keyExtractor={(item, index) => index}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemContainer: {
        padding: 10
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
    crossPrice: {
        textDecorationLine:'line-through',
        fontWeight:'300'
    },
    centerItemStyle: {
        alignItems:'center',
        justifyContent:'center'
    },
    rowStyle: {
        flexDirection:'row'
    },
    discountContainer: {
        borderRadius: 10,
        backgroundColor: 'red',
        padding: 2,
        width: 80,
        height: 30,
        marginHorizontal: 5,
        justifyContent:'center'
    },
    discounTxt: {
        color:'#fff',
        textAlign:'center',
        fontWeight:'bold',
    },
    spacebtw:{
        justifyContent:'space-between'
    },
    spaceAround: {
        justifyContent:'space-around'
    },
    imgIcn: {
        height: 25, 
        width: 25
    },
    buttonContainer: {
        backgroundColor: themeGreen,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 10, 
        alignSelf:'flex-end',
        width: '30%',
        marginHorizontal: 5
    },
    hr: {
        width:'100%',
        height: 0.5,
        backgroundColor: themeGrey,
        margin: 10
    }

})

const mapStateToProps = state => {
	return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
        itemDetails: state.user.itemDetails,
	};
  };
  
  const mapDispatchToProps = {
    addToCart, getCarItem
  };


export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);