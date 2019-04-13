import React, { Component } from "react";
import "./dashboard.css";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backlog: [],
      toDo: [],
      inProgress: [],
      complete: [],
      backlogInput: '',
      todoInput: '',
      completeInput: '',
      inProgressInput: ''
    };
  }

  newBacklogHandler = (text) => {
    this.setState({backlogInput: text})
  }
  newToDoHandler = (text) => {
    this.setState({todoInput: text})
  }
  newInProgressHandler = (text) => {
    this.setState({inProgressInput: text})
  }
  newCompleteHandler = (text) => {
    this.setState({completeInput: text})
  }

  addBacklogTask = (task) => {
    this.setState({backlog: [...this.state.backlog, this.state.backlogInput || task], backlogInput: ''})
  }
  addTodoTask = (task) => {
    this.setState({toDo: [...this.state.toDo, this.state.todoInput || task], todoInput: ''})
  }
  addInProgressTask = (task) => {
    this.setState({inProgress: [...this.state.inProgress, this.state.inProgressInput || task], inProgressInput: ''})
  }
  addCompleteTask = (task) => {
    this.setState({complete: [...this.state.complete, this.state.completeInput || task], completeInput: ''})
  }

  moveBacklogRight = (task, index,  backlog) => {
    this.addTodoTask(task)
    backlog.splice(index, 1)
  }
  moveTodoLeft = (task, index,  todo) => {
    this.addBacklogTask(task)
    todo.splice(index, 1)
  }
  moveTodoRight = (task, index,  todo) => {
    this.addInProgressTask(task)
    todo.splice(index, 1)
  }
  moveInProgressLeft = (task, index,  inProgress) => {
    this.addTodoTask(task)
    inProgress.splice(index, 1)
  }
  moveInProgressRight = (task, index,  inProgress) => {
    this.addCompleteTask(task)
    inProgress.splice(index, 1)
  }
  moveCompleteLeft = (task, index,  complete) => {
    this.addInProgressTask(task)
    complete.splice(index, 1)
  }

  render() {
     let {backlog, toDo, inProgress, complete, backlogInput, todoInput, completeInput, inProgressInput} = this.state 
     let mappedBacklog = backlog.map((task, i) => {
         return (
             <div className='backlog__innerContainer'>
            <p >{task}</p>
            <div>
            <button onClick={e => this.moveBacklogRight(task, i, backlog)}>{`>`}</button>
            </div>
            </div>
        )
     })
     let mappedComplete = complete.map((task, i) => {
         return (
             <div className='complete__innerContainer'>
            <p >{task}</p>
            <div>
            <button onClick={e => this.moveCompleteLeft(task, i , complete)}>{`<`}</button>
            </div>
            </div>
        )
     })
     let mappedTodo = toDo.map((task, i) => {
         return (
             <div className='toDo__innerContainer'>
            <p >{task}</p>
            <div>
            <button onClick={e => this.moveTodoLeft(task, i , toDo)}>{`<`}</button>
            <button onClick={e => this.moveTodoRight(task, i , toDo)}>{`>`}</button>
            </div>
            </div>
        )
     })
     let mappedInProgress = inProgress.map((task, i) => {
         return (
             <div className='inProgress__innerContainer'>
            <p >{task}</p>
            <div>
            <button onClick={e => this.moveInProgressLeft(task, i , inProgress)}>{`<`}</button>
            <button onClick={e => this.moveInProgressRight(task, i , inProgress)}>{`>`}</button>
            </div>
            </div>
        )
     })
     
    return (
      <div className="dashContainer">
        <div className="dashContainer__backlog">
          <h1>Backlog</h1>
          <input value={backlogInput} onChange={e => this.newBacklogHandler(e.target.value)} placeholder='Enter Task...'/><button onClick={e => this.addBacklogTask()}>Enter</button>
          <div>{mappedBacklog}</div>
        </div>
        <div className="dashContainer__toDo">
          <h1>To Do</h1>
          <input value={todoInput} onChange={e => this.newToDoHandler(e.target.value)} placeholder='Enter Task...'/><button onClick={e => this.addTodoTask()}>Enter</button>
          <div>{mappedTodo}</div>
        </div>
        <div className="dashContainer__inProgress">
          <h1>In Progress</h1>
          <input value={inProgressInput} onChange={e => this.newInProgressHandler(e.target.value)} placeholder='Enter Task...'/><button onClick={e => this.addInProgressTask()}>Enter</button>
          <div>{mappedInProgress}</div>
        </div>
        <div className="dashContainer__Complete">
          <h1>Complete</h1>
          <input value={completeInput} onChange={e => this.newCompleteHandler(e.target.value)} placeholder='Enter Task...'/><button onClick={e => this.addCompleteTask()}>Enter</button>
          <div>{mappedComplete}</div>
        </div>
      </div>
    );
  }
}
