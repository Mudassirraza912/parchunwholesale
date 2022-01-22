import axios from 'axios'
// import { NavigationActions } from 'react-navigation'
import NavigtionService from '../../Navigation/NavigationService'
import { Alert, AsyncStorage } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { FETCHING_ERROR, FETCHING_START, CATEGORY_DATA_FETCHED, CATEGORY_FETCHED, SPECIFIC_ITEM_FETCHED, LOGOUT_PROCESSED, VERIFY_PHONE_NUMBER_PROCESSING, VERIFY_PHONE_NUMBER_PROCESSED, VERIFY_PHONE_CODE_PROCESSED, ORDER_FETCHED, BANNER_FETCHED, USER_DATA_FETCHED, TC_FETCHED, LOCATION_FETCHED } from '../Constants/constant';
import NavigationService from '../../Navigation/NavigationService';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';


const categoryRef = firestore().collection("category")
const subCategoryRef = firestore().collection("subCategory")
const itemRef = firestore().collection("items")

export function verifyPhoneNumber(phoneNumber) {
  return function (dispatch) {
    dispatch({ type: VERIFY_PHONE_NUMBER_PROCESSING })
    return new Promise((resolve, reject) => {
      auth().signInWithPhoneNumber('+923' + phoneNumber, true)
        .then((response) => {
          dispatch({ type: VERIFY_PHONE_NUMBER_PROCESSED, payload: response })
          resolve({ status: true, data: response })
        })
        .catch((error) => {
          dispatch({ type: FETCHING_ERROR })
          resolve({ status: false, data: error })
          // Alert.alert("Errot", error.toString())
          console.log("error verifyPhoneNumber", error)
        })
    })
  }
}

export function login(user) {
  return function (dispatch) {
    dispatch({ type: "LOGIN_PROCESSING" });
    dispatch({ type: "LOGIN_PROCESSED", payload: user })
    dispatch({ type: VERIFY_PHONE_CODE_PROCESSED, payload: null })
    NavigationService.navigate("Dashboard")
  }
}

export function getCategories() {
  return async function (dispatch) {
    var arr = []
    dispatch({ type: FETCHING_START })
    categoryRef.get()
      .then(documentSnapshot => {
        if (!documentSnapshot.empty) {
          documentSnapshot.forEach(element => {
            var data = element.data()
            data.key = element.id
            arr.push(data)
          });
          dispatch({ type: CATEGORY_FETCHED, payload: arr })
        } else {
          dispatch({ type: FETCHING_ERROR })
        }
      })
      .catch(err => {
        console.log("err err", err)
        dispatch({ type: FETCHING_ERROR })
      })
  }
}

export function getSubCategory(id) {
  return function (dispatch) {
    var arr = []
    dispatch({ type: FETCHING_START })
    subCategoryRef.where('parentCategoryId', '==', id)
      .get()
      .then((documentSnapshot) => {
        if (!documentSnapshot.empty) {
          documentSnapshot.forEach(subcategorySnap => {
            var data = subcategorySnap.data()
            
            itemRef.where("categoryId", "==", subcategorySnap.id)
              .get()
              .then(ItemSnapShot => {
                data.itemData = []
                if (!ItemSnapShot.empty) {
                  ItemSnapShot.forEach((itemElement) => {
                    var ItemSnapShotData = itemElement.data()
                    ItemSnapShotData.key = itemElement.id
                    ItemSnapShotData.quantity = 0
                    data.itemData.push(ItemSnapShotData)
                  })
                  
                  
                } else {
                 
                }
                arr.push(data)
                  if (arr.length == documentSnapshot.size) {
                    dispatch({ type: CATEGORY_DATA_FETCHED, payload: arr  })
                  }
                // setTimeout(() => NavigationService.navigate("CateItems"), 2000)
              })
              
              .catch(err => {
                dispatch({ type: FETCHING_ERROR })
                console.log("itemRef err", err)
              })
              
              
            })
               
          // if (arr.length > 0) {
          //   dispatch({ type: CATEGORY_DATA_FETCHED, payload: Array.isArray(arr) ? arr : [] })
          // }
        } else {
          dispatch({ type: FETCHING_ERROR })
        }



      })
      .catch((err) => {
        console.log("err err", err)
        dispatch({ type: FETCHING_ERROR })
      })

  }
}

export function specificItemData(id) {
  return function (dispatch) {
    dispatch({ type: FETCHING_START })
    itemRef.doc(id).get()
      .then((itemSnap) => {
        var data = itemSnap.data()
        data.key = itemSnap.id,
          data.quantity = 0
        dispatch({ type: SPECIFIC_ITEM_FETCHED, payload: data })
        NavigationService.navigate("ItemDetails")
      })
      .catch(err => {
        console.log("error specificItemData", err)
        dispatch({ type: FETCHING_ERROR })
      })
  }
}

export function getOrders(uid) {
  console.log("getOrders getOrders")
  return function (dispatch) {
    var arr = []
    var num = 1
    dispatch({ type: FETCHING_START })
    firestore().collection('orders')
      .where("uid", "==", uid)
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
            querySnapshot.forEach((orderData) => {
            var orderData1 = orderData.data()
            orderData1.docKey = orderData.id
            orderData1.items = []
            firestore().collection("cartitems")
            .where("orderId", "==", orderData1.orderId)
            .get()
            .then(snanShop => {
                snanShop.forEach((element) => {
                    var data = element.data()
                    data.docKey = element.id
                    orderData1.items.push(data)
                })
            })
            arr.push(orderData1)
          })
          dispatch({ type: ORDER_FETCHED, payload: arr })
        } else {
          dispatch({ type: FETCHING_ERROR })
        }
      })
      .catch(err => {
        console.log(`error getOrders: ${err}`);
      })
  }
}

export function logoutAct() {
  return function (dispatch) {
    dispatch({ type: LOGOUT_PROCESSED })
  }
}

export const getBanners = () => {
  var arr = []
  return function (dispatch) {
    dispatch({ type: FETCHING_START })
    firestore().collection("banners")
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          dispatch({ type: FETCHING_ERROR })
        } else {
          snapshot.forEach((bannerSnapshoht) => {
            const bannerData = bannerSnapshoht.data()
            arr.push(bannerData.bannerUrl)
          })
          dispatch({ type: BANNER_FETCHED, payload: arr })
        }
      })
      .catch((err) => {
        console.log("err getBanners", err)
        dispatch({ type: FETCHING_ERROR })
      })

  }
}

export const requestItem = (itemName, token) => {
  return function (dispatch) {
    dispatch({ type: FETCHING_START })
    firestore().collection("ItemRequests").add({ itemName: itemName, token: token, createdAt: firestore.FieldValue.serverTimestamp() })
      .then((res) => {
        dispatch({ type: FETCHING_ERROR })
        Toast.show('Item Request Sent!', Toast.SHORT, [
          'UIAlertController',
        ]);
        return;
      })
      .catch((err) => {
        dispatch({ type: FETCHING_ERROR })
        Toast.show(err.message, Toast.SHORT, [
          'UIAlertController',
        ]);
        console.log("err requestItem", err)
        return
      })
  }
}

export const addUser = (obj, uid, token) => {
  return function (dispatch) {
    dispatch({ type: FETCHING_ERROR })
    firestore().collection("users").where("uid", "==", uid).get()
      .then(async (user) => {
        console.log('check addUser', user)
        if (user.empty) {
          console.log("Empty", token)
          await firestore().collection("users").add({ "displayName": obj.displayName, "email": obj.email, "emailVerified": obj.emailVerified, "isAnonymous": obj.isAnonymous, "phoneNumber": obj.phoneNumber, "photoURL": obj.photoURL, "providerId": "firebase", "uid": uid, token: token })
          dispatch({ type: "LOGIN_PROCESSED", payload: { ...obj, ...{ token: token } } })
        } else {
          user.forEach(async (userData) => {
            console.log("not Empty", token, "old user", obj, "new user", { ...obj, ...{ token: token }}, 'userData', userData.id, "user", user)
            await firestore().collection('users').doc(userData.id).update({ token:  token})
          })
          dispatch({ type: "LOGIN_PROCESSED", payload: { ...obj, ...{ token: token } } })
        }
      })
      .catch((err) => {
        console.log('check addUser err', err)
        console.log('addUser err', err)
        dispatch({ type: FETCHING_ERROR })
      })
  }
}

export const getTermCondition = () => {
  return function (dispatch) {
    var data;
    dispatch({ type: FETCHING_START })
    firestore().collection("termcondition").get()
      .then(snapshot => {
        if (snapshot.empty) dispatch({ type: FETCHING_ERROR })
        snapshot.forEach((e) => {
          data = e.data()
          data.key = e.id;
        })
        dispatch({ type: TC_FETCHED, payload: data })
      })
      .catch((err) => {
        console.log("getTermCondition err", err)
        dispatch({ type: FETCHING_ERROR })
      })
  }
}

export const getLocation = () => {
  console.log('getLocation')
  return function(dispatch) {
      var arr = []
      dispatch({type: FETCHING_START})
      firestore().collection("locations").get()
      .then((snapShot) => {
        console.log('getLocation snapShot', snapShot)
          if(snapShot.empty) {
              dispatch({type: FETCHING_ERROR})
          }else {
              snapShot.forEach((value) => {
                  var data = value.data()
                  data.key = value.id
                  arr.push(data)
              })
              dispatch({type: LOCATION_FETCHED, payload: arr})
          }
      })
      .catch((err) => {
          console.log("getLocation err", err)
          dispatch({type: FETCHING_ERROR})
      })
  }
}