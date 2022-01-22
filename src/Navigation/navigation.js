import { createAppContainer, DrawerItems, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import Login from '../Components/Login/login'
import Signup from '../Components/Signup/signup'
import Dashboard from '../Components/Dashboard/dashboard'
import Splash from "../Components/Splash/splash";
import Drawer from "./Drawer";
import Header from "../Constant/Header";
import CateItems from "../Components/Dashboard/catItems";
import ItemDetails from "../Components/Dashboard/itemDetail";
import Cart from "../Components/Dashboard/cart";
import EmptyCart from "../Components/Dashboard/emptyCart";
import SearchingPage from "../Components/Dashboard/search";
import Orders from '../Components/Dashboard/orders'
import TermCondition from "../Components/Dashboard/termcondition";
import FeatureProduct from "../Components/Dashboard/featuresProduct";
import Selectlocation from "../Components/Dashboard/selectLocation";
import GooglePlacesInput from "../Constant/LocationSearch";
import OrderDetail from "../Components/Dashboard/orderDetail";
const AuthStack = createStackNavigator({

    UserLogin: {
        screen: Login,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },

    UserSignUp: {
        screen: Signup,
       
        navigationOptions: () => ({
            headerBackTitle: null,
            header: null,
        }),
    },
    TermCondition: {
        screen: TermCondition,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    }

})


const UserDrawer = createDrawerNavigator({
    // UserLogin: {
    //     screen: Login,
    //     headerMode: 'none',
    //     navigationOptions: {
    //         header: null,
    //     }
    // },
    // Selectlocation: {
    //     screen: Selectlocation,
    //     headerMode: 'none',
    //     navigationOptions: {
    //         header: null,
    //     }
    // },
    Dashboard: {
        screen: Dashboard,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },
    Orders: {
        screen: Orders,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },
    
    Header: {
        screen: Header,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },
    TermCondition: {
        screen: TermCondition,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    }
    

},{
    // initialRouteName: 'Main',
    contentComponent: Drawer,
    drawerBackgroundColor: '#ffffff',
    contentOptions: {
        activeBackgroundColor: 'lightgray',
        activeTintColor: 'black',
        style: {
            borderRightColor: 'orange'
        },
        inactiveTintColor: 'black'
    },
    // resetOnBlur:true,
    drawerType:"slide",
    overlayColor:"transparent",
    // minSwipeDistance: 0,
    drawerPosition: 'left',
    drawerLockMode: "unlocked"
    
})



const AppStack = createStackNavigator({

    Selectlocation: {
        screen: Selectlocation,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },

    SearchGooglePlaces: {
        screen: GooglePlacesInput,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },

    Dashboard: {
        screen: UserDrawer,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },

    Orders: {
        screen: Orders,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },

    OrderDetail: {
        screen: OrderDetail,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },

    CateItems: {
        screen: CateItems,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },

    ItemDetails: {
        screen: ItemDetails,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },

    EmptyCart: {
        screen: EmptyCart,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },

    Cart: {
        screen: Cart,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },

    SearchingPage: {
        screen: SearchingPage,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },
    TermCondition: {
        screen: TermCondition,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },
    FeatureProduct: {
        screen: FeatureProduct,
        headerMode: 'none',
        navigationOptions: {
            header: null,
        }
    },


})

const SwitchNavigator = createSwitchNavigator({
    Splash: Splash,
    Authentication: {
        screen: AuthStack
    },
    App: {
        screen: AppStack
    },
})


const Navigator = createAppContainer(SwitchNavigator);

export default Navigator