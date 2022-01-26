import React, {useCallback, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView,  } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// import { MEALS } from '../../data/dumy-data';
import { useSelector, useDispatch } from 'react-redux';	//useSelector to get state from store and 
//useDispatch to dispatch an action
import { toggleFavourite } from '../../store/actions/meals';
import CustomHeaderButton from '../CustomHeaderButton';
import { Entypo } from '@expo/vector-icons';


export default function MealDetailScreen(props) {
	const selectedMealId = props.navigation.getParam( 'mealId' );
	const meals = useSelector( state => state.meals.meals );
	const selectedMeal = meals.find( ( meal ) => meal.id == selectedMealId );
	const meal = props.navigation.getParam( 'meal' );	//this is also selected meal, so we can use any one of them

	const dispatch = useDispatch();
	const toggleFavouriteHandeler = useCallback( () => {
	  dispatch(toggleFavourite(selectedMealId));
	}, [dispatch, selectedMealId] );
	
	useEffect( () => {
		props.navigation.setParams({toggleFavouriteHandeler});
	}, [toggleFavouriteHandeler]);
	

	//we can use set param to send the meal to the MealDetailScreen.navigationOptions
	//but there will be a dilay to render the title as this component will send params
	//to navigationOptions after initial render
	// so to resolve it we can set params in the parent component where we sending the 
	// meal id at the same place we can send the title as well using params(parent is MealList.js)
	// console.log('meal',meal);
	
	//to change start, we will identify that if current selected meal is favourite or not
	const isSelectedMealFavourite = useSelector( state => state.meals.favouriteMeals.some( meal => meal.id === selectedMealId ) );
	useEffect( () => {
		//instead of setting is here we can also set it even in MealList component as that at initial rendering
		//it will not show outline star instead it will show filled star(marked as favourite)
		props.navigation.setParams({isFavourite: isSelectedMealFavourite});
	}, [isSelectedMealFavourite]);
	
	return (
		<View style={styles.screen}>
			<ScrollView style={styles.scrollViewStyle}>
				<Image source={{ uri: meal.imageURL }} style={ styles.image}/>
				<View style={styles.maelRow}>
					<Text>{meal.duration}</Text>
					<Text>{meal.complexity}</Text>
					<Text>{meal.affordability}</Text>
				</View>
				<View style={{marginVertical: 10,padding: 10}}>
					<Text style={styles.boldText}>{'Ingredients:'}</Text>
					<View>{meal.ingredients.map( ( ingredient, index ) => <Text key={ingredient}>{`${index + 1}. ${ingredient}`}</Text> )}</View>
				</View>
				<View style={{marginVertical: 10, padding: 10}}>
					<Text style={styles.boldText}>{'Steps:'}</Text>
					<View>{meal.steps.map( ( step, index ) => <Text key={step}>{`${index + 1}. ${step}`}</Text> )}</View>
				</View>
			</ScrollView>
		</View>
	);
}

MealDetailScreen.navigationOptions = (mealData) => {
	const selectedMealId = mealData.navigation.getParam('mealId');
	const mealTitle = mealData.navigation.getParam( 'mealTitle' );
	const toggleFavourite = mealData.navigation.getParam( 'toggleFavouriteHandeler' );
	const isFavourite = mealData.navigation.getParam( 'isFavourite' );
	return {
		headerTitle: mealTitle,
		headerRight: ()=>(
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<TouchableOpacity onPress={toggleFavourite} style={{marginRight: 20}}>
					<Entypo name={isFavourite?'star':'star-outlined'} size={24} color='white' />
				</TouchableOpacity>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width:'100%'
	},
	scrollViewStyle: {
		flex: 1,	
		width: '100%'
	},
	image: {
		width: '100%',
		height: 200
	},
	maelRow: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	boldText: {
		fontFamily: 'open-sans-bold',
		fontSize: 20,
	}
});
