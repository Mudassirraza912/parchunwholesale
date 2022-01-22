import React from 'react'
import {View, Text} from 'react-native'
import { connect } from 'react-redux';
import {signup} from '../../Redux/Actions/userAction'

class Signup extends React.Component {
    constructor(props){
        super(props);
    }




    render() {
        return (
            <View style={{flex: 1}}>
                <Text>
                    Signup
                </Text>
            </View>
        )
    }
}

const mapStateToProps = state => {
	return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
	};
  };
  
  const mapDispatchToProps = {
    signup,
  };


export default connect(mapStateToProps, mapDispatchToProps)(Signup);