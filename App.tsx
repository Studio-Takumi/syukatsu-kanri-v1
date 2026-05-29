import './global.css';
import { TodoListScreen } from './src/screens/TodoListScreen';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export default function App() {
    return (
        <View className='w-full'>
            <TodoListScreen />
            <StatusBar style='auto' />
        </View>
    );
}
