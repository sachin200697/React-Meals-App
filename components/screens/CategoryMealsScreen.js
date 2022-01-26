import React from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import { CATEGORIES } from '../../data/dumy-data'
// import { MEALS } from '../../data/dumy-data' //useing state
// import { connect } from 'react-redux';   //we can use connect approah or can use below
import { useSelector } from 'react-redux';
import MealList from '../MealList'

function CategoryMealsScreen ( props ) {
    const meals = useSelector( state => state.meals.filteredMeals );
    const selectedMeals = meals.filter(meal=>meal.categoryIds.indexOf(props.navigation.getParam('categoryId'))>=0)
    
    if ( !selectedMeals || selectedMeals.length == 0 )
    {
        return <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
            <Text style={{fontFamily: 'open-sans-bold'}}>No meal to display</Text>
        </View>
    }
    return (
        <View style={styles.screen}>
            <MealList listData={selectedMeals} navigation={props.navigation}/>
        </View>
    )
}

CategoryMealsScreen.navigationOptions = ( navigationData ) => {
    const selectedCategory = CATEGORIES.find(category=>category.id===navigationData.navigation.getParam('categoryId'))
    return {
        headerTitle: selectedCategory.title,
        headerTintColor: 'white'
    }
    
}

const styles = StyleSheet.create( {
    screen: {
        flex: 1,
        alignItems: 'center',
    }
} )

// const mapStateToProps = state => {
//     return {
//         meals: state.meals.meals
//     }
// }
// export default connect(mapStateToProps, {})(CategoryMealsScreen);

export default CategoryMealsScreen;
