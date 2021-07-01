import './App.css';
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      activeItem: {
        id: null,
        name: "",
        completed: false
      },
      editing: false,

    }
    this.fetchTask = this.fetchTask.bind(this)

  };


  getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }



  componentWillMount() {
    this.fetchTask()
  }

  fetchTask() {
    fetch('http://127.0.0.1:8000/api/list/')
      .then(response => response.json())
      .then(data => {
        this.setState({
          todoList: data
        })
      })
  }

  taskHandler = (event) => {
    this.setState({
      activeItem: {
        ...this.state.activeItem,
        name: event.target.value
      }
    })
  }

  startEdit = (task) => {
    this.setState({
      activeItem: task,
      editing: true
    })
  }

  makeFetchRequest = ((url, fetchmethod, fetchBody) => {
    return fetch(
      url, {
      method: fetchmethod,
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': this.getCookie('csrftoken')
      },
      body: fetchBody
    }
    )
  })

  //handle submit

  handleSubmit = (event) => {
    event.preventDefault();
    var url = 'http://127.0.0.1:8000/api/create/';
    var fetchMethod = 'POST'
    if (this.state.editing === true) {
      url = `http://127.0.0.1:8000/api/update/${this.state.activeItem.id}`
      fetchMethod = 'PUT'
      this.setState({
        editing: false
      })
    }
    var csrftoken = this.getCookie('csrftoken')
    var fetchbody = JSON.stringify(this.state.activeItem)

    // fetch(url, {
    //   method: fetchMethod,
    //   headers: {
    //     'Content-type': 'application/json',
    //     'X-CSRFToken': csrftoken
    //   },
    //   body:JSON.stringify(this.state.activeItem)
    // })
    this.makeFetchRequest(url, fetchMethod, fetchbody)
      .then((response) => {
        this.fetchTask()
        this.setState({
          activeItem: {
            name: "",
            completed: false
          }
        })
      })
  }


  //end submit

  deleteMethod = (task) => {
    var url = `http://127.0.0.1:8000/api/delete/${task.id}`
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': this.getCookie('csrftoken')
      }
    }).then((response) => {
      this.fetchTask()
    })
  }
  strikeUnstrike(task) {
    task.completed = !task.completed
    var url = `http://127.0.0.1:8000/api/update/${task.id}`
    var fetchMethod = 'PUT'
    var methodBody = { 'completed': task.completed, name: task.name }
    methodBody = JSON.stringify(methodBody)
    this.makeFetchRequest(url, fetchMethod, methodBody)
      .then(() => {
        this.fetchTask()
      })
  }

  render() {
    var tasks = this.state.todoList
    var self = this
    return (
      <div className="container">
        <div id="task-container">
          <div id="form-wrapper">
            <form onSubmit={this.handleSubmit} id="form">
              <div className="flex-wrapper">
                <div style={{ flex: 6 }}>
                  <input value={this.state.activeItem.name} onChange={this.taskHandler} className="form-control" id="title" type="text" name="title" placeholder="Add Task"></input>
                </div>

                <div style={{ flex: 1 }}>
                  <input id="submit" className="btn btn-warning" type="submit" name="Add"></input>
                </div>

              </div>

            </form>

          </div>

          <div id="list-wrapper">
            {tasks.map(function (task, index) {
              return (
                <div key={index} className="task-wrapper flex-wrapper">

                  <div onClick={() => self.strikeUnstrike(task)} style={{ flex: 7 }}>
                    {task.completed === false ? (
                      <span>{task.name}</span>
                    ) :
                      <strike>{task.name}</strike>
                    }

                  </div>

                  <div style={{ flex: 1 }}>
                    <button onClick={() => self.startEdit(task)} className="btn btn-sm btn-outline-info">Edit</button>
                  </div>

                  <div style={{ flex: 1 }}>
                    <button onClick={() => self.deleteMethod(task)} className="btn btn-sm btn-outline-dark delete">Delete</button>
                  </div>

                </div>

              )
            }
            )}
          </div>

        </div>
      </div>
    )
  }
}


export default App;
// export { HelloFunction };
