const userInput = document.querySelector('#userInput');
const button = document.querySelector('#btn');
const toDoLists = document.querySelector('#toDoLists');

let toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];

const saveToDo = () => {
    const toDoValue = userInput.value;

    const isEmpty = toDoValue === '';

    const isDuplicate = toDoList.some((todo) => todo.value.toUpperCase() === toDoValue.toUpperCase());

    if (isEmpty) {
        alert('You should Type Something')
    } else if (isDuplicate) {
        alert('To Do aleready Exist')
    }
    else {

        toDoList.push({
            value: toDoValue,
            checked: false
        })

        userInput.value = ''
    }

}




const showToDos = () => {
    toDoLists.innerHTML = '';
    toDoList.forEach((todo, index) => {
        toDoLists.innerHTML += `
        <div class="list" id=${index}>
          <i class="icon ${todo.checked ? 'fa-solid fa-circle-check checks' : 'fa-regular fa-circle'}" data-action = "check">
          </i>
          <p class="${todo.checked ? 'checked' : ''} text" data-action="check">${todo.value}</p>
          <i class="delete fa-solid fa-xmark" data-action="delete"></i>
        </div>
        `;
    });
}



toDoLists.addEventListener('click', (e) => {
    const target = e.target;
    const parentElement = target.parentNode;
    if (parentElement.className !== 'list') {
        return;
    }

    const todo = parentElement;
    const todoId = Number(todo.id);


    const action = target.dataset.action;

    action === 'check' && checkTodo(todoId);
    action === 'delete' && deleteTodo(todoId);
    // console.log(todoId, action);
})


const checkTodo = (todoId) => {
    toDoList = toDoList.map((todo, index) => {
        return {
            ...todo,
            checked: index === todoId ? !todo.checked : todo.checked
        }
    })
    showToDos();
    localStorage.setItem('toDoList', JSON.stringify(toDoList))
}

const deleteTodo = (todoId) => {
    toDoList = toDoList.filter((todo, index) => index !== todoId);
    showToDos()
    localStorage.setItem('toDoList', JSON.stringify(toDoList))
}


userInput.addEventListener('keyup', (e) => {
    let value = userInput.value
    if (e.key == 'Enter' && value.trim() !== '') {
        saveToDo()
        showToDos()
        localStorage.setItem('toDoList', JSON.stringify(toDoList))
    }
})


button.addEventListener('click', (e) => {
    let value = userInput.value

    if (value.trim() !== '') {
        saveToDo()
        showToDos()
        localStorage.setItem('toDoList', JSON.stringify(toDoList))
    }
})


showToDos()
