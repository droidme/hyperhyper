import React from "react";
import { ListItem, Avatar, Badge } from "react-native-elements";

const HyperMapListItem = ({ map, enterMap }) => {
  const { name, description, objects, critical } = map;
  return (
    <ListItem>
      <Avatar rounded source={require("../assets/map.png")} />
      { critical > 0 && <Badge
        value={critical}
        containerStyle={{ position: 'absolute', top: 10, left: 40 }}
        status="error"
      />}
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {name}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {description}
        </ListItem.Subtitle>
      </ListItem.Content>
      <Badge
        value={objects}
        containerStyle={{ marginTop: -20 }}
      />

    </ListItem>
  );
};

export default HyperMapListItem;