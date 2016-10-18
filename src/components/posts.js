var React = require('react');


var Post = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return {__html: rawMarkup};
  },

  render: function () {
    return (
      <div className="post">
        <span className="postAuthor">
          {this.props.author}:
        </span>
        <span className="postContent">
          {this.props.children.toString()}    
        </span>
      </div>
    );
  }
});

// TODO: support markdown
//<span dangerouslySetInnerHTML={this.rawMarkup()} />



var Thread = React.createClass({
  render: function () {
    return (
      <div className="thread">
        <Post 
          author={this.props.author} 
          key={this.props.key}>
            {this.props.children}
        </ Post>
        <AddComment />
      </div>
    );
  }
});




var ThreadList = React.createClass({
  render: function () {
    var allPosts = this.props.data.reverse();
    var threadNodes = allPosts.map(function(thread){
      return (
        <Thread author={thread.author} key={thread.id}>
        {thread.text}
        </Thread>
      );
    });

    return (
      <div className="PostList">
        {threadNodes}
      </div>
    );
  }
});


var AddPost = React.createClass({
  getInitialState: function() {
    return {text: ''};
  },

  handleTextChange: function(e) {
    if(e.keyCode == 13){            // TODO: submit when pressing enter
      // pressed enter --> submit:
      alert('pressed enter');
      console.log(e.keyCode);
    }
    else{
      this.setState({text: e.target.value});
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var text = this.state.text.trim();
    if(!text) {
      return;
    }

    console.log('post submit: ' + (typeof this.props.onPostSubmit));
    this.props.onPostSubmit({text: text});
    this.setState({text: ''});
  },

  render: function() {
    var placeholder = (this.props.postType == "newThread") ? "new post" : "comment";

    return (
      <div className={this.props.postType}>
        <form className={this.props.postType} onSubmit={this.handleSubmit}>
          <textarea
            className={this.props.postType}
            placeholder={placeholder}
            onChange={this.handleTextChange}></textarea>
          <input type="submit" value="post" />
        </form>
      </div>
    );
  }
});



var AddThread = React.createClass({
  render: function (){
    return (
      <AddPost postType="newThread" onPostSubmit={this.props.onPostSubmit}/>
    );
  }
});

var AddComment = React.createClass({
  render: function (){
    return (
      <AddPost postType="comment" onPostSubmit={this.props.onPostSubmit}/>
    );
  }
});


var AllPosts = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  loadPostsFromServer: function() {

    /*  TODO: GET posts from server
    *   on success: this.setState({data: data});
    */
  },

  handlePostSubmit: function(post) {
    var posts = this.state.data;
    // optimistically set an ID to add the post immediately,
    // will be replaced by ID from server later. TODO: create ID in more sophisticated way than Date.now()
    post.id = Date.now(); 
    post.author = this.props.getUsername();
    var newPosts = posts.concat([post]);
    this.setState({data: newPosts});

    /* TODO: POST post to server
    *  on success(newData): this.setState({data: newData});
    *  on failure: this.setState({data: data});
    */
  },

  componentDidMount: function() {
    this.loadPostsFromServer();
    setInterval(this.loadPostsFromServer, this.props.pollInterval);
  },

  render : function() {
    return (
      <div className="posts flex-child">
          <AddThread onPostSubmit={this.handlePostSubmit}/>
          <ThreadList data={this.state.data}/>
      </div>
    );
  }
});

module.exports = AllPosts;