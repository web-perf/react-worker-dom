import React from 'ReactOverTheWire';

const css = `
.container {
  position: relative;
  width: 600px;
}
.box {
    color: white;
    text-align: center;
    font-size: 18pt;
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

const Masonry = React.createClass({
    render: function () {
        return (
            <div {...this.props} ref="masonry">
                {this.props.children}
            </div>
        );
    },
    componentDidMount: function () {
        this.refs.masonry.invoke('masonry', [this.props.columns]);
    }
});

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
            <div style="min-height:50px">
                <style dangerouslySetInnerHTML={{__html:css}}/>
                <Masonry columns={3} className="container">
                    {this.state.items.map((h, index) =>
                        <div className="box" style={{height:h +'px'}} key={'box'+index}>{index}</div>)}
                </Masonry>
            </div>
        );
    }
});

module.exports = App;