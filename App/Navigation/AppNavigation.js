import { StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import styles from './Styles/NavigationStyles'

import SearchScreen from '../Components/AutoComplete'

// Manifest of possible screens
//const AppNavigator = StackNavigator(StackRouteConfigs, StackNavigatorConfigs);
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  SearchScreen: { screen: SearchScreen},
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
