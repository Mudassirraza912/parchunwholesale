import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View, Image,
  ScrollView, Linking
} from "react-native";

import { Avatar, Button, Icon } from "react-native-elements"
import { themeGreen, themeGrey } from "../Constant/color";
import { connect } from "react-redux";
import auth from '@react-native-firebase/auth';
import { logoutAct } from "../Redux/Actions/userAction";
import UniversalModal from "../Constant/Modal";
import { set } from "react-native-reanimated";

const orders = require("../../assets/orders.png")
const tcIcon = require("../../assets/tc.png")
const ppIcon = require("../../assets/pp.png")
const loginIcon = require("../../assets/login.png")
const dashboardIcon = require("../../assets/dashboard.png")


function Drawer(props) {
const { userDetails, logoutAct } = props
const [show, setIsShow] = useState(false)
const signediInTabs = [
    {
        title: "Dashboard",
        navigateParams: "Dashboard",
        icon: dashboardIcon
    },
    {
        title: "Order History",
        navigateParams: "Orders",
        icon: orders
    },
    {
        title: "Terms & Conditions",
        navigateParams: "TermCondition",
        icon: tcIcon
    },
    // {
    //     title: "Privacy Policy",
    //     navigateParams: "PrivacyPolicy",
    //     icon: ppIcon
    // },
    {
        title: "Contact Us",
        onPress: () => {setIsShow(!show)},
        icon: ppIcon
    },

]
const guestTabs = [
    {
        title: "Dashboard",
        navigateParams: "Dashboard",
        icon: dashboardIcon
    },
    {
        title: "Sign in/ Register",
        navigateParams: "Authentication",
        icon: loginIcon
    },
    {
        title: "Terms & Conditions",
        navigateParams: "TermCondition",
        icon: tcIcon
    },
    // {
    //     title: "Privacy Policy",
    //     navigateParams: "PrivacyPolicy",
    //     icon: ppIcon
    // },
    {
        title: "Contact Us",
        onPress: () => {setIsShow(!show)},
        icon: ppIcon
    },
]


    if(userDetails) {
        return(
            <View style={{flex: 1}}>
                <UniversalModal 
                    modalVisibel={show}
                    title="Contact Us"
                    discription="Click Below Button To Contact Us"
                    successIcon={false}
                    setModalVisible={(a) => setIsShow(a)}
                    buttons={[
                        {
                            title:"Call us",
                            style: {alignSelf: 'center'},
                            width: 80,
                            onPress: () => {Linking.openURL((`tel:03126581971`))}
                        },
                    ]}
                />
                    <View style={{height:"100%", width:'100%', flex: 1, justifyContent:'center'}}> 
                        <ScrollView>
                            <View style={{height:"100%", width:'100%', flex: 1, }}>

                            <View style={{ paddingTop:15, alignItems:'center', borderBottomColor:'#000', borderBottomWidth: 1}}>
                                <Avatar
                                    size="xlarge" 
                                    rounded
                                    containerStyle={{borderWidth: 15, borderColor:'#fff',}}
                                    source={{uri: 'https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg'}}
                                    />
                                    
                                <View style={{ alignItems:'center', marginVertical: 10 }}>
                                    <Text style={{fontSize: 23}}>{(userDetails && userDetails._user && userDetails._user.phoneNumber)}</Text>
                                </View>
                            </View>

                            
                                
                            {signediInTabs.map((value, index) => {
                                return(
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.menuItem}
                                        onPress={value.onPress ? value.onPress 
                                            : 
                                            () => {
                                            props.navigation.navigate(value.navigateParams)
                                            props.navigation.closeDrawer()
                                             }}
                                        >
                                        <View style={{ marginLeft: 10, width: 30 }}>
                                            <Image source={value.icon} style={{ height: 20, width: 20 }} />
                                        </View>
                                        <View style={{ marginLeft: 20 }}>
                                         <Text style={styles.menuItemText}>{value.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}


                            </View>
                        </ScrollView>
                        <TouchableOpacity
                                style={{
                                padding: 10,
                                marginTop: 30,
                                display: "flex",
                                flexDirection: "row"
                                }}
                                onPress={() => {
                                    auth().signOut()
                                    .then(res => {
                                    })
                                    .catch(err => {
                                        console.log("err signOut", err)
                                    })
                                    logoutAct()
                                    props.navigation.closeDrawer()

                                }}
                                >
                                    <View style={{ marginLeft: 10, width: 30 }}>
                                        <Image source={loginIcon} style={{ height: 20, width: 20 }} />
                                    </View>
                                    <View style={{ marginLeft: 20 }}>
                                        <Text style={styles.menuItemText}>LOGOUT</Text>
                                    </View>
                                </TouchableOpacity>
                    </View>
                </View>
        )
    }else {
        return(
            <View style={{flex: 1}}>
                <UniversalModal 
                    modalVisibel={show}
                    title="Contact Us"
                    discription="Click Below Button To Contact Us"
                    successIcon={false}
                    setModalVisible={(a) => setIsShow(a)}
                    buttons={[
                        {
                            title:"Call us",
                            style: {alignSelf: 'center'},
                            width: 80,
                            onPress: () => {Linking.openURL((`tel:03126581971`))}
                        },
                    ]}
                />
                    <View style={{height:"100%", width:'100%', flex: 1, justifyContent:'center'}}> 
                        <ScrollView>
                            <View style={{height:"100%", width:'100%', flex: 1, }}>
    
                            <View style={{ paddingTop:15, alignItems:'center', borderBottomColor:'#000', borderBottomWidth: 1}}>
                                <Avatar
                                    size="xlarge" 
                                    rounded
                                    containerStyle={{borderWidth: 15, borderColor:'#fff',}}
                                    source={{uri: 'https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg'}}
                                    />
                                    
                                <View style={{ alignItems:'center', marginVertical: 10 }}>
                                    <Text style={{fontSize: 23}}>Guest User</Text>
                                </View>
                            </View>
                                
                            {guestTabs.map((value, index) => {
                                return(
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.menuItem}
                                        onPress={value.onPress ? value.onPress 
                                            : 
                                            () => {
                                            props.navigation.navigate(value.navigateParams)
                                            props.navigation.closeDrawer()
                                             }}
                                        >
                                        <View style={{ marginLeft: 10, width: 30 }}>
                                            <Image source={value.icon} style={{ height: 20, width: 20 }} />
                                        </View>
                                        <View style={{ marginLeft: 20 }}>
                                         <Text style={styles.menuItemText}>{value.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
    
    
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
      paddingTop: 100
    },
    menuItem: {
      padding: 10,
      // justifyContent: "center",
      // backgroundColor: "rgba(12, 12, 12, 0.2)",
    //   marginBottom: 2,
    marginTop: 30,
    display: "flex",
    flexDirection: "row"
    },
    menuItemText: {
      fontSize: 15,
      color: "#000"
    //   top: 2,
    //   fontFamily: "Poppins-Regular"
    }
  });


Drawer.defaultProps = {};

Drawer.propTypes = {};


const mapStateToProps = state => {
	return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
	};
  };
  
  const mapDispatchToProps = {
    logoutAct
  };


export default connect(mapStateToProps, mapDispatchToProps)(Drawer);