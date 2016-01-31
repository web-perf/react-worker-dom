import React from 'react';

var Clock = React.createClass({
  getInitialState(){
    return {
      time: new Date()
    }
  }, 
  componentDidMount(){
    this.timerHandle = setInterval(()=>{
      this.setState({
        time: new Date()
      });
    }, 1000);
  },
  componentWillUnmount(){
    clearInterval(this.timerHandle);
    delete this.timerHandle;
  },
  render(){
    return <span>{this.state.time.toString()}</span>;
  }
})

var TodoItem = React.createClass({
  getInitialState: function(){
    return {checked: false};
  },
  onChange: function(e){
    this.setState({checked: !!e.target.checked});
  },
  deleteItem: function(){
    this.props.onDeleteItem();
  },
  render: function() {
    return (
      <li className="checkbox">
        <label>
          <input type="checkbox" onChange={this.onChange}/>
          <span style={{textDecoration: this.state.checked ? 'line-through' : '' }}> 
            {this.props.children}
          </span>
        </label>
        <span className="pull-right glyphicon glyphicon-trash" onClick={this.deleteItem}>&nbsp;</span>
      </li>);
  }
})

var TodoList = React.createClass({
  onDeleteItem: function(i){
    return function(){ 
      this.props.onDeleteItem(i);
    }.bind(this);
  },
  render: function() {
    if (this.props.items.length === 0){
      return <blockquote>Add some todo items</blockquote>
    } else {
      return (
      <ul>
        {this.props.items.map((item, i) => {
          return <TodoItem key={i} onDeleteItem={this.onDeleteItem(i)}>{item}</TodoItem>
        })}
      </ul>) ;
    }
  }
});

var TodoApp = React.createClass({
  getInitialState: function() {
    return {items: [], text: '', showTime: true};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  onDeleteItem: function(i){
    var a = this.state.items;
    this.setState({items: a.slice(0,i).concat(a.slice(i+1, a.length))});
  }, 
  handleSubmit: function(e) {
    e.preventDefault();
    this.state.text = this.state.text || '<empty>';
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  closeTime: function(e){
    this.setState({showTime: false})
  },
  showTime: function(){
    if (this.state.showTime){
      return (
      <div>
        Current time: <b><Clock/></b>
        <button className="close pull-right" onClick={this.closeTime}><span>&times;</span></button>
      </div>);
    }
  },
  render: function() {

    return (
      <div className="well">
        <h3 className="text-center">TODO</h3>
        <TodoList items={this.state.items} onDeleteItem={this.onDeleteItem}/>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} className="form-control"/>
          <button className="btn btn-block">Add </button>
          <span className="help-block">{this.state.text ? this.state.text : '<empty>'} will be added as Item # {this.state.items.length}</span>
        </form>
        <hr/>
        {this.showTime()}
      </div>
    );
  }
});

export default TodoApp;