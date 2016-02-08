var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var ReactCloneWithProps = require('react-addons-clone-with-props');

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
  getInitialState: function() {
    return {}
  },

  componentWillUpdate: function(nextProps, nextState) {
    var self = this;
    if(nextProps) {
      this.setState({
        stage: 0,
      oldChildPositions: Object.keys(this.refs).map(function(key) {
        return ReactDOM.findDOMNode(self.refs[key]).getClientRects()[0];
      })
    });
    } else if (nextState && nextState.stage == 1) {
      //do nothing
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    var self = this;
    if(this.state.stage == 0) {
      this.setState({
        newChildPositions: Object.keys(self.refs).map(function(key) {
        return ReactDOM.findDOMNode(self.refs[key]).getClientRects()[0];
        }),
        stage: 1,
      });
    } else if (this.state.stage == 1) {
      this.setState({
        stage: 2
      });
    } else if (this.state.stage == 2) {
      this.setState({
        stage: 3
      });
    }
  },

  render: function() {
    transitionStyle = { 
      WebkitTransition: ['left '+this.props.duration+' ease-in-out',
        'top '+this.props.duration+' ease-in-out'],
    };
    if(this.state.stage == 0) {
      transitionStyle.Opacity = 0;
    } else if(this.state.stage == 1) {
      transitionStyle.Opacity = 1;
    }
    if (this.state.stage < 3) {
      transitionStyle.Position = 'absolute';
    }
    var state = this.state;
    return (<div className="listDemo">
        {React.Children.map(this.props.children, function(child, index) {
          childState = {}
          if (state.stage == 1) {
            childState['top'] =  state.oldChildPositions[index]['top'];
            childState['left'] = state.oldChildPositions[index]['left'];
          } else if (state.stage == 2) {
            childState['top'] =  state.newChildPositions[index]['top'];
            childState['left'] = state.newChildPositions[index]['left'];
          }
          return <div ref={index}
                    style={Object.assign(childState, transitionStyle)}>
                    {child}
                  </div>
          })
        }
    </div>)
  }
})

function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = 
  o[--i], o[i] = o[j], o[j] = x);
  return o;
}

function randFilter(list) {
  var newList = []
  for(var i = 0; i < list.length; i++) {
    var j = Math.floor(Math.random() * 2);
    if(j == 1) {
      newList.push(list[i]);
    }
  }
  return newList;
}

function someData() {
  return shuffle(randFilter([{klass: Comment,
    data:5, key:1},
      {klass: Comment, data:4, key:2}, {klass: Comment, 
      data:"**bold** move", key:3}, {klass: Comment, data:3, key:4}, 
      {klass: Comment, key: 5,
      data: ((new Date().getTime() - start)/1000).toFixed()}]));
}

setInterval(function() {
  ReactDOM.render(
    <ListComponent duration={500}>
      {someData().map(function(comment) {
        return (<div key={comment.key}>
          {comment.data}
        </div>)
      })}
    </ListComponent>,
    document.getElementById('list')
  );
}, 2000);
