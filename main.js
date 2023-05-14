import './style.css'
import { addTask, editDocument, getTasks } from './firebase'
let tasks = []
await renderTasks()
const buttonTask = document.getElementById('create-todo')
buttonTask.addEventListener('click', async ()=> await handleClick())

async function renderTasks() {
  tasks = await getTasks()
  const todocontainer = document.querySelector('#to-do-container')

  todocontainer.innerHTML = ''
  // crea tarea que traigo de firebase, y añado evento que es clickeable
  tasks.forEach(task => {
    const elem = document.createElement('li')
    elem.textContent = task.title

    //editDocument que estoy exportando desde firebase
    if(task.completed){elem.style.textDecoration = 'line-through'}
    elem.addEventListener('click', async()=>{
      await editDocument(task.title, task.id)
      await renderTasks()
    })

    todocontainer.append(elem)
  });
}
async function handleClick(){
  const inputTask = document.getElementById('input-todo')
  const inputText = inputTask.value

  await addTask(inputText)
  inputTask.value = ''
  await renderTasks()
}

