import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from "@react-navigation/stack";
import SettingsPage from './SettingsPage';
import ProfileScreen from './ProfileScreen';
import { View } from 'react-native';





export const SettingsButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <Icon name="gear" size={24} color="#3498db" />
    </TouchableOpacity>
);

const profStack = createStackNavigator();
const ProfileStack = () => (
    <profStack.Navigator initialRouteName='ProfileScreen'>
        <profStack.Screen name={"Profile"} component={ProfileScreen} options={({ navigation }) => ({
            headerRight: () => (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 15 }}>
                <View style={{ paddingRight: 20 }}>
                  <SettingsButton onPress={() =>  navigation.navigate('Settings')} />
                </View>
              </View>
            ),
            headerLeft: () => null})}/>
        <profStack.Screen name={"Settings"} component={SettingsPage} />
    </profStack.Navigator>
);

export default ProfileStack