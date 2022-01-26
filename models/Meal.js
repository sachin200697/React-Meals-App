export default class Meal {
    constructor( id, categoryIds, title, affordability, complexity, imageURL, duration, ingredients, steps,
        isGlutenFtee, isVegan, isVegetarian, isLactoseFree ) {
        this.id = id
        this.categoryIds = categoryIds
        this.title = title
        this.affordability = affordability
        this.complexity = complexity
        this.imageURL = imageURL
        this.duration = duration
        this.ingredients = ingredients
        this.steps = steps
        this.isGlutenFtee = isGlutenFtee
        this.isVegan = isVegan
        this.isVegetarian = isVegetarian
        this.isLactoseFree = isLactoseFree
        
    }
}