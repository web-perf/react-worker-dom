var React = require('ReactOverTheWire');

const SIZE = 40;

const MAX_X = 600 - SIZE;
const MAX_Y = 400 - SIZE;

function randInt(v) {
    return Math.floor(Math.random() * v);
}

const css = `
.container {
  position: relative;
  width: ${MAX_X + SIZE}px;
  height: ${MAX_Y + SIZE}px;
}
.box {
  position: absolute;
  width: ${SIZE}px;
  height: ${SIZE}px;
  background: red;
}
`;


const App = React.createClass({
    getInitialState: ()=> {
        return {
            items: Array(20).fill().map(() => {
                return {x: randInt(MAX_X), y: randInt(MAX_Y)};
            }),
            moveX: null,
            moveY: null,
            moveIndex: null
        };
    },
    render: function () {
        return (
            <div className="container"
                 onMouseMove={(e) => {
                                if (this.state.moveIndex === null) {
                                    return;
                                }
                                const newItem = {x: this.state.moveX + e.screenX, y: this.state.moveY + e.screenY};
                                const newItems = this.state.items.slice(0, this.state.moveIndex).concat([newItem]).concat(this.state.items.slice(this.state.moveIndex + 1));
                                this.setState({items: newItems});
                            }}
                 onMouseUp={() => this.setState({
                                        moveX: null,
                                        moveY: null,
                                        moveIndex: null
                 })}
                >
                <style dangerouslySetInnerHTML={{__html:css}}/>
                {this.state.items.map((i, index) => {
                        const evts = {
                            onMouseDown: (e)=> {
                                if (this.state.moveIndex === null && this.state.moveIndex !== index) {
                                    this.setState({moveX: i.x - e.screenX, moveY: i.y - e.screenY, moveIndex: index});

                                }
                            }
                        };
                        return <div className="box" key={`b${index}`} style={{top:i.y+'px',left:i.x+'px'}}
                            {...evts}
                            />
                    }
                )}
            </div>
        );
    }
})

module.exports = React.createFactory(App);