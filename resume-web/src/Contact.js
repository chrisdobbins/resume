import React, { Component } from "react";
import List, { ListItemText } from "material-ui/List";
import Card, { CardActions, CardContent, CardHeader } from "material-ui/Card";
import Typography from "material-ui/Typography";
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

class Contact extends Component {
    state = {expanded: false};
  render() {
    let contactInfo = Object.values(this.props.info).map((c,idx ) => {
      return (
        <ListItemText key={idx}>
          <Typography>{c}</Typography>
        </ListItemText>
      );
    });

    return (
      <Card>
        <CardHeader title={"Contact"}
        action={
            <IconButton onClick={() => {this.setState({expanded: !this.state.expanded})}}>
            {this.state.expanded ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
                </IconButton>
            } />
      <Collapse in={this.state.expanded} unmountOnExit>
        <CardContent>
        <List>{contactInfo}</List>
        </CardContent>
        </Collapse>
      </Card>
    );
  }
}

export default Contact;
