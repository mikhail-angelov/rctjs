import { h, app } from "../src/index"

const Task = ({ selected, name, onSelect, onRemove }) => {
  return (<div>
    <input
      type="checkbox"
      checked={selected}
      onchange={e => onSelect(e.target.value)}
    />
    {name}
    <button onclick={onRemove}>remove</button>
  </div>)
}

function view(state) {
  const tasks = state.tasks.map((task, index) => (<Task
    selected={task.completed}
    name={task.name}
    onSelect={value => render({ ...state, tasks: state.tasks.map((item, i) => i === index ? { ...item, completed: !item.completed } : item) })}
    onRemove={() => render({ ...state, tasks: state.tasks.filter((_, i) => i !== index) })}
  />))
  return (
    <div>
      <h2>ToDo</h2>
      {tasks}
      <input
        autofocus
        type="text"
        value={state.newTask}
        oninput={e => render({ ...state, newTask: e.target.value })}
      />
      <button onclick={() => render({ ...state, tasks: [{ name: state.newTask }, ...state.tasks], newTask: '' })}>
        Add task
      </button>
    </div>
  )
}

const render = app('body', view, { tasks: [{ name: 'investigate vdom', completed: false }], newTask: '' })
