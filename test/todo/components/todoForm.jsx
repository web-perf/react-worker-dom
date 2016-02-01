var React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return {text: ''}
  },
  onChange: function(e){
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    this.props.onAddItem(this.state.text || '<empty>');
    this.setState({
      text: ''
    });
    e.preventDefault();
  },
  render: function(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.onChange} value={this.state.text} className="form-control"/>
        <button className="btn btn-block">
          Add
        </button>
        <span className="help-block text-right">
          {this.state.text ? this.state.text : '<empty>'} 
          &nbsp;will be added to the list
        </span>
      </form>
    );
  }
});