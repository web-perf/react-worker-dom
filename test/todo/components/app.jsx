var React = require('ReactOverTheWire');
var TodoItem = require('./todoItem.jsx');
var TodoForm = require('./todoForm.jsx');
var Clock = require('./clock.jsx');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      items: []
    }
  },

  addItem: function(item) {
    this.setState({
      items: this.state.items.concat({
        text: item, 
        done: false
      })
    });
  },

  deleteItem: function(i) {
    var a = this.state.items;
    this.setState({
      items: a.slice(0,i).concat(a.slice(i+1, a.length))
    });
  },

  toggleItem: function(i, checked) {
    var a = this.state.items;
    var items =  a.slice(0,i)
        .concat({
          text: this.state.items[i].text,
          done: checked
        })
        .concat(a.slice(i+1, a.length));
  
    this.setState({
      items: items
    });
  },

  moveItem: function(i, direction){
    var items = this.state.items.slice(0);
    var swap = items[i + direction];
    if (swap){
      items[i + direction] = items[i];
      items[i] = swap;
      this.setState({items: items});
    }
  },

  renderList: function(items){
    if (items.length === 0){
      return <blockquote className="small">Add some todo items</blockquote>
    } else {
      return (
        <ol className="list-group">
          {items.map((item, i) => {
            return (
              <TodoItem 
                onToggle={this.toggleItem}
                onDelete={this.deleteItem}
                onMove={this.moveItem}
                key={i} item={item} index={i}/>
            );
          })}
        </ol>
      )
    }
  },
  render: function() {
    return (
      <div className="well">
        <h3 className="text-center">TODO</h3>
        {this.renderList(this.state.items)}
        <TodoForm onAddItem={this.addItem}/>
        <hr/>
        <Clock/>
      </div>
    );
  }
});
