import { View, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import MealItem from './MealItem'

export default function MealList (props) {
    const renderMeal = mealData => {
        // console.log(mealData);
        return <MealItem
            title={mealData.item.title} 
            duration={mealData.item.duration}
            complexity={mealData.item.complexity}
            affordability={mealData.item.affordability}
            image={mealData.item.imageURL}
            onSelectMeal={() => props.navigation.navigate( {
                routeName: 'MealDetail',
                params: {
                    mealId: mealData.item.id,
                    meal: mealData.item,
                    mealTitle: mealData.item.title,
                }
            } )}
        />
    }
    return (
        <FlatList
            data={props.listData}
            keyExtractor={(item,index) => item.id}
            renderItem={itemData => renderMeal( itemData )}
            style={{ width: '100%' }}
        />
    );
}