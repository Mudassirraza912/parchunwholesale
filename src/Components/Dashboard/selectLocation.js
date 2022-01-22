import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Platform, Dimensions, Alert } from 'react-native'
import {CustomBtn} from '../../Constant/Button'
import Header from '../../Constant/Header'
import UniversalModal from '../../Constant/Modal'
import {Picker} from '@react-native-picker/picker';
import { getLocation } from '../../Redux/Actions/userAction'
import { connect } from 'react-redux'
const Selectlocation = ({ navigation, getLocation, locations }) => {
    const [succesModal, setsuccesModal] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState("");

    useEffect(() => {
        getLocation()
    }, [])
  
    const onSelect = () => {
        
        if(selectedLocation == "Other"){
            // alert("alert")
            setsuccesModal(true)
        }else{
            navigation.navigate('Dashboard')
        }
    }
    return (
        <View style={{flex: 1}}>
            <Header
                centerHeading={"Select Location"}
                centerHeadingColor="#fff"
            />
            <UniversalModal
                    modalVisibel={succesModal}
                    title="Ooops!"
                    discription="We are not serving here"
                    successIcon={false}
                    setModalVisible={() => setsuccesModal(false)}
                    buttons={[{
                        title: "Try another location",
                        onPress: () => setsuccesModal(false),
                        style: {alignSelf: 'center'},
                        width: 80,
                    }]}
                />
            <SafeAreaView >
                <Picker
                    selectedValue={selectedLocation}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedLocation(itemValue)
                    }}>
                    {
                        locations.length > 0 && 
                        [...locations, {name: "Other"}].map((val, ind) => {
                            console.log("val", val.name)
                            return <Picker.Item value={val.name} label={val.name} key={ind} />
                        })
                    }
                </Picker>
              
            </SafeAreaView>
            <View style={{position: 'absolute', bottom: 10, width: '100%', alignItems:'center'}}>
                   <CustomBtn title="Save" onPress={() =>  onSelect()} width={90} />
               </View>
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

const mapStateToProps = state => {
	return {
        fetching: state.user.fetching,
        locations: state.user.locations,
	};
  };
  
  const mapDispatchToProps = {
    getLocation
  };


export default connect(mapStateToProps, mapDispatchToProps)(Selectlocation);