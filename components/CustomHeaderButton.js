import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import Colors from '../constants/Colors';

import { View, Text } from 'react-native';

export default function CustomHeaderButton(props) {
	return (
		<View>
			<HeaderButton
				{...props}
				IconComponent={Ionicons}
				iconSize={23}
				color={'white'}
			/>
		</View>
	);
}
