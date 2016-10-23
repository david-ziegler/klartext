var React = require('react');

var SpecifyUsername = React.createClass({
  getInitialState: function() {
    return {username: ''};
  },

  handleUsernameChange: function(e) {
    this.setState({username: e.target.value});
    console.log(e.keyCode);
  },

  handleSubmit: function(e){
    e.preventDefault();
    var username = this.state.username.trim();
    if(!username) return;
    else this.props.onUsernameSubmit(username);
  },

  render: function () {
    return (
      <div className="specifyUsername flex-child">
        <form className="specifyUsernameForm" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Your name"
            onChange={this.handleUsernameChange} />
          <input
            type="submit"
            value="ok" />
        </form>
      </div>
    );
  }
});


module.exports = SpecifyUsername;
