import React from 'react'
import {View, Image, Text, StatusBar, Platform} from 'react-native'
const logo = require('../../../assets/logo.png')
import * as Progress from 'react-native-progress';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { themeGreen } from '../../Constant/color';
import { checkVersion } from "react-native-check-version";
import { Alert } from 'react-native';
import { Linking } from 'react-native';


export default class Splash extends React.Component {
    constructor (props){
        super(props)
        this.state = {
            progress: 0
        }
    }

    componentDidMount = async () => {
        checkVersion()
        .then(versionInfo => {
            console.log('versionInfo', versionInfo)
                // if (versionInfo.needsUpdate) {
                //     Alert.alert("Update Required", "To use this app you need to update it.", [
                //         {text: 'OK', onPress: () => Linking.openURL('https://play.google.com/store/apps/details?id=com.parchunapp')},
                //       ],
                //       { cancelable: false })
                // }else {
                //     setTimeout(() => this.props.navigation.navigate('App'), 4000)
                // }
        })
        .catch(err => {
        //     console.log('err versionInfo', err)
        //     setTimeout(() => this.props.navigation.navigate('App'), 4000)
        })
        setTimeout(() => this.props.navigation.navigate('App'), 4000)
        this.updateProgress()
       
    }

    updateProgress = () => {
        setInterval(() => {
          this.setState({ progress: this.state.progress + 0.25 })
        }, 1000);
        if (this.state.progress > 1) {
          this.updateProgress()
        }
      }


    render () {
        return(
            <View style={{flex: 1, height:'100%', width:'100%', backgroundColor:"#fff", justifyContent:'center', alignContent:'center'}}>
            <StatusBar backgroundColor="#000" />
            <Image source={logo}  style={Platform.OS === 'ios' ? {height:hp(15), width: wp(94), alignSelf:'center'} : {height:hp(15), width: wp(90), alignSelf:'center'}} />


                    <Progress.Bar
                    progress={this.state.progress}
                    width={200}
                    color={themeGreen}
                    unfilledColor="#000"
                    borderWidth={0}
                    height={2}
                    style={{ position: 'absolute', bottom: 30, alignSelf:'center' }}
                />

            </View>
        )
    }
}