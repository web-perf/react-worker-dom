import React from 'react';

class Com11 extends React.Component {
    render() {
        return <com11>Com11</com11>
    };
}
class Com12 extends React.Component {
    render() {
        return <com12>Com12</com12>
    };
}
class Com2 extends React.Component {
    render() {
        return <com2>Com2</com2>
    };
}
class Com1 extends React.Component {
    render() {
        return <com1><h2>Com1</h2><Com11/><Com12/></com1>
    };
}
export default class Com extends React.Component {
      constructor(p){
        super(p);
        this.state = {secondsElapsed:0};
      }
      tick() {
        this.setState({secondsElapsed: this.state.secondsElapsed + 1});
      }
      componentDidMount() {
        this.interval = setInterval(this.tick.bind(this), 100);
      }
      componentWillUnmount(){
        clearInterval(this.interval);
      }
      render(){
        return (
          <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
        );
      }
}

