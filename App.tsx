import './global.css';
import { CalendarScreen } from './src/screens/CalendarScreen';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export default function App() {
    return (
        <View className='w-full'>
            <CalendarScreen />
            <StatusBar style='auto' />
        </View>
    );
}
