import { CART_FETCHED, EMPTY_PROMO, FEATURED_PRODUCT_FETCHED, FETCHING_ERROR, FETCHING_PROCESSED, FETCHING_START, PRICE_CHECKER_UPDATE, PROMO_APPLIED } from "../Constants/constant"
import firestore from '@react-native-firebase/firestore';
import itemDetail from "../../Components/Dashboard/itemDetail";
import uniqueId  from 'react-native-unique-id'
import { Alert } from "react-native";
import NavigationService from "../../Navigation/NavigationService";
const cartItemsRef = firestore().collection("cartitems")

import { v4 as uuidv4 } from 'uuid';


//GET CART ITEMS
export function getCarItem(uid) {
    return function (dispatch, getState) {
        var arr = []
        dispatch({type: FETCHING_START})
        cartItemsRef
        .where("uid", "==" , uid)
        .where("status", "==", "pending")
        .get()
        .then((cartSnapshot) => {
            if(!cartSnapshot.empty) {
                cartSnapshot.forEach((cartItem) => {
                    var cartItemData = cartItem.data()
                    cartItemData.docKey = cartItem.id
                    arr.push(cartItemData)
                })
                dispatch({type: CART_FETCHED, payload: arr})
                dispatch({type: FETCHING_ERROR})
            }else {
                dispatch({type: CART_FETCHED, payload: null})
                dispatch({type: FETCHING_ERROR})
            }
        })
        .catch(err => {
            console.log("getCarItem error", err)
            dispatch({type: FETCHING_ERROR})
        })
    }
}

//ADD TO CART
export function addToCart(itemobj, uid) { 
    // dispatch({type: FETCHING_ERROR})
    return function (dispatch) {
        dispatch({type: FETCHING_START})
        var obj = {
            ...itemobj,
            status: 'pending',
            uid: uid
        }

        return new Promise((resolve, reject) => {
            cartItemsRef
            .where("uid", "==" , uid)
            .where("status", "==", "pending")
            .where('key', '==', itemobj.key)
            .get()
            .then((cartFilterSnapshot) => {
                if(!cartFilterSnapshot.empty) {
                    cartFilterSnapshot.forEach((cartItem) => {
                        var cartFilterItem = cartItem.data()
                        cartItemsRef.doc(cartItem.id).update({"quantity": itemobj.quantity})
                    })
                    dispatch({type: FETCHING_ERROR})
                    resolve({status: true})
                    // Alert.alert("Alert", "Quantity added to this item")
                }else {
                    firestore().collection("cartitems").add(obj)
                    dispatch({type: FETCHING_ERROR})
                    resolve({status: true})
                    // Alert.alert("Alert", "Item added to Cart")
                }
            })
            .catch((err) => {
                Alert.alert("Alert", "Add item in Cart failed!")
                console.log("error addToCart", err)
                dispatch({type: FETCHING_ERROR})
                reject({status: false})
            })
        })
    }
}

// DELETE ITEM FROM CART
export function deleteItem (itemObj) {
    console.log("FUNC CALLED deleteItem", itemObj)
    return function (dispatch) {
        return new Promise(async (resolve, reject) => {
            try {
                var deleteResult = await cartItemsRef.doc(itemObj.docKey).delete()
                resolve({status: true})
              } catch (error) {
                reject({status: false})
                console.log("error deleteItem", error)
              }
        })
    }
}
  
//PLACE ORDER
export function placeOrder(obj, cartItem) {
    return function (dispatch) {
        return new Promise((resolve, reject) => {
                var res = uuidv4()
                // console.log('orderId', res )
                obj.orderId = res
                cartItem.map((val) => {
                    cartItemsRef
                    .doc(val.docKey)
                    .update({status: 'orderplaced', orderId: res})
                })
                firestore().collection('orders').add(obj)
                dispatch({type: EMPTY_PROMO})
                resolve({status: true})
        })
    }
}

export const getFeaturedProducts = () => {
    var arr = []
    return function (dispatch) {
      dispatch({type: FETCHING_START})
      firestore().collection("items").where("isFeatured", "==", true).get()
      .then((snapshot) => {
        if(!snapshot.empty) {
            snapshot.forEach((snapshotObj) => {
                var data = snapshotObj.data()
                data.key = snapshotObj.id
                data.quantity = 0
                arr.push(data)
            })
          dispatch({type: FEATURED_PRODUCT_FETCHED, payload: arr})
        }else {
          dispatch({type: FETCHING_ERROR})
        }
      })
      .catch((err) => {
        console.log("err getFeaturedProducts", err)
        dispatch({type: FETCHING_ERROR})
      })
    }
  }


//   export const checkPriceUpdation = (items) => {
//       console.log("checkPriceUpdation items", items)
//         return function (dispatch) {
//             items.map((value, index) => {
//                 firestore().collection('items').doc(value.key).get()
//                 .then((snapshot) => {
//                         var data = snapshot.data()
//                         console.log("checkPriceUpdation data", data);
//                         if(data.itemSale != value.itemSale) {
//                             console.log("condition true")
//                             dispatch({type: PRICE_CHECKER_UPDATE, payload: true})
//                         }
//                         else {
//                             console.log("condition false", index, items.length)
//                             if(index == items.length) {
//                              console.log("under condition false")
//                                 dispatch({type: PRICE_CHECKER_UPDATE, payload: false})
//                             }
//                         }
//                   })
//                   .catch((err) => {
//                     console.log("err checkPriceUpdation", err)
//                     dispatch({type: PRICE_CHECKER_UPDATE, payload: false})
//                   })
//             })
//         }
//   }

export const checkPriceUpdation = async (items) => {
    console.log("checkPriceUpdation items", items)
        return new Promise((resolve, reject) => {
           items.map((value, index) => {
              firestore().collection('items').doc(value.key).get()
              .then((snapshot) => {
                      var data = snapshot.data()
                      console.log('data.itemSale != value.itemSale || data.itemPrice != value.itemPrice', data.itemSale != value.itemSale , data.itemPrice != value.itemPrice)
                      if(data.itemSale != value.itemSale || data.itemPrice != value.itemPrice) {
                          console.log("condition true")
                          firestore().collection('cartitems').doc(value.docKey).update({itemSale: data.itemSale, itemPrice: data.itemPrice})
                          .then((res) => {
                              console.log("price updated")
                          })
                          .catch((err) => {
                            console.log("price updated error", err)
                          })
                          if(index+1 == items.length) {
                            console.log("under condition false")
                                resolve({status: true})
                           }
                      }
                      else {
                          console.log("condition false", index, items.length)
                          if(index+1 == items.length) {
                           console.log("under condition false")
                                resolve({status: true})
                          }
                      }
                })
                .catch((err) => {
                  console.log("err checkPriceUpdation", err)
                        resolve({status: false})
                })
          })
        })
      }

export const applyPromo = (promoCode, totalAmount) => {
    return  function (dispatch) {
        const arr = []
        firestore().collection('coupons').where('couponCode', "==", promoCode).where("status", "==", "active").get()
        .then((snapshot) => {
            if(!snapshot.empty) {
                snapshot.forEach((snapshotObj) => {
                    var data = snapshotObj.data()
                    data.key = snapshotObj.id
                    if(totalAmount >= data.couponMinimumAmount) {
                        arr.push(data)
                        dispatch({type: PROMO_APPLIED, payload: arr})
                        Alert.alert('Promo Applied!')

                    }else {
                        Alert.alert('You are not eligible for this promo')
                        dispatch({type: FETCHING_ERROR})
                    }
                })
            }else {
                Alert.alert("Alert", "Invalid Promo code")
              dispatch({type: FETCHING_ERROR})
            }
          })
          .catch((err) => {
            console.log("err applyPromo", err)
            dispatch({type: FETCHING_ERROR})
          })
    }
}

export const removePromo = (promoCode, totalAmount) => {
    return  function (dispatch) {
        dispatch({type: EMPTY_PROMO})
        Alert.alert('Promo removed')
    }
}