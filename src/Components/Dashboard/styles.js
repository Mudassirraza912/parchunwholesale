import { StyleSheet } from 'react-native'
import { themeGreen, themeGrey } from '../../Constant/color'

export const styles = StyleSheet.create({
    shadowBox: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    itemContainer: {
        padding: 10
    },
    row: {
        flexDirection: 'row'
    },
    spaceBtw: {
        justifyContent: 'space-between'
    },
    themeGreenBold: {
        color: themeGreen,
        fontFamily: 'Nunito-Bold'
    },
    regularBold: {
        fontFamily: 'Nunito-Bold'
    },
    regularGreyTxT: {
        color: themeGrey,
        fontFamily: 'Nunito-Regular'
    },
    regularTxT: {
        color: "#000",
        fontFamily: 'Nunito-Regular'
    },
    imgIcon: {
        width: 25,
        height: 25,
        paddingHorizontal: 5,
        // left: 5,
    },
    promoContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', borderColor: '#efefef', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, margin: 10 }
})