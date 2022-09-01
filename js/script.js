const modalWrapper = document.querySelector('.modal-wrapper');
const modalInput = document.querySelector('.modal-input');
const modalCheckdox = document.querySelector('.modal-checkbox');
const openModal = document.querySelector('.open-modal');
const todo = document.querySelector('.todo');
const addTodoButton = document.querySelector('.btn-add-todo');

let openedModal = false;
let todoList = [];

if (localStorage.getItem('todos')) {
    todoList = JSON.parse(localStorage.getItem('todos'));
}

displayTodos();

openModal.addEventListener('click', function () {
    openedModal = !openedModal;
    modalWrapper.style = openedModal ? 'display: block;' : 'display: none;'
    if (openedModal) modalInput.focus();
})

addTodoButton.addEventListener('click', function (event) {
    event.preventDefault();

    if (!modalInput.value.trim()) return;

    const val = todoList.find(item => item.text === modalInput.value)

    if (val) return;

    const newTodo = {
        done: false,
        text: modalInput.value,
        important: modalCheckdox.checked
    }

    todoList.push(newTodo);

    modalInput.value = '';
    modalCheckdox.checked = false;
    openedModal = !openedModal;
    modalWrapper.style = openedModal ? 'display: block;' : 'display: none;'

    displayTodos();
})

function displayTodos() {
    let displayTodo = '';

    if (todoList.length == 0) {
        todo.innerHTML = '<h2> All Todos Done</h2>';
        return;
    }

    todoList.forEach(function (item, index) {
        displayTodo += `
            <li class="list-item">
                <div>
                    <input type="checkbox" id="item_${index}" 
                    ${item.done ? 'checked' : ''}
                    />
                    <label 
                    for="item_${index}"
                    ${item.done ? 'class="done"' : ''}
                    style="${item.important ? 'color: red;' : 'color: black;'}"
                    >
                    ${item.text}
                    </label>
                </div>
                <div>
                    <button class="btn btn-delete" onclick="deleteTodo(${index})">Delete</button>
                </div>
            </li>
        `
    })

    todo.innerHTML = displayTodo;

    localStorage.setItem('todos', JSON.stringify(todoList))
}

function deleteTodo(index) {
    todoList.splice(index, 1);
    displayTodos();
}

todo.addEventListener('change', function (event) {
    let inputId = event.target.getAttribute('id');

    let forLabel = todo.querySelector('[for=' + inputId + ']');

    let valueLabel = forLabel.innerHTML;

    todoList.forEach(function (item) {
        if (item.text == valueLabel.trim()) {
            item.done = !item.done;
        }
    })
    displayTodos();
})

todo.addEventListener('contextmenu', function (event) {
    event.preventDefault();

    todoList.forEach(function (item, index) {
        if (item.text == event.target.innerHTML.trim()) {
            if (event.ctrlKey || event.metaKey) {
                todoList.splice(index, 1);
            }
            else {
                item.important = !item.important;
            }
        }
    })
    displayTodos();
})