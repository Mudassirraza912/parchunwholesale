import React from 'react'
import { Button } from 'native-base'
import {View, Text, ScrollView, Image, StyleSheet} from 'react-native'
import Header from '../../Constant/Header'
import { CustomBtn } from '../../Constant/Button'
import { connect } from 'react-redux'
const empty = require('../../../assets/emptycart.png')

const EmptyCart = (props) => {
    return(
        <View style={styles.container}>
            <Header 
                backIcon
                centerHeading="My Cart"
                centerHeadingColor="#fff"
                navigation={props.navigation}
                searchbar
                />
            <ScrollView contentContainerStyle={{paddingBottom: 30}}>
                <View style={styles.container}>
                    <View style={{alignItems:'center', justifyContent:'center'}}>
                        <Image source={empty} />
                    </View>
                    
                    <View style={styles.itemContiner}>
                        <Text style={[styles.boldTxt, styles.heading]}>
                          Cart is empty
                        </Text>
                    </View>
                    <View style={styles.itemContiner}>
                        <Text style={[styles.normatTxt, styles.heading]}>
                          There are no items in your shopping cart.
                        </Text>
                    </View>

                    <CustomBtn style={{alignSelf: 'center'}} onPress={() => {props.navigation.navigate("Dashboard")}} width={90} title={'START SHOPPING'} />
                </View>
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
  };


export default connect(mapStateToProps, mapDispatchToProps)(EmptyCart);
