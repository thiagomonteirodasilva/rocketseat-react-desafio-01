import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Função que cria uma nova task
    if(newTaskTitle){
      setTasks([...tasks,
        {
          title: newTaskTitle,
          id: Date.now() + Math.random(), //gerando um ID único e aleatório
          isComplete: false
        }
      ]);
      setNewTaskTitle('');
    }
  }

  function handleToggleTaskCompletion(id: number) {
    //Marcando tarefa como concluída ou não
    tasks.map((task, index) => {
        if(id === task.id){
          const completeTask = [...tasks];
          if(task.isComplete === false){
            completeTask[index].isComplete = true;
            setTasks(completeTask);
          } else {
            completeTask[index].isComplete = false;
            setTasks(completeTask);
          }
        }
    })
  }

  function handleRemoveTask(id: number) {
    // Função que remove uma task
    const taskRemoved = tasks.filter(task => id !== task.id)
    setTasks(taskRemoved);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}