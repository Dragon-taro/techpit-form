import * as React from "react";
import { Container, Typography, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../domain/entity/rootState";
import { PROFILE } from "../../domain/services/profile";
import { useHistory } from "react-router-dom";

const Profile: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const history = useHistory();

  const handleClick = () => {
    history.push("/edit");
  };

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        component="h2"
        // className={classes.title}
        color="primary"
      >
        基本情報
      </Typography>
      <Typography variant="h5" component="h3">
        {PROFILE.NAME}
      </Typography>
      <Typography variant="body1">{profile.name}</Typography>

      <Button
        onClick={handleClick}
        fullWidth
        color="primary"
        variant="outlined"
      >
        編集
      </Button>
    </Container>
  );
};

export default Profile;
