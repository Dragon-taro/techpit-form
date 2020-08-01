import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../domain/entity/rootState";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Show: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const history = useHistory();

  const handleClick = () => {
    history.push("/edit");
  };

  return (
    <div>
      <h2>名前</h2>
      <p>{profile.name}</p>
      <Button variant="outlined" fullWidth onClick={handleClick}>
        編集
      </Button>
    </div>
  );
};

export default Show;
