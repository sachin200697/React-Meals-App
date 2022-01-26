import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import MealsNavigator from './components/navigation/MealsNavigator';
import { enableScreens } from 'react-native-screens';
import BottomTabNavigation from './components/navigation/BottomTabNavigation';
import Store from './store/reducers'
import { Provider } from 'react-redux';

export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false);
	const fetchFonts = () => {
		Font.loadAsync({
			'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
			'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
			nautigal: require('./assets/fonts/TheNautigal-Regular.ttf'),
			'nautigal-bold': require('./assets/fonts/TheNautigal-Bold.ttf'),
		});
	};

	if (!fontLoaded) {
		return (
			
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setFontLoaded(true)}
				onError={(err) => console.log(err)}
			/>
			
		);
	}
	enableScreens();
	return (
		<Provider store={Store}>
			<MealsNavigator />
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	font: {
		fontFamily: 'nautigal-bold',
		fontSize: 50,
		color: 'rgba(144,25,25,1)',
	},
});
