import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Platform, ScrollView, Image, Alert} from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import {login , verifyPhoneNumber} from '../../Redux/Actions/userAction'
import Header from '../../Constant/Header'
import { themeGreen, themeGrey } from '../../Constant/color';
import { Input, Item } from 'native-base'
import { CustomBtn } from '../../Constant/Button';
import { TextInputMask } from 'react-native-masked-text'
import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';
import CountDown from 'react-native-countdown-component';

const userRef = firestore().collection("users")


const logoWhite = require('../../../assets/logoWhite.png')
const back = require('../../../assets/back.png')

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            confirm: null,
            code: '',
            phoneNumber: '',
            userData: null,
            loader: false,
            resend: false,
            startDate: "",
            endDate: "",
            time: 60
        }
    }


    




        // Handle the verify phone button press
    async verifyPhoneNumber() {
        this.setState({
            loader: true
        })
        const { phoneNumber } = this.state
        const { verifyPhoneNumber } = this.props
        verifyPhoneNumber(phoneNumber)
        .then((response) => {
            console.log("Empty verifyPhoneNumber", response, phoneNumber)
            this.setState({
                loader: false,
                resend: false
            })
            if(response.status) {
                this.setState({confirm : response, loader: false})
            }
        })
        .catch((error) => {
            console.log("error verifyPhoneNumber", error, phoneNumber)
            this.setState({
                loader: false
            })
        })
    }

    // Handle confirm code button press
    async confirmCode() {
        this.setState({
            loader: true
        })
        const { code } = this.state
        const { login, confirmation } = this.props
        confirmation.confirm(code)
        .then(user => {
        //   userRef.add(user)
        this.setState({
            loader: false
        })
          login(user)
          Alert.alert("Alert", "Registeration Succesfully")
        }) // User is logged in){ }
        .catch(error => {
            this.setState({
                loader: false
            })
          Alert.alert("`Alert", error.toString())
          console.log("error confirmCode =>", error)
        })// Error with verification code
        
    }

    render() {
        const { userData, confirm, loader, phoneNumber, resend } = this.state
        const { confirmation } = this.props
        return (
            <View style={{flex: 1}}>
                <Spinner
                visible={loader}
                textContent={'Please wait... '}
                textStyle={{color: "#fff", width:'100%', textAlign:'center'}}
                />
                <View style={styles.header}>
                    <View style={styles.headerFisrtRow}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Dashboard")}>
                            <Image source={back} style={styles.icon} />
                        </TouchableOpacity>

                        <View>
                            <Image source={logoWhite} style={styles.logo} />
                        </View>
                        
                        <View />
                    </View>
                </View>
               
               {!confirmation ?
                    <ScrollView>
                        <View style={[styles.centerItem, {marginTop: 40}]}>
                            <Text style={[{fontSize: 25, fontWeight:'bold'}, styles.greenTxt]}>
                                Sign in
                            </Text>
                        </View>

                        <View style={[styles.boxShadow, styles.itemContainer]}>
                            <View>
                                <Item>
                                  <Text style={{bottom: 0.5, fontSize: 18}}>+92 3</Text>
                                    <TextInputMask
                                        type={'custom'}
                                        placeholder="13 1234567"
                                        keyboardType="number-pad"
                                        options={{
                                            mask: '99 9999999'
                                        }}
                                        value={this.state.phoneNumber}
                                        onChangeText={(e) => this.setState({phoneNumber: e})} 
                                        style={{ width:'100%', fontSize: 18, right: 4}}
                                        />
                                </Item>
                            </View>

                            <CustomBtn  disabled={!(phoneNumber.length == 10)} onPress={() => this.verifyPhoneNumber()} width={90} title={'Sign in'} />
                        </View>
                </ScrollView>
           
           :   
                <ScrollView>
                    <View style={[styles.centerItem, {marginTop: 40}]}>
                        <Text style={[{fontSize: 25, fontWeight:'bold'}, styles.greenTxt]}>
                            Enter Confirmation code
                        </Text>
                    </View>

                    <View style={[styles.boxShadow, styles.itemContainer]}>
                        <View>
                            <Item>
                                <Input 
                                    onChangeText={(e) => this.setState({code: e})} 
                                    keyboardType="number-pad" 
                                    placeholder="Enter OTP" />
                            </Item>
                        </View>

                        <CustomBtn onPress={() => this.confirmCode()} width={90} title={'Send'} />

                        <View style={[styles.centerItem, styles.itemContainer]}>
                            <View style={styles.row}>
                            {resend ?     <TouchableOpacity onPress={() => {
                                    this.verifyPhoneNumber()
                                }}>
                                    <Text style={[styles.greenTxt, {paddingHorizontal: 5}]}>Resend the Code</Text>
                                </TouchableOpacity> :
                                    <CountDown
                                        ref={ref => this.countdown = ref}
                                        until={this.state.time}
                                        onFinish={() => this.setState({resend: true})}
                                        digitStyle={{backgroundColor: 'translate', marginTop: -20}}
                                        digitTxtStyle={{color: '#1CC625'}}
                                        timeToShow={['M', 'S']}
                                        timeLabels={{m: null, s: null}}
                                        size={20}
                                        showSeparator
                                        separatorStyle={{marginTop: -20}}
                                    />
                                }
                                {/* <Text>
                                    Or Back to
                                </Text>
                                <TouchableOpacity
                                onPress={() => {
                                    this.setState({confirm: null})
                                }}>
                                    <Text style={[styles.greenTxt, {paddingHorizontal: 5}]}>Login</Text>
                                </TouchableOpacity> */}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        height: heightPercentageToDP(6),
        width: Platform.OS === 'ios' ? widthPercentageToDP(40) : widthPercentageToDP(35),
    },
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
        height: heightPercentageToDP(4),
        width: widthPercentageToDP(7)
    },
    centerItem: {
        justifyContent:'center',
        alignItems:'center'
    },
    headingTxt: {
        fontSize: 32,
        fontWeight:'800'
    },
    greenTxt: {
        color: themeGreen
    },
    greyTxt: {
        color: themeGrey
    },
    itemContainer: {
        padding: 15
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    row: {
        flexDirection: 'row'
    }
})


const mapStateToProps = state => {
	return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
        confirmation: state.user.confirmation
	};
  };
  
  const mapDispatchToProps = {
    login, verifyPhoneNumber
  };


export default connect(mapStateToProps, mapDispatchToProps)(Login);




// import React, { useState } from 'react';
// import { Button, TextInput } from 'react-native';
// import auth from '@react-native-firebase/auth';

// export const Login = () => {
//   // If null, no SMS has been sent
//   const [confirm, setConfirm] = useState(null);

//   const [code, setCode] = useState('');

//   // Handle the button press
//   async function signInWithPhoneNumber(phoneNumber) {
//     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//     setConfirm(confirmation);
//   }

//   async function confirmCode() {
//     try {
//       await confirm.confirm(code);
//     } catch (error) {
//       console.log('Invalid code.');
//     }
//   }

//   if (!confirm) {
//     return (
//       <Button
//         title="Phone Number Sign In"
//         onPress={() => signInWithPhoneNumber('+923132723695')}
//       />
//     );
//   }

//   return (
//     <>
//       <TextInput value={code} onChangeText={text => setCode(text)} />
//       <Button title="Confirm Code" onPress={() => confirmCode()} />
//     </>
//   );
// }