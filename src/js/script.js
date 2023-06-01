///LOAD DOM ELEMENTS

const popup = document.querySelector('.recipes-popup')
const addNewBtn = document.querySelector('.recipes-add-btn')
const submitBtn = document.querySelector('.submit-btn')
const closePopupBtn = document.querySelector('.popup-cancel')
const recipesBox = document.querySelector('.recipes-box')

const allInputs = document.querySelectorAll('.popup-input')
const foodNameInput = document.querySelector('#food-name')
const foodIngredientsInput = document.querySelector('#ingredients')
const foodDescInput = document.querySelector('#food-description')

///LOAD MAIN Values

let editing = false

///BASIC functions

const handlePopup = () => {
	popup.classList.toggle('hide')
}
const checkInputs = ok => {
	allInputs.forEach(e => {
		e.value.length !== 0 ? {} : (ok = false)
	})
	return ok
}
const checkSubmit = () => {
	let ok = true
	const newFoodName = foodNameInput.value
	const newFoodIngredients = foodIngredientsInput.value
	const newFoodDesc = foodDescInput.value

	if (checkInputs(ok) && !editing) {
		handlePopup()
		createRecipe(newFoodName, newFoodIngredients, newFoodDesc)
		clearPopupInputs()
	} else if (checkInputs(ok) && editing) {
		handlePopup()
		makeChanges(newFoodName, newFoodIngredients, newFoodDesc)
        clearPopupInputs()
		editing = false
	} else {
		console.log('czegoś brakuje')
	}
}
const handleExtension = e => {
	const parentBlock = e.target.parentElement.parentElement
	parentBlock.classList.toggle('extended')
}
const removeRecipe = e => {
	const parentToRemove = e.target.parentElement.parentElement.parentElement

	parentToRemove.remove()
}
const clearPopupInputs = () => {
	allInputs.forEach(input => (input.value = ''))
}

/// MAIN Program Modules

const createRecipe = (name, ingredients, description) => {
	const newRecipeItem = document.createElement('div')
	newRecipeItem.classList.add('recipe-item')
	newRecipeItem.innerHTML = ` 
    <div class="recipe-item-heading">
     <div>
        <h3 class="recipe-name">${name}</h3>
        <p class="recipe-ingredients">${ingredients}</p>
     </div>
        <div class="recipe-modify-icon recipe-extender" onclick="handleExtension(event)">
           <i class="fa-solid fa-plus"></i>
        </div>
     </div>

     <div class="recipe-introduction">
     <div class="recipe-introduction-text">
        <p>${description}</p>
     </div>
     <div class="recipe-modify-icons">
        <div class="recipe-modify-icon recipe-editor" onclick="runEditor(event)"><i class="fa-solid fa-pen-to-square"></i>
        </div>
        <div class="recipe-modify-icon recipe-remover" onclick="removeRecipe(event)"><i class="fa-solid fa-trash"></i></div>

    </div>`
	recipesBox.appendChild(newRecipeItem)
}

const runEditor = e => {
	const parentBlock = e.target.parentElement.parentElement.parentElement
	const recipeName = parentBlock.querySelector('.recipe-name').textContent
	const recipeIngredients = parentBlock.querySelector('.recipe-ingredients').textContent
	const recipeDescription = parentBlock.querySelector('.recipe-introduction-text').firstElementChild.innerText

	parentBlock.classList.add('element-in-edition')

	foodNameInput.value = recipeName
	foodIngredientsInput.value = recipeIngredients
	foodDescInput.value = recipeDescription
	editing = true

	handlePopup()
}
const makeChanges = (newFoodName, newFoodIngredients, newFoodDesc) => {
	const elementToEdit = document.querySelector('.element-in-edition')
	const recipeName = elementToEdit.querySelector('.recipe-name')
	const recipeIngredients = elementToEdit.querySelector('.recipe-ingredients')
	const recipeDescription = elementToEdit.querySelector('.recipe-introduction-text')

	recipeName.textContent = newFoodName
	recipeIngredients.textContent = newFoodIngredients
	recipeDescription.firstElementChild.innerText = newFoodDesc

	elementToEdit.classList.remove('element-in-edition')
}

///LOAD DOM Events

addNewBtn.addEventListener('click', handlePopup)
submitBtn.addEventListener('click', checkSubmit)
closePopupBtn.addEventListener('click', handlePopup)
