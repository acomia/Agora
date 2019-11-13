import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer'
import SideBar from '../screens/SideBar';
import Dashboard from '../screens/Dashboard';
import Members from '../screens/Members';
import { StatusBar } from 'react-native'


const DrawerNavigator = createDrawerNavigator(
    {
        DashHome: {
            screen: Dashboard,
        },
        MemberPage: {
            screen: Members,
        },

    },

    {
        initialRouteName: 'DashHome',
        contentComponent: SideBar,
        overlayColor: 'rgba(160,160,160,0.3)',
    }
)

export default createAppContainer(DrawerNavigator);