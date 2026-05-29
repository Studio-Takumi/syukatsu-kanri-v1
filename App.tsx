import { StatusBar } from 'expo-status-bar';
import './global.css';
import { CompanyListScreen } from './src/screens/CompanyListScreen';
import { View } from 'react-native';

export default function App() {
    return (
        <View className='w-full'>
            <CompanyListScreen />
            <StatusBar style='auto' />
        </View>
    );
}
