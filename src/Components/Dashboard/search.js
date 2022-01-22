import { Input, Item, Spinner } from 'native-base';
import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import Header from '../../Constant/Header';
import { searchByTxt } from '../../Redux/Actions/filter';
import RenderTabContent from '../../Constant/itemCardDetails';
import RequestItem from '../../Constant/requestItemCard';

const SearchingPage = (props) => {
    const { searchByTxt, searchItems, fetching } = props
    return(
        <View>
            <Header 
                backIcon
                // centerHeading="Categories"
                logo
                centerHeadingColor='#fff'
                navigation={props.navigation}
                />
            <View style={{alignSelf:'center'}}>
                <Item style={styles.searchContainer}>
                    <Input 
                    style={styles.searchInput} 
                    autoFocus
                    // value={text} 
                    placeholderTextColor="#bdbdbd" 
                    onChangeText={(e) => {
                        searchByTxt(e)
                        // setText(e)
                    }} placeholder='Search for product' />
                </Item>


               {searchItems ? 
                    <View style={styles.itemContainer}> 
                        <RenderTabContent
                            onPress={(id) => {
                                // specificItemData(id)
                            }}
                            data={searchItems} 
                            navigation={props.navigation} 
                            showUnit
                            showQty
                            />
                    </View> : 
                    
                    <View>
                      {fetching && 
                        <Spinner size="large" />
                        }
                    </View>
                }
             {/* <RequestItem /> */}
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
        paddingVertical: 15
    }
})

const mapStateToProps = state => {
	return {
        userDetails: state.user.userDetails,
        fetching: state.filterReducer.fetching,
        searchItems: state.filterReducer.searchItems,
	};
  };
  
  const mapDispatchToProps = {
    searchByTxt
  };


export default connect(mapStateToProps, mapDispatchToProps)(SearchingPage);