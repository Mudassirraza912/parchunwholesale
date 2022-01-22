import React, {useEffect, useState} from 'react'
import {View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, FlatList} from 'react-native'
import HeaderCustom  from '../../Constant/Header'
import { Tab, Tabs, ScrollableTab } from 'native-base';
import { themeGreen, themeGrey } from '../../Constant/color';
import NumericInput from 'react-native-numeric-input'
import RenderTabContent from '../../Constant/itemCardDetails';
import { getSubCategory, specificItemData } from '../../Redux/Actions/userAction'
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

const item = require('../../../assets/item.png')

const CateItems = (props) => {
    const {categoryDate, specificItemData, fetching, getSubCategory} = props
    const [cart, setCart] = useState(false)
    const [loading, setloading] = useState(true)
    const [cat, setCate] = useState()
    const [state, setState] = useState(0)
    useEffect(() => {
        const {itemId} = props.navigation.state.params  
        
        // setCate(categoryDate)
        // getSubCategory(itemId)
        
    }, [])

    useEffect(() => {
        if(!fetching) {
            setloading(false)
        }
    }, [fetching])

    

    return(
        <View style={styles.container}>
            <Spinner
                visible={loading}
                textContent={'Loading... '}
                textStyle={{color: "#fff", width:'100%', textAlign:'center'}}
                />
            <HeaderCustom 
                backIcon
                centerHeading={categoryDate && categoryDate[0].parentCategory}
                centerHeadingColor='#fff'
                navigation={props.navigation}
                cart    
                searchbar
                />
           
           {categoryDate && Array.isArray(categoryDate) && categoryDate.length > 0 ? <Tabs 
            tabBarBackgroundColor="#fff"
            tabBarUnderlineStyle={{backgroundColor: themeGreen}} renderTabBar={()=> <ScrollableTab />}>
                {categoryDate.map((item, index) => {
                    return(
                        <Tab 
                        key={index}
                        activeTabStyle={{backgroundColor:'#fff'}} 
                        textStyle={{color:'#9c9c9c'}} 
                        tabStyle={{backgroundColor:'#fff'}} 
                        activeTextStyle={{color: themeGreen}} 
                        heading={item.subCategoryName}
                        >
                           {item.itemData.length >  0 ?
                            <RenderTabContent
                             key={index}
                             onPress={(id) => {
                                //  specificItemData(id)
                             }}
                             data={item.itemData} 
                             navigation={props.navigation} 
                             showUnit 
                             showQty
                             /> : 
                             <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                                 <Text style={{fontSize: 24}}>Empty Item</Text>
                            </View>
                            }
                        </Tab>
                    )
                })}
            </Tabs> : 
            
            <View style={{flex: 1, justifyContent:'center', alignItems:'center', alignContent:'center'}}>
               {!loading ? <Text>Data Not Found</Text> : <Text></Text>}
            </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    productContainer: {
        flexDirection:'row',
        borderBottomWidth: 1,
        borderBottomColor: '#efefef',
        alignItems:'center'
    },
    itemContainer: {
        // padding: 10
    },
    productImg: {
        height: 100,
        width: 130
    },
    semiBoldTxt: {
        fontFamily: 'Nunito-Bold',
        paddingVertical: 5,
        letterSpacing: 1
    },
    boldTxt: {
        fontFamily: 'Nunito-Bold',
        paddingVertical: 5,
        letterSpacing: 1
    },
    itemContent: {
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    discountContainer: {
        borderRadius: 10,
        backgroundColor: 'red',
        padding: 2,
        width: 60
    },
    discounTxt: {
        color:'#fff',
        textAlign:'center',
        fontFamily: 'Nunito-Bold'
    },
    buttonContainer: {
        backgroundColor: themeGreen,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 10, 
        top: 15,
        // alignSelf: 'baseline'
    },
    crossPrice: {
        textDecorationLine:'line-through',
        fontWeight:'300'
    }
})

const mapStateToProps = state => {
	return {
        userDetails: state.user.userDetails,
        fetching: state.user.fetching,
        categoryDate: state.user.categoryDate,
	};
  };
  
  const mapDispatchToProps = {
    specificItemData, getSubCategory
  };


export default connect(mapStateToProps, mapDispatchToProps)(CateItems);