import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon, Input, Item, Header as NativeHeader, Left, Right, Body } from 'native-base'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { themeGrey } from './color';
import { Badge } from 'react-native-elements';
import { connect } from 'react-redux';
import { searchByTxt } from '../Redux/Actions/filter';
const logoWhite = require('../../assets/logoWhite.png')
const menu = require('../../assets/menu.png')
const carts = require('../../assets/carts.png')
const back = require('../../assets/back.png')

function Header({ menuIcon, backIcon, centerHeading, searchbar, cartItems, logo, navigation, cart, centerHeadingColor }) {
    const [text, setText] = useState('')
    return(
        <View style={styles.header}>
                
                    <NativeHeader androidStatusBarColor={themeGrey} style={{backgroundColor: themeGrey}}>
                        <Left>
                            {menuIcon &&
                            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                                <Image source={menu} style={styles.icon} />
                            </TouchableOpacity>}

                            {backIcon &&
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Image source={back} style={styles.icon} />
                            </TouchableOpacity>}
                        </Left>
                        <Body style={{left: 50}}>
                            {logo && 
                            <View>
                                <Image source={logoWhite} style={styles.logo} />
                            </View>}

                            {centerHeading &&
                            <View>
                                <Text style={{fontWeight: 'bold', fontSize: 20, color: centerHeadingColor, textTransform:'capitalize' }}>
                                    {centerHeading}
                                </Text>
                            </View>}
                        </Body>
                        <Right>
                            {searchbar && 
                                <TouchableOpacity onPress={() => navigation.navigate('SearchingPage')} style={{paddingHorizontal: 5}}>
                                    <Icon name="search" style={{color: '#fff'}} />
                                </TouchableOpacity>
                                }
                            {cart ?
                                <>
                                    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                                        <Image source={carts} style={styles.icon} />
                                    </TouchableOpacity> 
                                    <Badge
                                        value={cartItems ? cartItems.length : 0}
                                        badgeStyle={styles.badgeStyle}
                                        containerStyle={styles.containerStyle}
                                        textStyle={styles.badgeText}
                                        />
                                </>
                                : 
                                <View />}
                        </Right>
                    </NativeHeader>

                   {/* {searchbar && 
                   <View style={{flexDirection:'row'}}>
                        <Item style={styles.searchContainer}>
                            <Input 
                            onFocus={() => {
                                navigation.navigate('SearchingPage')
                            }} 
                            style={styles.searchInput} 
                            value={text} placeholderTextColor="#bdbdbd" 
                            onChangeText={(e) => {
                                setText(e)
                            }} placeholder='Search for product' />
                        </Item>
                    </View>}       */}
            </View>
    )
}

const styles = StyleSheet.create({
    header : {
        backgroundColor: themeGrey,
        width:'100%',
        padding: 10
    },
    headerFisrtRow: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop: Platform.OS === "ios" ? 30 : 0,
        padding: 10
    },
    icon :{
        height: hp(4),
        width: wp(7)
    },
    logo: {
        height: hp(6),
        width: Platform.OS === 'ios' ? wp(40) : wp(35),
        // paddingHorizontal: wp(50)
    },
    searchContainer : { 
        width: '95%',
        marginTop: '2%', 
        borderRadius: 10, 
        alignSelf:'center',
    },
    searchInput: {
        color:'#bdbdbd', 
        backgroundColor:'#fff', 
        borderRadius: 5,
    },
    badgeStyle: {
        backgroundColor: 'white',
        borderColor: 'black',
      },
    containerStyle: {
        position: 'absolute',
        top: -13,
        right: -9,
        borderRadius: 9,
        height: 18,
        minWidth: 0,
        width: 18,
        color: 'red',
        backgroundColor: 'red',
        textAlign: 'center',
      },
    badgeText: {
        textAlign: 'center',
        fontSize: 12,
        paddingHorizontal: 0,
        color: 'black',
        fontFamily: 'Montserrat-Bold',
      },
    
})




const mapStateToProps = state => {
	return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
        cartItems: state.cart.cartItems
	};
  };
  
  const mapDispatchToProps = {
    searchByTxt
  };


export default connect(mapStateToProps, mapDispatchToProps)(Header);