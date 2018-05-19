import React, { Component } from "react";
import List, { ListItem, ListItemText } from "material-ui/List";
import Card, { CardContent, CardHeader } from "material-ui/Card";
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

class Education extends Component {
    state = { expanded: false };
  render() {
    let schools = this.props.schools.map((school, idx) => {
      return (
        <Card key={idx}>
          <CardHeader title={school.name} />
          <CardContent>
          <List>
          <ListItem>
          <ListItemText>{school.dates.end}</ListItemText>
          </ListItem>
          <ListItem>
          <ListItemText>{school.data.degree || school.data.program}</ListItemText>
          </ListItem>
        </List>
        </CardContent>
        </Card>
      );
    });

    return (
      <Card>
        <CardHeader title={"Education"}
        action={
            <IconButton onClick={() => {this.setState({expanded: !this.state.expanded})}}>
            {this.state.expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
        } />
        <Collapse in={this.state.expanded} unmountOnExit>
        <CardContent>
        {schools}
        </CardContent>
        </Collapse>
      </Card>
    );
  }
}

export default Education;
