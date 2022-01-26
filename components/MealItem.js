import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ImageBackground,
} from 'react-native';

export default function MealItem(props) {
	return (
		<View style={styles.mealContainer}>
			<TouchableOpacity
				onPress={props.onSelectMeal}
				style={styles.mealTouchable}
			>
				<View style={styles.maelHeader}>
					<ImageBackground source={{ uri: props.image }} style={styles.bgImage}>
						<Text style={styles.bgImageText}>{props.title}</Text>
					</ImageBackground>
				</View>
				<View style={styles.maelRow}>
					<Text>{props.duration}</Text>
					<Text>{props.complexity}</Text>
					<Text>{props.affordability}</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	mealContainer: {
		height: 200,
		backgroundColor: '#f5f5f5',
		margin: 5,
		borderWidth: 1,
		borderColor: 'brown',
		overflow: 'hidden',
	},
	mealTouchable: {
		flex: 1,
	},
	maelHeader: {
		height: '80%',
	},
	maelRow: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	bgImage: {
		width: '100%',
		height: '100%',
		justifyContent: 'flex-end',
	},
	bgImageText: {
		fontSize: 20,
		color: 'white',
		backgroundColor: 'rgba(0,0,0,0.7)',
		textAlign: 'center',
		padding: 5,
		// height:'100%'
	},
});
