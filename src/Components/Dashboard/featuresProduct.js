import { Input, Item, Spinner } from 'native-base';
import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import Header from '../../Constant/Header';
import { searchByTxt } from '../../Redux/Actions/filter';
import RenderTabContent from '../../Constant/itemCardDetails';
import RequestItem from '../../Constant/requestItemCard';

const FeatureProduct = (props) => {
    const { fetching, featureProduct } = props
    return(
        <View style={{paddingBottom: 150}}>
            <Header 
                backIcon
                centerHeading="Feature Products"
                centerHeadingColor='#fff'
                navigation={props.navigation}
                />
            <View style={{alignSelf:'center'}}>

               {featureProduct ? 
                    <View style={styles.itemContainer}> 
                        <RenderTabContent
                            onPress={(id) => {
                                // specificItemData(id)
                            }}
                            data={featureProduct} 
                            navigation={props.navigation} 
                            showunit
                            showQty
                            />
                    </View> 
                    : 
                    <View>
                      {fetching ?
                        <Spinner size="large" />
                        :
                        <Text>Feature product not found!</Text>
                        }
                    </View>
                }
            </View>   
        </View>
    )
}


const styles = StyleSheet.create({
    searchContainer : { 
        width: '95%',
        marginTop: '2%', 
        borderRadius: 10, 
        alignSelf:'center',
    },
    searchInput: {
        color:'#bdbdbd', 
        backgroundColor:'#fff', 
        borderRadius: 5,
    },
    itemContainer: {
        paddingVertical: 15,
    }
})

const mapStateToProps = state => {
	return {
        userDetails: state.user.userDetails,
        fetching: state.filterReducer.fetching,
        featureProduct: state.cart.featureProduct
	};
  };
  
  const mapDispatchToProps = {
  };


export default connect(mapStateToProps, mapDispatchToProps)(FeatureProduct);