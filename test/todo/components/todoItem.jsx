var React = require('react');

module.exports = React.createClass({
  onDelete: function() {
    this.props.onDelete(this.props.index);
  },

  onToggle: function(e) {
    this.props.onToggle(this.props.index, e.target.checked);
  },

  render: function() {
    return (
      <li className="clearfix list-group-item">
        <span onClick={this.onDelete} className="pull-right glyphicon glyphicon-trash">
        </span>
        <input type="checkbox" onChange={this.onToggle} checked={this.props.item.done}/>
        &nbsp;&nbsp;
        <span style={{textDecoration: this.props.item.done ? 'line-through' : '' }}> 
          {this.props.item.text}
        </span>
      </li>
    );
  }
});