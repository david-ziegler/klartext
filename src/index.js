var React = require('react');
var ReactDOM = require('react-dom');

var Posts = require('./components/posts.js');
var CategoryMenu = require('./components/categoryMenu.js');
var SpecifyUsername = require('./components/specifyUsername.js');

var style = require('./css/base.css');

// DATA
var groupData = {
  groupID: 1,
  groupName: "Group Name",
  categories: [
    {id: 0, name: "Allgemein"},
    {id: 1, name: "Kategorie 2"},
    {id: 2, name: "Kategorie 3"}
  ],
  posts: [
    {id: 0, user: 1, text: "Bla Bla Bla"},
    {id: 1, user: 1, text: "Blubb Blubb"},
    {id: 2, user: 2, text: "Papperlapapp!"},
  ]
};




// CODE:
var Group = React.createClass({
  getInitialState: function() {
    return {
      username: '', 
      selectedCategory: 0};
  },

  handleUsernameChange: function(username){
    this.state.username = username;
    console.log('username: ' + username);
  },

  getUsername: function(){
    // must pass a function, not the username as a prop, because the username might change after rendering.
    return this.state.username;
  },

  handleCategorySelection: function(catID){
    this.state.selectedCategory = catID;
    console.log('parent knows cat: ' + catID);
  },

  render: function () { 
    return (
      <div id="klartextGroup" className="flex-parent dir-col">

        <div id="header" className="flex-parent dir-row flex-child">
            <h1 id="groupname" className="flex-child">{groupData.groupName}</h1>
            <SpecifyUsername onUsernameSubmit={this.handleUsernameChange}/>
        </div>
        
        <div id="body" className="flex-parent dir-column flex-child">
          <CategoryMenu 
            categories={groupData.categories} 
            selectedCat={this.state.selectedCategory}
            onCategorySelection={this.handleCategorySelection}/>
          <Posts getUsername={this.getUsername}/>
        </div>
      </div>
    );
  }
});


// CODE
ReactDOM.render(   // TODO: don't use table for layout!
    <Group />,
    document.getElementById('app')
);