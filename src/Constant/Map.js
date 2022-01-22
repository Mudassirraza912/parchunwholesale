import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { set } from 'react-native-reanimated';

export const Map = ({
    containerStyle = {},
    mapStyle = {},
    coords = null,
    onLocationChange = (location) => {}
}) => {
  
    const [focusedLocation, setFocusedLocation] = useState(coords
        ?
        coords :
        {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        })
    // useEffect(() => {
    //     setFocusedLocation()
    // }, [coords])
    return (
        <View style={[styles.container, containerStyle]}>

            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={[styles.map, mapStyle]}
                initialRegion={coords
                    ?
                    coords :
                    {
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                onRegionChange={(region) => {
                    setFocusedLocation(region)
                    onLocationChange(region)
                }}
            >
                <Marker 
                    coordinate={focusedLocation} 
                    draggable 
                    onDragEnd={(e) => {
                        setFocusedLocation({
                            ...focusedLocation,
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude
                        })
                        onLocationChange({
                            ...focusedLocation,
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude
                        })
                    }}
                />
            </MapView>
        </View>
    )
}

const { height } = Dimensions.get("screen")

const styles = StyleSheet.create({
    container: {
        height: Platform.OS == "ios" ? height - 90: height-70,
        width: "100%",
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        height: "100%",
        width: '100%',
    },
});