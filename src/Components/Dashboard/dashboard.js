import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Platform, BackHandler} from 'react-native'
import { connect } from 'react-redux';
import {getCategories, signup, getSubCategory, login, getOrders, getBanners, addUser, getTermCondition} from '../../Redux/Actions/userAction'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SliderBox } from "react-native-image-slider-box";
import Header from '../../Constant/Header';
import { themeGrey } from '../../Constant/color';
import ItemCard from '../../Constant/itemCard';
import Loader from '../../Constant/Loader';
import auth from '@react-native-firebase/auth';
import { getCarItem, getFeaturedProducts } from '../../Redux/Actions/cartActions';
import messaging from '@react-native-firebase/messaging';
import RenderTabContent from '../../Constant/itemCardDetails'
import { CustomBtn } from '../../Constant/Button';
import { Alert } from 'react-native';
const banner = require('../../../assets/slider1.png')
const banner2 = require('../../../assets/slider2.png')

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        const {getCategories, login, getCarItem, getOrders, getBanners, getTermCondition, getFeaturedProducts, userDetails} = this.props
        getCategories()
        getBanners()
        getTermCondition()
        getFeaturedProducts()
        console.log('check didmount')
        auth().onAuthStateChanged(e => {
            if(e) {
                getCategories()
                getCarItem(e.uid)
                getOrders(e.uid)
                login(e)
            this.addUserDetails(userDetails)
            }else {
                login(null)
            }
        })
        // if(userDetails) {
        //     console.log('userDetails userDetails', userDetails)
        //     this.addUserDetails(userDetails)
        // }
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }


    backAction = () => {
        if(this.props.navigation.isFocused()) {
            Alert.alert("Hold on!", "Are you sure you want to close app?", [
                {
                  text: "Cancel",
                  onPress: () => null,
                  style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
              ]);
            return true;
        }else {
            return false
        }
        
      };
    
    
      componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
      }
    

    addUserDetails = async (e) => {
        console.log('check addUserDetails run')
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            messaging().getToken().then(token => {
              if(e.token !== token) {
                    e.token = token
                    console.log('check token run', token)
                    this.props.addUser(e, e.uid, token)
              }
            })
        }else {
            e.token = null
            this.props.addUser(e, e.uid, null)
        }

    }
    
render() {
    const { category, fetching, getSubCategory, userDetails, featureProduct, navigation, banners } = this.props
    const { images, items } = this.state
    // const banners = [ banner, banner2]
        return (
            <View style={styles.container}>
                {/* <Loader visible={fetching} /> */}
                 
                <Header
                menuIcon
                logo
                searchbar={true} 
                navigation={this.props.navigation}
                cart
                 />
                
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.container}>
                                
                                {banners && banners.length > 0 && 
                                <View>
                                    <SliderBox
                                        images={banners}
                                        ImageComponentStyle={{width: wp(100), height: hp(40)}}
                                        sliderBoxHeight={hp(30)}
                                        onCurrentImagePressed={index =>
                                            console.warn(`image ${index} pressed`)
                                        }
                                        parentWidth={wp(100)}
                                        autoplay
                                        loop
                                        
                                        />
                                </View>}


                               {featureProduct &&
                                <>
                                <View style={styles.siteHeading}>
                                    <Text style={[styles.siteHeadingText, {textDecorationLine: 'none', width: wp(55), fontSize: 20}]}>
                                        Featured Products
                                    </Text>

                                    {/* <TouchableOpacity onPress={() => {
                                        navigation.navigate("FeatureProduct")
                                    }}>
                                        <Text style={styles.siteHeadingText}>
                                            View All 
                                        </Text>
                                    </TouchableOpacity> */}
                                    <CustomBtn 
                                        width={30}
                                        onPress={() => {
                                            navigation.navigate("FeatureProduct")
                                        }} 
                                        title="View All" 
                                        titleStyle={[styles.siteHeadingText, {fontSize: 16, width: '100%'}]}
                                    />
                                </View>

                                <View style={{ padding: 5}}>
                                    <RenderTabContent
                                    onPress={(id) => {
                                        // specificItemData(id)
                                    }}
                                    data={featureProduct} 
                                    navigation={this.props.navigation} 
                                    showUnit
                                    showQty
                                    horizontal
                                    />
                                </View>
                                </>}
                                {/* SHOP BY CATEGORY */}

                            <View style={styles.HeadingContainer}>
                                <Text style={styles.HeadingText}>
                                    Shop by Category
                                </Text>
                            </View>


                          {category &&
                            <View style={{width:'100%'}}>
                                <FlatList 
                                    data={category}
                                    numColumns={3}
                                    renderItem={({item, index}) => {
                                        return(
                                            <TouchableOpacity
                                            onPress={() => {
                                                getSubCategory(item.key)
                                                this.props.navigation.navigate("CateItems", {itemId : item.key})
                                            }}
                                            key={index} 
                                            style={{width: wp(33.3) , height: hp(20), paddingVertical: 10, borderColor:'#bdbdbd', borderWidth: 0.5, justifyContent:'center'}} >
                                                <Image source={{uri: item.categoryImage}} style={{height: hp(10), width: wp(26), alignSelf:'center'}}  />
                                                <Text style={[{textAlign:'center', marginVertical: 5}]}>{item.categoryName}</Text>
                                            </TouchableOpacity>
                                        )
                                    }}
                                />
                            </View>}


                        </View>
                    </ScrollView>

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       backgroundColor:'#fff'
    },
    siteHeading: {
        padding: 10,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    siteHeadingText: {
        fontWeight:'bold', 
        textDecorationLine:'underline', 
        fontSize: 17
    },
    HeadingContainer: {
        alignItems: 'center',
        paddingVertical: 20
    },
    HeadingText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    boldTxt: {
        fontWeight: "bold",
        paddingVertical: 5
    }

})

const mapStateToProps = state => {
	return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
        category: state.user.category,
        banners: state.user.banners,
        featureProduct: state.cart.featureProduct
	};
  };
  
  const mapDispatchToProps = {
    signup, getCategories, getSubCategory, login, getCarItem, getOrders,
    getBanners, addUser, getTermCondition, getFeaturedProducts

  };


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);