import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../../constants/Colors';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import FavouritesScreen from '../screens/FavouritesScreen';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Platform } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import FilterScreen from '../screens/FilterScreen';

const MealsNavigator = createStackNavigator(
	{
		// pushing the screens into a stack from top to bottom
		// some special type of props will be available for all these components that we mentioned below
		// these props are helpful to navigate throw different components mentioned below
		Categories: CategoriesScreen,

		// can also do like this to provide extra configuration
		CategoryMeals: {
			screen: CategoryMealsScreen,

			//priority 1 navigationOptions
			navigationOptions: {
				// headerStyle: {
				// 	// backgroundColor: 'red'
				// }
			},
		},
		MealDetail: MealDetailScreen,
	},

	//this object for default configuration for every screen header
	// priority 3
	{
		mode: 'modal', // can also set this, it will work for ios
		// initialRouteName: 'CategoryMeals', // can also set which screen should show first
		defaultNavigationOptions: {
			headerTitle: 'Helllo',
			headerStyle: {
				backgroundColor: Colors.primaryColor,
			},
			headerTitleStyle: {
				fontFamily: 'nautigal'	
			},
			headerBackTitleStyle: {	//this is for ios, for text that used to go back to previous screen
				fontFamily: 'open-sans-bold'
			},
			headerTintColor: 'white',
		},
	},
);

const favouriteStackNavigator = createStackNavigator(
	{
		Favourites: FavouritesScreen,
		MealDetail: MealDetailScreen,
	},
	{
		defaultNavigationOptions: {
			headerTitle: 'My Favourites',
			headerStyle: {
				backgroundColor: Colors.primaryColor,
			},
			headerTintColor: 'white',
		},
	},
);

const bottomTabConfig = {
	//it is like same as createStackNavigator
	// we can also use already created navigator
	Meals: {
		screen: MealsNavigator,
		navigationOptions: {
			// to set icons,
			// it is a function that receives tabinfo
			tabBarIcon: (tabInfo) => {
				return (
					<Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
				);
			},
			tabBarColor: Colors.accentColor,
			// for material navigator
			// tabBarLabel: 'no', // will change tab label, we can use <Text> here as well to provide styling
		},
	},
	// Favourites: FavouritesScreen,  // we can use like this or to provide more configuration then use like below
	Favourites: {
		// screen: FavouritesScreen,
		screen: favouriteStackNavigator,
		navigationOptions: {
			tabBarIcon: (tabInfo) => {
				return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />;
			},
			tabBarLabel: 'Favourite', // can change the label of our tab
		},
	},
};

const MealsFavTabNavigator =
	Platform.OS === 'android'
		? createMaterialBottomTabNavigator(bottomTabConfig, {
				activeTintColor: Colors.accentColor,
				shifting: true, // if shifting is false it means tabBarColor configured in bottomTabConfig
				//will not work, but we can define below style in case we need to make shifting = false
				// barStyle: {
				// 	backgroundColor: 'black',
				// },
		  })
		: createBottomTabNavigator(bottomTabConfig, {
			tabBarOptions: {
				activeTintColor: 'white',
				labelStyle: {	//for the tab text(label) of tabnavigator
					// fontFamily: 'nautigal'
					// backgroundColor: 'red'
				},
			},
		  });

const FilterStackNavigator = createStackNavigator({
	Filters: FilterScreen,
});
const MainNavigator = createDrawerNavigator({
	MealsFavs: {
		screen: MealsFavTabNavigator,
		navigationOptions: {
			drawerLabel: 'Meals',
		}
	},
	Filters: FilterStackNavigator,
}, {
	contentOptions: {
		activeTintColor: 'green',
		labelStyle: {
			fontFamily: 'open-sans-bold'
		}
	}
});
// export default createAppContainer(MealsNavigator);
// as now MealsFavTabNavigator contains the MealsNavigator, so we can return like below

// export default createAppContainer( MealsFavTabNavigator );

export default createAppContainer(MainNavigator);
