class Button extends React.Component {
    render(){
  return(
    <button onClick={this.props.oCF(this.props.val)}>
        +{this.props.val}
    </button>
  );
  }
};