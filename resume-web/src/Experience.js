import React, { Component } from "react";
import Card, { CardContent, CardHeader } from "material-ui/Card";
import List, { ListItem } from "material-ui/List";
import Typography from 'material-ui/Typography';
import orderByDateDesc from 'orderDates';

class Experience extends Component {
  render() {
    let listings = orderByDateDesc(this.props.companies).map((company, coIdx) => {
      return (
        <Card key={coIdx}>
          <CardHeader title={company.name} subheader={`${company.dates.start} - ${company.dates.end ? company.dates.end : 'present'}`} />
          <CardContent>
            <List>
              {company.data.description.map((desc, descIdx) => {
                return <ListItem key={descIdx}><Typography>{desc}</Typography></ListItem>;
              })}
            </List>
          </CardContent>
        </Card>
      );
    });
    return (
      <Card>
        <CardHeader title={"Experience"} />
        <CardContent>{listings}</CardContent>
      </Card>
    );
  }
}

export default Experience;
