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
        <div className="input-group">
          <input onChange={this.onChange} value={this.state.text} className="form-control" type="text"/>
          <span className="input-group-btn">
            <button className="btn btn-primary">
              <span className="glyphicon glyphicon-plus"></span>
            </button>
          </span>
        </div>
        <span className="help-block text-right">
          <em>{this.state.text !== '' ? this.state.text : '<empty>'} </em>
          &nbsp;will be added to the list
        </span>
      </form>
    );
  }
});
