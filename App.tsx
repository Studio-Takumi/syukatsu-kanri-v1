import './global.css';
import { ApplicationFormScreen } from './src/screens/ApplicationFormScreen';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export default function App() {
    return (
        <View className='w-full'>
            <ApplicationFormScreen />
            <StatusBar style='auto' />
        </View>
    );
}
