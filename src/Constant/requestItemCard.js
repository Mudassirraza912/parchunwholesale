import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, Alert } from 'react-native'
import {Label, Input, Item} from 'native-base'
import {CustomBtn} from '../Constant/Button'
import { connect } from 'react-redux'
import { requestItem } from '../Redux/Actions/userAction'
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay'

const RequestItem = ({ requestItem , fetching, userDetails}) => {
    const [itemName, setItemName] = useState('')
    
    useEffect(() => {
      
    }, [])

    const submitReq = async () => {
        if(itemName) {
            await requestItem(itemName,  (userDetails && userDetails.token) ? userDetails.token : "")
            setItemName('')
        }else {
            Toast.show("Name of a Product or Brand is required to request!", Toast.SHORT, [
                'UIAlertController',
              ]);
        }
    }

    return(
        <View style={[styles.container, styles.itemConainer]}>
            <Text style={[styles.itemConainer, styles.textCenter, styles.mdFont]}>
             Are we missing a product or your favorite brand?
            </Text>

            <Text style={styles.itemConainer, styles.mdFont-2, {fontWeight: 'bold', marginHorizontal: 10}}>Type Product/brand name</Text>
            <Item fixedLabel regular style={{borderRadius: 10}} success>
                <Input value={itemName} placeholder="Sunsilk, close-up toothpaste, etc." onChangeText={(text) => setItemName(text)}/>
            </Item>
            <CustomBtn onPress={() => submitReq()} style={{alignSelf: 'center', marginVertical: 10}}  width={90} title={'Request Product'} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginVertical: 30
    },
    itemConainer: {
        padding: 15
    },
    textCenter: {
        textAlign:'center'
    },
    mdFont: {
        fontSize: 20
    },
    itemBorder: {
        borderBottomWidth: 0
    }
})


const mapStateToProps = state => {
	return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
	};
  };
  
  const mapDispatchToProps = {
    requestItem
  };


export default connect(mapStateToProps, mapDispatchToProps)(RequestItem);