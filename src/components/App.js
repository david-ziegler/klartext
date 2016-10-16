var React = require('react');

var Child = React.createClass({
  render: function () {
    return <h1>Hallo {this.props.name}</h1>;  
    }
});

module.exports = Child;