import React from "react";
import { Container, Typography } from "@material-ui/core";

import Basic from "./Basic";
import useStyles from "./styles";

const Profile = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        component="h2"
        className={classes.title}
        color="primary"
      >
        基本情報
      </Typography>
      <Basic />
    </Container>
  );
};

export default Profile;
