import React from 'react';

var Clock = React.createClass({
  getInitialState(){
    return {
      time: new Date()
    }
  }, 
  componentDidMount(){
    setInterval(()=>{
      this.setState({
        time: new Date()
      });
    }, 1000);
  }, 
  render(){
    return <span>{this.state.time.toString()}</span>;
  }
})

var TodoList = React.createClass({
  render: function() {
    var createItem = function(itemText, index) {
      return <li key={index + itemText}>{itemText}</li>;
    };
    if (this.props.items.length === 0){
      return <blockquote>Add some todo items</blockquote>
    } else {
      return <ul>{this.props.items.map(createItem)}</ul>;
    }
  }
});

var TodoApp = React.createClass({
  getInitialState: function() {
    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  render: function() {
    return (
      <div className="well">
        <h3 className="text-center">TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} className="form-control"/>
          <button className="btn btn-block">Add </button>
          <span className="help-block">{this.state.text ? this.state.text : '<empty>'} will be added as Item # {this.state.items.length}</span>
        </form>
        <hr/>
        Current time: <b><Clock/></b>
      </div>
    );
  }
});

export default TodoApp;