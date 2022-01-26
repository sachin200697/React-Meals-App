import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CategoryGridTile(props) {
	const styles = StyleSheet.create({
		itemGridContainer: {
			flex: 1,
			margin: 15,
			shadowColor: 'black',
			shadowOffset: { width: 5, height: 5 },
			shadowOpacity: 1,
			elevation: 20,
			shadowRadius: 5,
		},
		itemGrid: {
			flex: 1,
			height: 150,
			borderWidth: 2,
			borderRadius: 12,
		},
		boxShadow: {
			flex: 1,
			height: 150,
			backgroundColor: props.color,
			justifyContent: 'flex-end',
			alignItems: 'flex-end',
			padding: 10,

			shadowColor: 'black',
			shadowOffset: { width: 5, height: 5 },
			shadowOpacity: 0.8,
			elevation: 3,
			shadowRadius: 5,
			borderRadius: 10,
			textAlign: 'right',
		},
		itemTitle: {
			fontSize: 20,
			fontFamily: 'open-sans-bold',
			color: 'white',
			textShadowColor: 'black',
			textShadowOffset: { width: 5, height: 5 },
			textShadowRadius: 5,
		},
	});
	return (
		<View style={styles.itemGridContainer}>
			<TouchableOpacity style={styles.itemGrid} onPress={props.onPressHandeler}>
				<View style={styles.boxShadow}>
					<Text style={styles.itemTitle}>{props.title}</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}
