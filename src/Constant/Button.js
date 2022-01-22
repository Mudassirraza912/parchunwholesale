import React from 'react'
import { TouchableOpacity, Text, StyleSheet} from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { themeGreen } from './color'

export const CustomBtn = ({
    onPress, 
    style, 
    width, 
    title, 
    disabled = false,
    titleStyle = {}
}) => {

    return(
        <TouchableOpacity 
        disabled={disabled}
        onPress={() => onPress()}
        activeOpacity={.6}
        style={!style ? {
            backgroundColor: disabled ? '#cdcdcd' : themeGreen,
            borderTopLeftRadius: 10,
            borderBottomRightRadius: 10,
            padding: 10, 
            width: widthPercentageToDP(width),
            marginVertical: 5,
        } : [{
            backgroundColor: disabled ? '#cdcdcd' : themeGreen,
            borderTopLeftRadius: 10,
            borderBottomRightRadius: 10,
            padding: 10, 
            width: widthPercentageToDP(width),
            marginVertical: 5,
            ...style
        }]}>
            <Text style={[{
            color:'#fff',
            textAlign:'center',
            fontWeight:'bold',
        }, titleStyle ]}>
                {title}
            </Text>
        </TouchableOpacity> 
    )
}
