
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StudentProvider } from './contexts/StudentContext';
import { Text } from 'react-native';

export default function Layout() {
    return <Text>As</Text>
  return (
    <StudentProvider>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            let iconName = '';
            if (route.name === 'scanner') {
              iconName = focused ? 'qr-code' : 'qr-code-outline';
            } else if (route.name === 'students') {
              iconName = focused ? 'people' : 'people-outline';
            }
            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: 'gray',
          headerShown: true,
          title: route.name === 'scanner' ? 'Scanner' : 'Alunos Presentes',
        })}
      />
    </StudentProvider>
  );
}
