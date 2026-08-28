// To-Do List App with Local Storage

class TodoApp {
    constructor() {
        this.todos = this.loadFromLocalStorage();
        this.currentFilter = 'all';
        this.editingId = null;

        this.initializeElements();
        this.attachEventListeners();
        this.render();
    }

    initializeElements() {
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.clearCompletedBtn = document.getElementById('clearCompleted');
        this.clearAllBtn = document.getElementById('clearAll');
        this.totalCount = document.getElementById('totalCount');
        this.completedCount = document.getElementById('completedCount');
        this.remainingCount = document.getElementById('remainingCount');
    }

    attachEventListeners() {
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentFilter = e.target.dataset.filter;
                this.updateFilterButtons();
                this.render();
            });
        });

        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        this.clearAllBtn.addEventListener('click', () => this.clearAll());
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        if (!text) {
            alert('Please enter a task!');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            priority: 'medium',
            createdAt: new Date().toLocaleString()
        };

        this.todos.unshift(todo);
        this.saveToLocalStorage();
        this.todoInput.value = '';
        this.render();
    }

    deleteTodo(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.todos = this.todos.filter(todo => todo.id !== id);
            this.saveToLocalStorage();
            this.render();
        }
    }

    toggleComplete(id) {
        this.todos = this.todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        this.saveToLocalStorage();
        this.render();
    }

    editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        const newText = prompt('Edit your task:', todo.text);
        if (newText === null) return;

        if (newText.trim() === '') {
            alert('Task cannot be empty!');
            return;
        }

        this.todos = this.todos.map(t => 
            t.id === id ? { ...t, text: newText.trim() } : t
        );
        this.saveToLocalStorage();
        this.render();
    }

    changePriority(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        const priorities = ['low', 'medium', 'high'];
        const currentIndex = priorities.indexOf(todo.priority);
        const nextIndex = (currentIndex + 1) % priorities.length;

        this.todos = this.todos.map(t => 
            t.id === id ? { ...t, priority: priorities[nextIndex] } : t
        );
        this.saveToLocalStorage();
        this.render();
    }

    clearCompleted() {
        if (confirm('Delete all completed tasks?')) {
            this.todos = this.todos.filter(todo => !todo.completed);
            this.saveToLocalStorage();
            this.render();
        }
    }

    clearAll() {
        if (confirm('Delete all tasks? This cannot be undone!')) {
            this.todos = [];
            this.saveToLocalStorage();
            this.render();
        }
    }

    getFilteredTodos() {
        if (this.currentFilter === 'active') {
            return this.todos.filter(todo => !todo.completed);
        } else if (this.currentFilter === 'completed') {
            return this.todos.filter(todo => todo.completed);
        }
        return this.todos;
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(todo => todo.completed).length;
        const remaining = total - completed;

        this.totalCount.textContent = total;
        this.completedCount.textContent = completed;
        this.remainingCount.textContent = remaining;
    }

    updateFilterButtons() {
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === this.currentFilter);
        });
    }

    render() {
        this.updateStats();
        const filteredTodos = this.getFilteredTodos();

        if (filteredTodos.length === 0) {
            this.todoList.innerHTML = '<p class="empty-message">No tasks in this view. 🎉</p>';
            return;
        }

        this.todoList.innerHTML = filteredTodos.map(todo => `
            <div class="todo-item ${todo.completed ? 'completed' : ''}">
                <input 
                    type="checkbox" 
                    class="checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    onchange="app.toggleComplete(${todo.id})"
                >
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <span class="todo-priority priority-${todo.priority}" onclick="app.changePriority(${todo.id})" style="cursor: pointer;">
                    ${todo.priority}
                </span>
                <div class="todo-actions">
                    <button class="btn-edit" onclick="app.editTodo(${todo.id})">Edit</button>
                    <button class="btn-delete" onclick="app.deleteTodo(${todo.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadFromLocalStorage() {
        const todos = localStorage.getItem('todos');
        return todos ? JSON.parse(todos) : [];
    }
}

// Initialize the app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new TodoApp();
    console.log('To-Do List App Loaded with Local Storage Support!');
});
