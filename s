import TransitionThing from 'jacob-transition-thing';

<FancyList>
  <ListComponent>
  {
    this.props.items.map(item => 
      <ListItem key={item.key} title={item.title} image={item.img} />) 
  }
  </ListComponent>
</FancyList>



