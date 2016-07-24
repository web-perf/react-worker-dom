var React = require('ReactOverTheWire');

module.exports = React.createClass({
  onDelete: function() {
    this.props.onDelete(this.props.index);
  },

  onToggle: function(e) {
    this.props.onToggle(this.props.index, e.target.checked);
  },

  moveUp: function(e){
    this.props.onMove(this.props.index, -1);
  },

  moveDown: function(){
    this.props.onMove(this.props.index, 1);
  },

  render: function() {
    return (
      <li className="clearfix list-group-item">
        <div className="pull-right">
          <span onClick={this.moveUp} className="glyphicon glyphicon-collapse-up"></span>
          <span onClick={this.moveDown} className="glyphicon glyphicon-collapse-down"></span>
          &nbsp;&nbsp;
          <span onClick={this.onDelete} className="glyphicon glyphicon-trash">
          </span>
        </div>
        <input type="checkbox" onChange={this.onToggle} checked={this.props.item.done}/>
        &nbsp;&nbsp;
        <span style={{textDecoration: this.props.item.done ? 'line-through' : '' }}> 
          {this.props.item.text}
        </span>
      </li>
    );
  }
});