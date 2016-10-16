var React = require('react');


var CategoryLink = React.createClass({
  handleClick: function(){
    var catID = this.props.catID;
    console.log('call cat selection: ' + catID);
    console.log('cat selection type: ' + (typeof this.props.onCategorySelection));
    this.props.onCategorySelection(catID);
  },

  render: function () {
    var catSelected = (this.props.catID == this.props.selectedID);
    console.log(catSelected);

    return (
      <a className={catSelected ? 'categoryLink flex-child selected' : 'categoryLink flex-child'} href="#" onClick={this.handleClick}>
        {this.props.categoryName}
      </a>
    );
  }
});

//{this.props.children + (catSelected ? '*' : '')} 


var CategoryMenu = React.createClass({
  getInitialState: function() {
    console.log('cat initial: ' + this.props.selectedCat);
    return {selectedCat: this.props.selectedID};
  },

  handleCategorySelection: function(catID) {
    console.log('cat menu, selection: ' + catID);
    this.state.selectedCat = catID;
    this.props.handleCategorySelection(catID);  // call function in parent
  },

  render: function () {
    var selectedCat = this.props.selectedCat;

    var categoryLinks = this.props.categories.map(function(category){
      return (
          <CategoryLink 
            catID={category.id} 
            selectedID={selectedCat} 
            onCategorySelection={this.handleCategorySelection}
            categoryName={category.name} />
      );
    });

    return (
      <div className="categoryMenu flex-child flex-parent dir-col">
        {categoryLinks}
      </div>
    );
  }
});

module.exports = CategoryMenu;

//this.handleCategorySelection