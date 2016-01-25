var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var start = new Date().getTime();

//example class for subitems, taken from React tutorial
var Comment = React.createClass({
rawMarkup: function() {
var rawMarkup = marked(this.props.data.toString(), {sanitize:
  true});
return { __html: rawMarkup };
},

render: function() {
return (
  <div className="comment">
    <h2 className="commentAuthor">
      {this.props.author}
    </h2>
    <span dangerouslySetInnerHTML={this.rawMarkup()} />
  </div>
  );
}
});

var ListComponent = React.createClass({
  render: function() {
    var containerTag = this.props.containerTag.toString();
    var data = this.props.data;
    var message = "List contains " + data.length + " elements";
    return <ReactCSSTransitionGroup transitionName="example"
          transitionEnterTimeout={500} transitionLeaveTimeout={300}
          component={containerTag}>
        {data.map(function(dataUnit){
            return React.createElement(dataUnit.klass, 
              {data: dataUnit.value, key: dataUnit.key});
          })
        }
    </ReactCSSTransitionGroup>
  }
});
var ListComponentFactory = React.createFactory(ListComponent);

function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = 
  o[--i], o[i] = o[j], o[j] = x);
  return o;
}
function someData() {
  return shuffle([{klass: Comment,
    value:5, key:1},
      {klass: Comment, value:4, key:2}, {klass: Comment, 
      value:"**bold** move", key:3}, {klass: Comment, value:3, key:4}, 
      {klass: Comment, key: 5,
      value: ((new Date().getTime() - start)/1000).toFixed()}]);
}
setInterval(function() {
  ReactDOM.render(
    ListComponentFactory({containerTag: 'div', data: someData()}),
    document.getElementById('list')
  );
}, 500);
