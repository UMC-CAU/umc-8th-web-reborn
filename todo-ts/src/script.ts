// HTML 요소 선택
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

// 할 일 및 완료된 작업을 저장할 배열
type Task = {
  id: number;
  text: string;
};

let todos: Task[] = [];
let doneTasks: Task[] = [];

// 할 일 텍스트 입력 처리 함수
const getTodoText = (): string => {
  return todoInput.value.trim();
};

// 할 일 추가 함수
const addTodo = (text: string): void => {
  todos.push({ id: Date.now(), text });
  console.log(todos);
  todoInput.value = '';
  renderTasks();
};

// 할 일 상태 변경 (완료로 이동)
const completeTask = (task: Task): void => {
  todos = todos.filter((t) => t.id !== task.id);
  doneTasks.push(task);
  renderTasks();
};

// 완료된 할 일 삭제 함수
const deleteTask = (task: Task): void => {
  doneTasks = doneTasks.filter((t) => t.id !== task.id);
  renderTasks();
};

// 할 일 아이템 생성 함수
const createTaskElement = (task: Task, isDone: boolean): HTMLLIElement => {
  const li = document.createElement('li');
  li.classList.add('render-container__item');
  li.textContent = task.text;

  const button = document.createElement('button');
  button.classList.add('render-container__item-button');

  // 완료 여부에 따른 버튼 텍스트 및 색상 설정
  if (isDone) {
    button.textContent = '삭제';
    button.style.backgroundColor = '#dc3545'; // 빨간색 (삭제)
  } else {
    button.textContent = '완료';
    button.style.backgroundColor = '#28a745'; // 초록색 (완료)
  }

  button.addEventListener('click', () => {
    if (isDone) {
      deleteTask(task);
    } else {
      completeTask(task);
    }
  });

  li.appendChild(button);
  return li;
};

// 할 일 목록 렌더링 함수
const renderTasks = (): void => {
  todoList.innerHTML = '';
  doneList.innerHTML = '';

  todos.forEach((task) => {
    const li = createTaskElement(task, false);
    todoList.appendChild(li);
  });

  doneTasks.forEach((task) => {
    const li = createTaskElement(task, true);
    doneList.appendChild(li);
  });
};

// 폼 제출 이벤트 리스너
todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const text = getTodoText();
  if (text) {
    addTodo(text);
  }
});

// 초기 렌더링
renderTasks();
