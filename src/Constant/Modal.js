import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Modal from 'react-native-modal'
import { CustomBtn } from './Button'
import { themeGreen } from './color'

const UniversalModal = ({
    title = "Your order has been placed",
    discription = "You will receive a notification when you're nearby!",
    modalVisibel = false,
    setModalVisible = () => { },
    containerStyle = {},
    titleStyle = {},
    descriptionStyle = {},
    onPress = () => { },
    successIcon = true,
    buttons = [
        {
            onPress: () => {}, 
            style: {}, 
            width: 80,
            title: "Button Title"
        },
    ]
}) => {



    return (
        <Modal
            isVisible={modalVisibel}
            animationIn="zoomInUp"
            animationOut="zoomOutDown"
            backdropOpacity={0.4}
            coverScreen
            animationInTiming={1000}
            animationOutTiming={1000}
            onBackButtonPress={() => setModalVisible(false)}
            onBackdropPress={() => setModalVisible(false)}>
            <View style={[{ backgroundColor: "#fff", borderRadius: 20, paddingVertical: 20, alignItems: "center" }, containerStyle]}>

               {successIcon && <View style={styles.successContainer} />}

                <Text style={[styles.titleStyle, { width: "95%", textAlign: "center" , fontWeight: "bold", fontSize: 24}, titleStyle]}>{title}</Text>


                <Text style={[styles.titleStyle, { textAlign: "center", width: "85%" }, descriptionStyle]}>{discription}</Text>


                <View style={{ width: "100%", marginTop: 20 }}>
                    <FlatList 
                      data={buttons}
                      renderItem={({item, index}) => <CustomBtn {...item} /> }
                    />
                </View>
            </View>
        </Modal>
    )
}


export default UniversalModal;


const styles = StyleSheet.create({
    successContainer: {
        backgroundColor: "#FFBE00",
        height: 60,
        width: 60,
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    titleStyle: {
        marginTop: 20
    }
})
