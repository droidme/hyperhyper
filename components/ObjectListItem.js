import React from "react";
import { ListItem } from "react-native-elements";

import StatusIcon from "./StatusIcon.js";

const ObjectListItem = ({ object, enterObject }) => {
  const { OBJ_NAME, OBJ_DESCRIPTION, OBJ_ALARMSTATE } = object;
  return (
    <ListItem onPress={() => enterObject(object)}>
      <StatusIcon status={OBJ_ALARMSTATE} />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {OBJ_NAME}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={2} ellipsizeMode="tail">
          {OBJ_DESCRIPTION}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default ObjectListItem;