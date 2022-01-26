import { MEALS } from '../../data/dumy-data'
import { TOGGLE_FAVOURITE } from '../actions/meals'
import { SET_FILTERS } from '../actions/meals';
const initialState = {
    meals: MEALS,
    favouriteMeals: [],
    filteredMeals: MEALS
}

export default function mealsReducer ( state = initialState, action ) {
    switch ( action.type )
    {
        case TOGGLE_FAVOURITE:
            const indexOfMeal = state.favouriteMeals.findIndex( meal => meal.id === action.mealId );
            if ( indexOfMeal >= 0 )
            {
                //meal already favourite so remove it from state.favouriteMeals
                return { ...state, favouriteMeals: state.favouriteMeals.filter( meal => meal.id != action.mealId ) };
            }
            else
            {
                //meal should be included in state.favouriteMeals
                const favouriteMeal = MEALS.find( meal => meal.id === action.mealId );
                return { ...state, favouriteMeals: [...state.favouriteMeals, favouriteMeal] };
            }
        case SET_FILTERS:
            const filteredArray = state.meals.filter( meal => {
                if ( action.filters.glutenfree && !meal.isGlutenFtee ) return false;
                else if ( action.filters.lactosefree && !meal.isLactoseFree ) return false;
                else if ( action.filters.vegan && !meal.isVegan ) return false;
                else if ( action.vegetarian && !meal.isVegetarian ) return false;
                return true;
            } )
            return {...state, filteredMeals: filteredArray}
        default:
            return state
    }
};
