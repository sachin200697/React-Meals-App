import React, {useState, useCallback, useEffect} from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import Colors from '../../constants/Colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../CustomHeaderButton';
import { useDispatch } from 'react-redux';
import { setFilters } from '../../store/actions/meals';

function FilterSwitch ( props ) {
	return <View style={styles.filterContainer}>
				<Text>{props.label}</Text>

				{/* we need to maintain state for switch to toggle or not */}
				<Switch
					value={props.state}
					onValueChange={props.onChange}
					// for styling
					trackColor={{true:'green', false: 'red'}}
					thumbColor={'blue'}
				/>
				
			</View>
}

export default function FilterScreen ( props ) {
	const [isGlutenFree, setIsGlutenFree] = useState( false );
	const [isLactoseFree, setIsLactoseFree] = useState( false );
	const [isVegan, setIsVegan] = useState( false );
	const [isVegetarian, setIsVegetarian] = useState( false );

	//dispatching SET_FILTERS
	const dispatch = useDispatch();

	//how to pass state data to FilterScreen.navigationOptions step1.
	const saveFilters = useCallback(() => {
		const filters = {
			glutenfree: isGlutenFree,
			lactosefree: isLactoseFree,
			vegan: isVegan,
			vegetarian: isVegetarian
		};
		dispatch( setFilters( filters ) );
		return filters 			
	}, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch] );
	
	//how to pass state data to FilterScreen.navigationOptions step2.
	useEffect( () => {
		props.navigation.setParams( { save: saveFilters })
	}, [saveFilters] );
	
	return (
		<View style={styles.screen}>
			<Text style={styles.filterTitle}>Available Filters</Text>
			<FilterSwitch label={'Gluten-Free'} state={isGlutenFree} onChange={() => setIsGlutenFree( !isGlutenFree )} />
			<FilterSwitch label={'Lactose-Free'} state={isLactoseFree} onChange={() => setIsLactoseFree( !isLactoseFree )} />
			<FilterSwitch label={'Vegan'} state={isVegan} onChange={() => setIsVegan( !isVegan )} />
			<FilterSwitch label={'Vegetarian'} state={isVegetarian} onChange={()=>setIsVegetarian(!isVegetarian)} />
		</View>
	);
}

FilterScreen.navigationOptions = ( navProps ) => {
	console.log( navProps.navigation.getParam( 'save' ) );
	const onSave = navProps.navigation.getParam( 'save' );
	
	return {
		headerTitle: 'Filter Meals',
		headerStyle: {
			backgroundColor: Colors.primaryColor,
		},
		headerTintColor: 'white',
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
		headerRight: ()=>(
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					iconName='ios-save'
					onPress={onSave}
				/>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems:'center'
	},
	filterTitle: {
		fontFamily: 'open-sans-bold',
		fontSize: 20,
		marginVertical:10,
	},
	filterContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '95%',
	}
});
