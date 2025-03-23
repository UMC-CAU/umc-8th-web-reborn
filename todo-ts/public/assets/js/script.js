"use strict";
const todoInput = document.getElementById('todo-input');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');
if (!todoInput || !todoForm || !todoList || !doneList) {
    console.error('필수 HTML 요소가 없습니다.');
    throw new Error('필수 HTML 요소가 없습니다.');
}
let todos = [];
let doneTasks = [];
const renderTask = () => {
    if (!todoList || !doneList)
        return;
    console.log('현재 할 일 목록:', todos);
    console.log('현재 완료된 목록:', doneTasks);
    const todoFragment = document.createDocumentFragment();
    const doneFragment = document.createDocumentFragment();
    todos.forEach((todo) => {
        todoFragment.appendChild(createTodoElement(todo, false));
    });
    doneTasks.forEach((todo) => {
        doneFragment.appendChild(createTodoElement(todo, true));
    });
    todoList.innerHTML = '';
    doneList.innerHTML = '';
    todoList.appendChild(todoFragment);
    doneList.appendChild(doneFragment);
};
const getTodoText = () => {
    return todoInput.value.trim();
};
const addTodo = (text) => {
    console.log(`추가된 할 일: ${text}`);
    todos.push({ id: Date.now(), text, done: false });
    if (todoInput)
        todoInput.value = '';
    renderTask();
};
const completeTask = (todo) => {
    todos = todos.filter((t) => t.id !== todo.id);
    doneTasks.push(Object.assign(Object.assign({}, todo), { done: true }));
    renderTask();
};
const deleteTask = (todo) => {
    doneTasks = doneTasks.filter((t) => t.id !== todo.id);
    renderTask();
};
const createTodoElement = (todo, isDone) => {
    const li = document.createElement('li');
    li.classList.add('render-container__item');
    li.textContent = todo.text;
    const button = document.createElement('button');
    button.classList.add('render-container__item-button');
    if (isDone) {
        button.textContent = '삭제';
        button.style.backgroundColor = 'red';
    }
    else {
        button.textContent = '완료';
        button.style.backgroundColor = 'green';
    }
    button.addEventListener('click', () => {
        if (isDone) {
            deleteTask(todo);
        }
        else {
            completeTask(todo);
        }
    });
    li.appendChild(button);
    return li;
};
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = getTodoText();
    if (text.trim()) {
        addTodo(text);
    }
});
renderTask();
