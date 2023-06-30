import { View, Text } from 'react-native';
import MainContainer from '../MainContainer';
import ProfileScreen from './ProfileScreen';

export default function SplashScreen({navigation}) {

    return(
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            <input value="E-Mail"/>
            <input value="User Name"/>
            <input value="Password"/>
            <input value="Retype Password"/>    
        </View>
    )
}