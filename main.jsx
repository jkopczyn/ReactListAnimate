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
  shuffleChildren() {
    this.setState({
      children: shuffle(this.state.children)
    });
  },
  render: function() {
    return <div>
    {/*<button type="button" onClick={this.shuffleChildren}>Shuffle Children</button>*/}
      <ReactCSSTransitionGroup transitionName="list" 
        transitionEnterTimeout={5000} transitionLeaveTimeout={3000}>
        <Shuffle duration={500} fade={false}>
          {this.props.children}
        </Shuffle>
      </ReactCSSTransitionGroup>
    </div>
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
    data:5, key:1},
      {klass: Comment, data:4, key:2}, {klass: Comment, 
      data:"**bold** move", key:3}, {klass: Comment, data:3, key:4}, 
      {klass: Comment, key: 5,
      data: ((new Date().getTime() - start)/1000).toFixed()}]);
}

const alphabet = [
  'a','b','c','d','e','f','g','h','i','j','k','l','m',
  'n','o','p','q','r','s','t','u','v','w','x','y','z']

const App = React.createClass({
  getInitialState() {
    return {
      children: alphabet,
      filtered: false
    }
  },
  shuffleChildren() {
    this.setState({
      children: shuffle(this.state.children)
    });
  },
  filterChildren() {
    if (this.state.filtered === false) {
      var newChildren = this.state.children.filter(function(child,index){
        if (index % 2 ===0) {
          return child
        }
      });
      this.setState({
        children: newChildren,
        filtered: true
      });
    } else {
      this.setState({
        children: alphabet,
        filtered: false
      });
    }
  },
  render() {
    return (
      <div className="demo">
      {/*<button type="button" onClick={this.shuffleChildren}>Shuffle Children</button>
        <button type="button" onClick={this.filterChildren}>Filter Children</button>*/}
        <Shuffle duration={500} fade={false}>
          {this.props.children}
        </Shuffle>
      </div>
    )
  }
});

const content = document.getElementById('content');

setInterval(function() {
  ReactDOM.render(
    <ListComponent>
      {someData().map(function(comment) {
        return <Comment data={comment.data} key={comment.key} />
      })}
    </ListComponent>,
    document.getElementById('list')
  );
  ReactDOM.render(<App>
    {shuffle(alphabet).map(function(letter) {
        return (
              <div className="tile" key={letter}>
                <img src={"http://placehold.it/100x100&text=" + letter} />
              </div>
            )
      })}
    </App>, document.getElementById('content'))
}, 2000);
