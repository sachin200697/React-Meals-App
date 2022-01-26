import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	FlatList,
	TouchableOpacity,
	Platform,
} from 'react-native';
import { CATEGORIES } from '../../data/dumy-data';
import Colors from '../../constants/Colors';
import CategoryGridTile from '../CategoryGridTile';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButtom from '../CustomHeaderButton';

export default function CategoriesScreen(props) {
	// console.log( props );	//props has many properties provided by react-navigation-stack
	const renderGridItem = (itemData) => {
		return (
			<CategoryGridTile
				title={itemData.item.title}
				color={itemData.item.color}
				onPressHandeler={() =>
					props.navigation.navigate({
						routeName: 'CategoryMeals',
						// params is used to pass the information to the route that we are about to go
						params: {
							// in child component we can access it using props.navigation.getParam('categoryId')
							categoryId: itemData.item.id,
							categoryTitle: itemData.item.title,
						},
					})
				}
			/>
		);
	};
	return (
		<View style={styles.screen}>
			{/* <Button
				title='Go to Meals'
				onPress={
					() => {
						props.navigation.navigate( { routeName: 'CategoryMeals' } )
						//instead of passing an object { routeName: 'CategoryMeals' }, we can only 
						//give name only like: props.navigation.navigate('CategoryMeals')
					}
				}
			/> */}

			{/* we don't need to use extractKey here as in our Category object id(or key can be used) 
				property exists 
			*/}
			<FlatList
				numColumns={2}
				data={CATEGORIES}
				renderItem={(category) => renderGridItem(category)}
			/>
		</View>
	);
}

//bedefault header title of the page is set the name that we used for key while creating createNavigatorStack object
//to change it we need to add a property to our component function
// Note: navigationOptions can be an object for hard-coded values and also it can be a function for dynamic values
// we can also set navigationOptions where we created createNavigationStack object.
// here navigationOptions has proiority 2 means navigationOptions mentions in createNavigationStack will apply
//  first then below then defaultNavigationOptions will apply
CategoriesScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'Meal Categories',
		// we also have headerLeft and headerRight property as well
		// for headerLeft and headerRight we can also give an jsx element like <Button> or <Text>
		headerLeft: ()=>(
			<HeaderButtons HeaderButtonComponent={CustomHeaderButtom}>
				<Item
					iconName='ios-menu'
					title='menu'
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		),

		headerStyle: {
			backgroundColor: Platform.OS === 'ios' ? '' : Colors.primaryColor,
		},
		headerTintColor: Platform.OS === 'ios' ? Colors.primaryColor : 'white',
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
