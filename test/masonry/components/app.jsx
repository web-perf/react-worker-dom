import React from 'ReactOverTheWire';

const css = `
.container {
  position: relative;
  width: 600px;
}
.box {
    width: 180px;
    margin: 10px;
    position: absolute;
    background: red;
    box-sizing: border-box;
}
`;

function randInt(v) {
    return Math.floor(Math.random() * v);
}

const App = React.createClass({
    getInitialState: ()=> {
        return {
            items: Array(20).fill().map(() => {
                return randInt(20) * 10 + 20;
            })
        };
    },
    render: function () {
        return (
            <div className="container" ref="masonry">
                 <style dangerouslySetInnerHTML={{__html:css}}/>

                 {this.state.items.map((h, index) => 
                    <div className="box" style={{height:h +'px'}} key={'box'+index}/>)}
            </div>
        );
    },
    componentDidMount: function () {
        this.refs.masonry.invoke('masonry', [3]);
    }
})

module.exports = React.createFactory(App);