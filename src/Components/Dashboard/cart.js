import { firebase } from '@react-native-firebase/firestore';
import { Toast } from 'native-base';
import React, {useState, useEffect} from 'react'
import {View, Text, Image, TouchableOpacity, ScrollView, Styel, StyleSheet, Platform, Alert,} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { add } from 'react-native-reanimated';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { connect, useDispatch, useSelector } from 'react-redux';
import { themeGreen } from '../../Constant/color';
import Header from '../../Constant/Header'
import { getCarItem, placeOrder, checkPriceUpdation} from '../../Redux/Actions/cartActions';
import { getOrders } from '../../Redux/Actions/userAction'
import Step1 from './cartSteps/step1';
import Step2 from './cartSteps/step2';
import Step3 from './cartSteps/step3';
import EmptyCart from './emptyCart';
import {FETCHING_START, FETCHING_ERROR} from '../../Redux/Constants/constant'
const Cart = (props) => {
    // PROP ITEMS
    const { cartItems, placeOrder, userDetails, getCarItem, fetching, getOrders, appliedPromo } = props

    // STATES
    const [step, setStep] = useState(0)
    const [name, setname] = useState('')
    const [phone, setphone] = useState('')
    const [address, setaddress] = useState('')
    const dispatch = useDispatch()


    // ACTIONS
    const handleSteppers = (e) => {
        if(e == 'prev') {
            setStep(step - 1)
        }else {
            setStep(step + 1)
        }
    }

    // HANDLEW STEP 2 ONCHANGE
    const handleOnChange = (type, e) => {
        switch (type) {
            case 'name':
                setname(e)
                break;
            case 'phone':
                setphone(e)
                break;
            case 'address':
                setaddress(e)
                break;
            default:
                break;
        }
    }


    // CALCULATE ESTIMATE
    var totalAmount = 0
    if(cartItems) {
        cartItems.map((val, index) => {
            if(val.itemSale) {
                totalAmount += Number(val.itemSale) * Number(val.quantity)
            }else {
                totalAmount += Number(val.itemPrice) * Number(val.quantity)
            }
        }) 
        if (totalAmount < 2000) {
            totalAmount += 45 
        }
    }

    if(appliedPromo) {
        if(appliedPromo[0].freeShipping) {
            totalAmount = (totalAmount > 2000 ? totalAmount : totalAmount - 45)
        }
        totalAmount = totalAmount - appliedPromo[0].couponAmount
    }

    // ORDE PLACE FUNCTION
    const onSubmit = () => {
        var obj = {
            name: name,
            phoneNumber: phone,
            address: address,
            uid: userDetails && userDetails._user && userDetails._user.uid,
            totalAmount: totalAmount,
            status: 'orderplaced',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            appliedPromo: appliedPromo
        }
        placeOrder(obj, cartItems)
        .then((res) => {
            getCarItem(userDetails && userDetails._user && userDetails._user.uid)
            getOrders(userDetails && userDetails._user && userDetails._user.uid)
            Alert.alert("Alert", "Order placed successfully")
            props.navigation.navigate("Dashboard")
        })
        .catch((err) => {
            Alert.alert("Alert", "Order Place Failed")
            console.log("err placeOrder", err)
        })
    }

    // PRICE CHANGING CHECKER
    useEffect(() => {
        dispatch({type: FETCHING_START})
        async function fetchMyAPI() {
            try {
                let { status } = await checkPriceUpdation(cartItems)
                if(status) {
                    getCarItem(userDetails && userDetails._user && userDetails._user.uid)
                    dispatch({type: FETCHING_ERROR})
                }
            } catch (error) {
                dispatch({type: FETCHING_ERROR})
        }
    }
    fetchMyAPI()
    }, [])

    //VIEW
    if(!cartItems) {
        return (
            <EmptyCart navigation={props.navigation} />
        )
    }else {
        return(
            <View style={styles.container}>
                <Spinner 
                    visible={step == 0 ? false : fetching}
                    textContent={'Loading... '}
                    textStyle={{color: "#fff", width:'100%', textAlign:'center'}}
                />
                <Header 
                backIcon
                centerHeading="My Cart"
                centerHeadingColor="#fff"
                navigation={props.navigation}
                searchbar
                />
                <ProgressSteps topOffset={15} marginBottom={30} activeStep={step} >
                    <ProgressStep removeBtnRow previousBtnDisabled label="1.Your Bill">
                        <Step1 totalAmount={totalAmount} navigation={props.navigation} />
                    </ProgressStep>
                    <ProgressStep removeBtnRow label="2.Delivery Details">
                        <Step2 handleOnChange={handleOnChange} navigation={props.navigation} name={name} phoneNum={phone} address={address} />
                    </ProgressStep>
                    <ProgressStep removeBtnRow label="3.Confirm">
                        <Step3 totalAmount={totalAmount} name={name} address={address} phone={phone}  navigation={props.navigation} />
                    </ProgressStep>
                </ProgressSteps>
                <View style={[styles.rowStyle, styles.spacebtw]}>
                {step != 0 ? <TouchableOpacity onPress={() => handleSteppers('prev')} style={styles.buttonContainer}>
                        <Text style={styles.discounTxt}>
                            Prev
                        </Text>
                    </TouchableOpacity> :
                    <View />
                    }
                    
                    {step != 2 ?
                    <>
                    {((name && phone && address) || (step == 0)) ?
                    <TouchableOpacity onPress={() => handleSteppers('next')} style={styles.buttonContainer}>
                        <Text style={styles.discounTxt}>
                            Next
                        </Text>
                    </TouchableOpacity> : null}
                    </>
                    :
                    <TouchableOpacity onPress={() => {
                        onSubmit()
                    }} style={styles.buttonContainer}>
                        <Text style={styles.discounTxt}>
                            Submit
                        </Text>
                    </TouchableOpacity> 
                }
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
    discounTxt: {
        color:'#fff',
        textAlign:'center',
        fontFamily: 'Nunito-Bold'
    },
    buttonContainer: {
        backgroundColor: themeGreen,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 10, 
        width: widthPercentageToDP(35),
        marginVertical: 5
        // alignSelf: 'baseline'
    },
})

const mapStateToProps = state => {
	return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
        cartItems: state.cart.cartItems,
        appliedPromo: state.cart.appliedPromo
	};
  };
  
  const mapDispatchToProps = {
        placeOrder,getCarItem, getOrders
  };


export default connect(mapStateToProps, mapDispatchToProps)(Cart);