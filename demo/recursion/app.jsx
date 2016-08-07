import React from 'ReactOverTheWire';

const css = `
.wrapper {
  position: relative;
  width: 620px;
  border: 10px solid blue;
}
`;

const OTW = props =>
        (
            <div {...props} ref={target => target.invoke('overTheWireWS', [props.url, props.channel])}>
            </div>
        );

const App = React.createClass({
    render: function () {
        let targetChannel = Math.random() > 0.15?'recursion':'todo';
        return (
            <div style="min-height:50px" className="wrapper">
                <style dangerouslySetInnerHTML={{__html:css}}/>
                <h1>ReactOverTheWire recursion</h1>
                <OTW url="ws://localhost:1234" channel={targetChannel}>
                </OTW>
            </div>
        );
    }
});

module.exports = App;