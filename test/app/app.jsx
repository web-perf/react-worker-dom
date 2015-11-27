import React from 'react';
import getData from './data';
import ENV from './env';

class Query extends React.Component{
  lpad(padding, toLength, str) {
    return padding.repeat((toLength - str.length) / padding.length).concat(str);
  };

  formatElapsed(value) {
    var str = parseFloat(value).toFixed(2);
    if (value > 60) {
        minutes = Math.floor(value / 60);
        comps = (value % 60).toFixed(2).split('.');
        seconds = this.lpad('0', 2, comps[0]);
        ms = comps[1];
        str = minutes + ":" + seconds + "." + ms;
    }
    return str;
  };
  
  render() {
    var className = "elapsed short";
    if (this.props.elapsed >= 10.0) {
        className = "elapsed warn_long";
    } else if (this.props.elapsed >= 1.0) {
        className = "elapsed warn";
    }

    return (
      <td className={"Query " + className}>
        {this.props.elapsed ? this.formatElapsed(this.props.elapsed) : '-'}
        <div className="popover left">        
          <div className="popover-content">{this.props.query}</div>
          <div className="arrow"/>
        </div>
      </td>
    );
  };
}


class Database extends React.Component{
      
    sample(queries, time) {
      var topFiveQueries = queries.slice(0, 5);
      while (topFiveQueries.length < 5) {
        topFiveQueries.push({ query: "" });
      }

      var _queries = [];
      topFiveQueries.forEach(function(query, index) {
        _queries.push(
          <Query
            key={index}
            query={query.query}
            elapsed={query.elapsed}
          />
        );
      });

      var countClassName = "label";
      if (queries.length >= 20) {
        countClassName += " label-important";
      }
      else if (queries.length >= 10) {
        countClassName += " label-warning";
      }
      else {
        countClassName += " label-success";
      }

      return [
        <td className="query-count" key="1">
          <span className={countClassName}>
            {queries.length}
          </span>
        </td>,
        _queries
      ];
    };

    render() {
        var lastSample = this.props.samples[this.props.samples.length - 1];

        return (
          <tr key={this.props.dbname}>
            <td className="dbname">
              {this.props.dbname}
            </td>
            {this.sample(lastSample.queries, lastSample.time)}
          </tr>
        );
    };
};

class DBMon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      databases: {}
    };
  };

  loadSamples() {
    var newData = getData();
    Object.keys(newData.databases).forEach(function(dbname) {
      var sampleInfo = newData.databases[dbname];
      if (!this.state.databases[dbname]) {
        this.state.databases[dbname] = {
          name: dbname,
          samples: []
        }
      }

      var samples = this.state.databases[dbname].samples;
      samples.push({
        time: newData.start_at,
        queries: sampleInfo.queries
      });
      if (samples.length > 5) {
        samples.splice(0, samples.length - 5);
      }
    }.bind(this));

    this.setState(this.state);
    //setTimeout(function(){this.setState(this.state)}.bind(this), 100);
    setTimeout(this.loadSamples.bind(this), ENV.timeout);
  };

  componentDidMount() {
    this.loadSamples();
  };

  render() {
    var databases = [];
    Object.keys(this.state.databases).forEach(function(dbname) {
      databases.push(
        <Database key={dbname}
          dbname={dbname}
          samples={this.state.databases[dbname].samples} />
      );
    }.bind(this));

    return (
      <div>
        <table className="table table-striped latest-data">
          <tbody>
            {databases}
          </tbody>
        </table>
      </div>
    );
  };
}

export default DBMon;