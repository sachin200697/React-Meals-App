import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MealList from '../MealList';
// import { MEALS } from '../../data/dumy-data';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../CustomHeaderButton';

/*
 For favourite we should have some meals that marked as favourite.
 And we can click on these meals to see the details. 
 It means we need a stack navigator to provide this functionality.


*/

export default function FavouriteScreen ( props ) {
	const favouriteMeals = useSelector( state => state.meals.favouriteMeals );
	// const favouriteMeals = [MEALS[0], MEALS[1]];

	if ( !favouriteMeals || favouriteMeals.length == 0 )
	{
		return <View style={styles.noFavourite}>
			<Text style={styles.noFavouriteText}>No favourite found! Start adding some...</Text>
		</View>
	}
	return (
		<View>
			<MealList listData={favouriteMeals} navigation={props.navigation} />
		</View>
	);
}
FavouriteScreen.navigationOptions = (navProps) => {
	console.log(navProps.navigation.toggleDrawer);
	return {
		headerLeft: ()=>(
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					iconName='ios-menu'
					onPress={() => {
						navProps.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	noFavourite: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	noFavouriteText: {
		fontFamily: 'open-sans-bold'
	}
});
