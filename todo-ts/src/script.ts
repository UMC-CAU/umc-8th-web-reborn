// 1. HTML 요소 선택 (핸드북 자바스크립트 참고)
const todoInput = document.getElementById('todo-input') as HTMLInputElement | null;
const todoForm = document.getElementById('todo-form') as HTMLFormElement | null;
const todoList = document.getElementById('todo-list') as HTMLUListElement | null;
const doneList = document.getElementById('done-list') as HTMLUListElement | null;

if (!todoInput || !todoForm || !todoList || !doneList) {
    console.error('필수 HTML 요소가 없습니다.');
    throw new Error('필수 HTML 요소가 없습니다.');
}

// 2. 할 일이 어떻게 생긴 애인지 Type을 정의
type Todo = {
  id: number;
  text: string;
  done: boolean;
}

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

// - 할 일 목록 렌더링 하는 함수를 정의
const renderTask = (): void => {
    if (!todoList || !doneList) return;

    console.log('현재 할 일 목록:', todos);  // 디버깅용
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
}

// 3. 할일 텍스트 입력 처리 함수.
const getTodoText = (): string => {
    return todoInput.value.trim();
}

// 4. 할 일 추가 처리 함수
const addTodo = (text: string): void => {
    console.log(`추가된 할 일: ${text}`); // 디버깅용
    todos.push({ id: Date.now(), text, done: false });
    if (todoInput) todoInput.value = '';
    renderTask();
}


// 5. 할 일 상태 변경 (완료로 이동)
const completeTask = (todo: Todo): void => {
    todos = todos.filter((t) => t.id !== todo.id);
    doneTasks.push({ ...todo, done: true });
    renderTask();
}

// 6. 완료된 할 일 삭제 함수
const deleteTask = (todo: Todo): void => {
    doneTasks = doneTasks.filter((t) => t.id !== todo.id);
    renderTask();
}

// 7. 할 일 아이템 생성 함수 (완료 여부에 따라 버튼 텍스트나 색상 설정)
const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
    const li = document.createElement('li');
    li.classList.add('render-container__item');
    li.textContent = todo.text;

    const button = document.createElement('button');
    button.classList.add('render-container__item-button');

    if (isDone) {
        button.textContent = '삭제';
        button.style.backgroundColor = 'red';
    } else {
        button.textContent = '완료';
        button.style.backgroundColor = 'green';
    }

    button.addEventListener('click', () => {
        if (isDone) {
            deleteTask(todo);
        } else {
            completeTask(todo);
        }
    });

    li.appendChild(button);
    return li;
};

// 8. 폼 제출 이벤트 리스너
todoForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    const text = getTodoText();
    if (text.trim()) {
        addTodo(text);
    }
});

renderTask();