import React from "react";
import { ListItem } from "react-native-elements";
import { StyleSheet} from "react-native";
import { Feather } from '@expo/vector-icons';

import StatusIcon from "./StatusIcon.js";

const ObjectListItem = ({ object, enterObject }) => {
  const { OBJ_NAME, OBJ_DESCRIPTION, OBJ_ALARMSTATE, OBJTYPE } = object;

  const renderObjType = (objType) => {
    console.log("renderObjectType", objType)
    switch (objType) {
      case "Database":
        return <Feather name="database" size={22} style={styles.objTypeIcon}  />;
      case "FileSystem":
        return <Feather name="hard-drive" size={22} style={styles.objTypeIcon}  />
      case "Server":
        return <Feather name="server" size={22} style={styles.objTypeIcon}  />;
      default:
        return "";
    }
  }

  return (
    <ListItem bottomDivider onPress={() => enterObject(object)}>
      <StatusIcon status={OBJ_ALARMSTATE} />
      <ListItem.Content>
        <ListItem.Title numberOfLines={1} ellipsizeMode="tail" style={{ fontWeight: "800" }}>
          {renderObjType(OBJTYPE)}
          {OBJ_NAME}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={2} ellipsizeMode="tail">
          {OBJ_DESCRIPTION}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  objTypeIcon: {
    marginRight: "4px",
  },
})

export default ObjectListItem;