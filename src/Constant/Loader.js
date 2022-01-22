import React, { Component } from 'react'
import { View, Modal } from 'react-native'
import { Spinner } from 'native-base'
import { themeGreen } from './color'

export default class Loader extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <View style={{ flex: 1, position: 'absolute', top: 0, bottom: 0,left: 0, right: 0 }}>
                <Modal
                    transparent={true}
                    visible={this.props.visible}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                        <Spinner color={themeGreen} />
                    </View>
                </Modal>

            </View>
        )
    }
}