///LOAD DOM ELEMENTS

const popup = document.querySelector('.recipes-popup')
const addNewBtn = document.querySelector('.recipes-add-btn')
const submitBtn = document.querySelector('.submit-btn')
const closePopupBtn = document.querySelector('.popup-cancel')
const recipesBox = document.querySelector('.recipes-box')
const error = document.querySelector('.popup-error')

const allInputs = document.querySelectorAll('.popup-input')
const foodNameInput = document.querySelector('#food-name')
const foodIngredientsInput = document.querySelector('#ingredients')
const foodDescInput = document.querySelector('#food-description')

const defaultFood = ['spagetti', 'pasa,meat,sauce', 'cook Pasta, fry meat and mix all with sauce. Enyoy!']
const defaultFood2 = [
	'Scrumbled Eggs',
	'Eggs, butter, bread, sausage',
	'fry Eggs and cutted sausage on butter - Eat with bread',
]
const arrToStorage = JSON.parse(localStorage.getItem('arrayKey'))

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
		memoUserItem(newFoodName, newFoodIngredients, newFoodDesc)
		createRecipe(newFoodName, newFoodIngredients, newFoodDesc)
		clearPopupInputs()
		error.classList.add('hide')
	} else if (checkInputs(ok) && editing) {
		handlePopup()
		makeChanges(newFoodName, newFoodIngredients, newFoodDesc)
		clearPopupInputs()
		error.classList.add('hide')
		editing = false
	} else {
		error.classList.remove('hide')
		// console.log('czegoś brakuje')
	}
}
const handleExtension = e => {
	const openBlock = document.querySelector('.extended')
	const parentBlock = e.target.parentElement.parentElement

	if (openBlock === null && !parentBlock.classList.contains('extended')) {
		parentBlock.classList.add('extended')
	} else if (openBlock !== null && !parentBlock.classList.contains('extended')) {
		openBlock.classList.remove('extended')
		parentBlock.classList.add('extended')
	} else {
		parentBlock.classList.remove('extended')
	}
}
const removeRecipe = e => {
	const parentToRemove = e.target.parentElement.parentElement.parentElement
	const indexOfItem = checkNumOfItem(parentToRemove)

	memoUserDelete(indexOfItem)
	parentToRemove.remove()
}
const clearPopupInputs = () => {
	allInputs.forEach(input => (input.value = ''))
}

const checkNumOfItem = item => {
	const itemsBlock = item.parentElement
	return Array.from(itemsBlock.children).indexOf(item) - 2
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
	const indexOfItem = checkNumOfItem(elementToEdit)

	recipeName.textContent = newFoodName
	recipeIngredients.textContent = newFoodIngredients
	recipeDescription.firstElementChild.innerText = newFoodDesc

	elementToEdit.classList.remove('element-in-edition')
	memoUserChanges(indexOfItem, newFoodName, newFoodIngredients, newFoodDesc)
}

/// Local Storage Management

const checkNewUser = () => {
	if (arrToStorage === null) {
		const arr = []
		arr.push(defaultFood)
		arr.push(defaultFood2)
		localStorage.setItem('arrayKey', JSON.stringify(arr))
		// console.log(`...zaktualizowałem localhost`)
		createRecipe(defaultFood[0], defaultFood[1], defaultFood[2])
		createRecipe(defaultFood2[0], defaultFood2[1], defaultFood2[2])
	} else {
		for (let i = 0; i < arrToStorage.length; i++) {
			createRecipe(arrToStorage[i][0], arrToStorage[i][1], arrToStorage[i][2])
		}
		// console.log(`${arrToStorage} - w localhost już ok`)
	}
}
const memoUserItem = (name, ingredients, description) => {
	const newArr = [name, ingredients, description]
	arrToStorage.push(newArr)
	localStorage.setItem('arrayKey', JSON.stringify(arrToStorage))
}
const memoUserDelete = index => {
	arrToStorage.splice(index, 1)
	localStorage.setItem('arrayKey', JSON.stringify(arrToStorage))
}
const memoUserChanges = (index, newFoodName, newFoodIngredients, newFoodDesc) => {
	arrToStorage[index] = [newFoodName, newFoodIngredients, newFoodDesc]
	localStorage.setItem('arrayKey', JSON.stringify(arrToStorage))
}

//addUserItem('test','składniki testowe','przykładowy opis')

///LOAD DOM Events

addNewBtn.addEventListener('click', handlePopup)
submitBtn.addEventListener('click', checkSubmit)
closePopupBtn.addEventListener('click', handlePopup)
checkNewUser()
// updateUserData(arrToStorage)
