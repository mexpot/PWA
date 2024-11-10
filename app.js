const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Función para agregar una nueva tarea
function addTodo() {
    const todoText = todoInput.value.trim(); // Elimina los espacios en blanco al principio y final
    if (todoText === '') return;  // No agregar tareas vacías
    // Crear el nuevo elemento de lista (li)
    const li = document.createElement('li');
    li.textContent = todoText; // Agregar el texto de la tarea
    // Crear el botón de eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete');
    deleteBtn.addEventListener('click', () => {
        li.remove();  // Eliminar la tarea de la lista
    });

    li.appendChild(deleteBtn);  // Añadir el botón de eliminar a la tarea
    todoList.appendChild(li);    // Añadir la tarea a la lista
    todoInput.value = '';         // Limpiar el campo de entrada después de agregar la tarea
}

// Añadir evento para el botón "Agregar"
addBtn.addEventListener('click', addTodo);

// Añadir evento para la tecla "Enter" (también agrega la tarea)
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();  // Agregar tarea cuando se presiona "Enter"
    }
});

// Registro del Service Worker (con la corrección del error tipográfico)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
    .then(reg => console.log('Service Worker registrado:', reg))
    .catch(err => console.error('Error al registrar el Service Worker:', err));
}