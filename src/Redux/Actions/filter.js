import firestore from '@react-native-firebase/firestore'
import { SEARCHING_ERROR, SEARCHING_FOUND, SEARCHING_START } from '../Constants/constant';

export function searchByTxt(text) {
    return function(dispatch) {
        // if (searchInput) {
        //     let SearchPattern = new RegExp('(\\w*' + searchInput + '\\w*)', 'gi');
        //     FilteredList = FilteredList.filter(program => {
        //         return program.name.match(SearchPattern) || program.displayName.match(SearchPattern) || program.client && program.client.name.match(SearchPattern);;
        //     })
        // }
        // let SearchPattern = new RegExp('(\\w*' + text.toLowerCase() + '\\w*)', 'gi');
        // console.log("SearchPattern", SearchPattern)
        var arr = []
        dispatch({type: SEARCHING_START})
        firestore().collection('items')
        // .where('itemName', '>=', text.toLowerCase())
        // .where('itemName', '<=', text.toLowerCase() + '\uf8ff')
        .where("tagsArr", 'array-contains', text.toLowerCase())
        .get()
        .then((response) => {
            if(!response.empty) {
                response.forEach((item) => {
                    var data = item.data()
                    data.key = item.id
                    data.quantity = 0
                    arr.push(data)
                })
            dispatch({type: SEARCHING_FOUND, payload: arr})
            }else {
                dispatch({type: SEARCHING_ERROR})
            }
        })
        .catch((err) => {
            dispatch({type: SEARCHING_ERROR})
            console.log("searchByTxt err", err)
        })
    }
}
