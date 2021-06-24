import React, { version } from "react";
import { ListItem } from "react-native-elements";

import StatusIcon from "./StatusIcon.js";

const ObjectKeyValueItem = ({ k, v }) => {
  return (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {k}
        </ListItem.Title>
        <ListItem.Subtitle>
          {v}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default ObjectKeyValueItem;