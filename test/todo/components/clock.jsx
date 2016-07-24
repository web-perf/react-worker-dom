var React = require('ReactOverTheWire');

module.exports = React.createClass({
  getInitialState(){
    return {
      time: new Date(),
      closed: false
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
    if (this.timerHandle){
      clearInterval(this.timerHandle);
      delete this.timerHandle;
    }
  },
  closeTime: function(){
    this.setState({closed: true});
    this.componentWillUnmount();
  },
  render(){
      if (this.state.closed){
        return (<div></div>);
      } else {
        return (
          <div>
            <span>Current time: &nbsp;
              <b>
                <span>{this.state.time.toString()}</span>
              </b>
              <button className="close pull-right" onClick={this.closeTime}>
                <span>&times;</span>
              </button>
            </span>
          </div>
        );
      }
  }
});
