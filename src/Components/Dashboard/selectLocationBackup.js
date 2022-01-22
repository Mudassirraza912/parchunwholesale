import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Platform, Dimensions } from 'react-native'
import {CustomBtn} from '../../Constant/Button'
import Header from '../../Constant/Header'
import { Map } from '../../Constant/Map'

import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomModal from '../../Constant/Modal'
import { useState } from 'react'
import Geolocation from '@react-native-community/geolocation';

const Selectlocation = ({ navigation }) => {
    const [succesModal, setsuccesModal] = useState(false)
    const [focusedlocation, setFocusLocation] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0122,
        longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
    })
    const location = navigation.getParam('location', undefined)


    useEffect(() => {
        _getLocationAsync()
    }, [])

    useEffect(() => {
       if(location) {
            setFocusLocation({
                ...focusedlocation,
                ...location
            })
       }
    }, [location])


    const _getLocationAsync = async () => {
        Geolocation.getCurrentPosition(location => {
            setFocusLocation({
                ...focusedlocation,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
          })
      };

    const saveLocation = () => {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + focusedlocation.latitude + ',' + focusedlocation.longitude + '&key=AIzaSyBZKJx8TmPHryjGnjWiY8FNjnmLBs4FYpE')
        .then((response) => response.json())
        .then((responseJson) => {
            var address = JSON.stringify(responseJson)
            var AddressObj = JSON.parse(address)
            var finalAdd = AddressObj.results[0].formatted_address
            var result = finalAdd.toLowerCase().indexOf("orangi")
            console.log('result', result, "finalAdd", finalAdd, AddressObj.results[0])

            if(result != -1){
                navigation.navigate('Dashboard')
            }
        
        })
    }

    return (
        <View>
            <Header
                centerHeading={"Select Location"}
                centerHeadingColor="#fff"
            />
            <SafeAreaView >

                <CustomModal
                    modalVisibel={succesModal}
                    successIcon
                    title="Location Saved!"
                    discription={"You can start browsing nearby restaurant to your place."}
                    setModalVisible={setsuccesModal}
                    buttons={[{
                        title: "Close",
                        onPress: () => setsuccesModal(false)
                    }]}
                />

                <Map coords={focusedlocation} onLocationChange={(location) => {
                    setFocusLocation(location)
                }} />
{/* 
                <TouchableOpacity onPress={() => navigation.navigate("SearchGooglePlaces")} activeOpacity={0.7} style={styles.inputContainer}>
                    <Ionicons name={"search"} size={20} />
                    <TextInput
                        editable={false}
                        placeholder="Enter Location"
                        style={{ paddingHorizontal: 10 }}
                    />
                </TouchableOpacity> */}

                {/* <CustomBtn
                    title={"Save Location"}
                    style={{ position: "absolute", bottom: 40 }}
                    onPress={() => setsuccesModal(true)}
                /> */}

            <CustomBtn 
                width={90} 
                style={{ position: "absolute", bottom: 40, alignSelf: 'center' }}
                title={"Save Location"}
                onPress={saveLocation}
            />

            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#fff',
        flex: 1,
    },
    inputContainer: {
        position: "absolute",
        top: 20,
        backgroundColor: "#fff",
        width: "90%",
        alignSelf: "center",
        paddingVertical: Platform.OS == "android" ? 0 : 15,
        borderColor: "#CFD5DC",
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    }
})

export default Selectlocation;