import React from 'react';
import { Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Header from '../Constant/Header'

const GooglePlacesInput = ({navigation}) => {
    return (
        <>
        <Header
                centerHeading={"Search Location"}
                centerHeadingColor="#fff"
            />
        <GooglePlacesAutocomplete
            currentLocation
            placeholder='Search'
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                let a = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${details.place_id}&key=AIzaSyAYcpx0i7X_mqmkfp-tTdplWiFvqok2eYE`
                    fetch(a)
                        .then((resp) => resp.json())
                        .then((data) => {
                            var obj = {
                                latitude: data.result.geometry.location.lat,
                                longitude: data.result.geometry.location.lng
                            }
                            navigation.navigate('Selectlocation', {
                                location: obj
                            })
                        })
            }}
            query={{
                key: 'AIzaSyAYcpx0i7X_mqmkfp-tTdplWiFvqok2eYE',
                language: 'en',
                components: 'country:pk'
            }}
            onFail={err => console.log("onFail", err)}
            onNotFound={err => console.log("onNotFound", err)}
            styles={{ 
                container: {
                    paddingTop: Platform.OS == "ios" ? 40 : 0
                }
             }}
        />
        </>
    );
};

export default GooglePlacesInput;