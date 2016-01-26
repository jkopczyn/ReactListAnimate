var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Shuffle = require('react-shuffle');


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
    return (<div className="listDemo">
      {/*<button type="button" onClick={this.shuffleChildren}>Shuffle Children</button>*/}
      <ReactCSSTransitionGroup transitionName="list" 
        transitionEnterTimeout={5000} transitionLeaveTimeout={3000}>
        <Shuffle duration={this.props.duration} fade={this.props.fade}>
          {this.props.children}
        </Shuffle>
      </ReactCSSTransitionGroup>
    </div>)
  }
});

function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = 
  o[--i], o[i] = o[j], o[j] = x);
  return o;
}

function someData() {
  return shuffle([{klass: Comment,
    data:5, key:1},
      {klass: Comment, data:4, key:2}, {klass: Comment, 
      data:"**bold** move", key:3}, {klass: Comment, data:3, key:4}, 
      {klass: Comment, key: 5,
      data: ((new Date().getTime() - start)/1000).toFixed()}]);
}

setInterval(function() {
  ReactDOM.render(
    <ListComponent duration={500} fade={false}>
      {someData().map(function(comment) {
        return (<div key={comment.key}>
          {comment.data}
        </div>)
      })}
    </ListComponent>,
    document.getElementById('list')
  );
}, 2000);
