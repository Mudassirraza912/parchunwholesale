import React from 'react'
import { Clipboard } from 'react-native'
import Toast from "react-native-tiny-toast"


export const copyText = (text) => {
    Toast.show('Copied!')
    Clipboard.setString(text)
    // alert("Copied!")
}