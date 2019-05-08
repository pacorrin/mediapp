import { createStackNavigator, createAppContainer } from 'react-navigation'


// vistas
import Map from './components/tabs/map'
import Config from './components/tabs/config'
import Buscar from './components/tabs/buscar'

export const Navigator = createStackNavigator({
    Map,
    Config: {screen: Config},
    Buscar: {screen: Buscar}
}, {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#003ea3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    });

onNavigationStateChange = (e) =>{
    console.log(e)
}
export const AppContainer = createAppContainer(Navigator,onNavigationStateChange);