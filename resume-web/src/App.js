import React, { Component } from "react";
import info from "./resume2.json";
import Education from "./Education.js";
import Experience from "./Experience.js";
import Header from "./Header.js";
import Contact from "./Contact.js";
import Grid from "material-ui/Grid";
import Divider from "material-ui/Divider";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";


class App extends Component {
  render() {
    return (
        <Grid container xs={12} sm={12} lg={12} spacing={0}>
          <AppBar position={"static"} color={"inherit"}>
            <Toolbar>
                <Header name={info.name} />{" "}
            </Toolbar>
          </AppBar>

          <Grid item xs={12} sm={12} lg={3}>
            <Grid container xs={12} sm={12} lg={12}>
              <Grid item xs={12} sm={12} lg={12}>
                <Contact info={info.contact} />
              </Grid>
            </Grid>

            <Grid container xs={12} sm={12} lg={12}>
              <Grid item xs={12} sm={12} lg={12}>
                <Education schools={info.education} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} lg={9}>
            <Grid item>
              <Experience companies={info.experience} />
            </Grid>
          </Grid>

        </Grid>
    );
  }
}

export default App;
