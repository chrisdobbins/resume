import React, { Component } from "react";
import Typography from 'material-ui/Typography';

class Header extends Component {
  render() {
    return <Typography align="center" variant="headline"> {this.props.name}</Typography>;
  }
}

export default Header;
