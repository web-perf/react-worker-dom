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
      <li className="checkbox">
        <label>
          <input type="checkbox" onChange={this.onToggle} checked={this.props.item.done}/>
          <span style={{textDecoration: this.props.item.done ? 'line-through' : '' }}> 
            {this.props.item.text}
          </span>
        </label>
        <span className="pull-right glyphicon glyphicon-trash" onClick={this.onDelete}>
          &nbsp;
        </span>
      </li>
    );
  }
});