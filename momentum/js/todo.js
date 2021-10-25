import {STRINGS} from './strings.js'

export default class ToDoList{
    constructor() {
        this.button = document.querySelector('.todo-button')
        this.input = document.querySelector('.todo-input')
        this.list = document.querySelector('.todo-list')

        this.setListeners()
        this.updateLang()
        this.load()
    }

    updateLang(){
        const lang = localStorage.getItem('lang');
        this.input.placeholder = STRINGS.todo[lang]['todo_placeholder']
    }

    setListeners(){
        this.button.addEventListener('click', () => {
            this.list.classList.toggle('todo-show')
        })

        this.input.addEventListener('change', () => {
            this.addTask(this.input.value);
            this.input.value = ''
        })
        document.addEventListener('changeLang', ()=>{
            this.update();
        })

    }

    _addDelButton(item){
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('todo-delete');
        item.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', evt => {
            this.list.removeChild(evt.target.parentNode)
            this.save()
        })
    }

    _createTask(text){
        const task = document.createElement('li');
        task.classList.add('todo-item');
        task.textContent = text;

        task.addEventListener('click', () => {
            task.classList.toggle('todo-item-complete')
            this.save()
        })

       this._addDelButton(task)

        return task
    }

    _completeTask(task){
        task.classList.add('todo-item-complete');
    }

    addTask(taskText, complete=false){
        const newTask = this._createTask(taskText)

        if (complete){
            this._completeTask(newTask)
        }

        this.list.prepend(newTask)
        this.save()
    }

    save(){
        const items = []
        for (let task of this.list.children){
            if (task.classList.contains('todo-item')){
                items.push({
                    text:  task.textContent,
                    finished: task.classList.contains('todo-item-complete')
                })
            }
        }
        localStorage.setItem('ToDoList', JSON.stringify(items));
    }

    load(){
        const itemsSerial = localStorage.getItem('ToDoList')
        if (itemsSerial) {
            const items = JSON.parse(itemsSerial)
            for (let i=items.length-1; i>=0; i--){
                this.addTask(items[i].text, items[i].finished)
            }
        }
    }


}