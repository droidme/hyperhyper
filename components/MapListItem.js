import React from "react";
import { Text } from "react-native";
import { ListItem, Avatar, Badge } from "react-native-elements";
import StatusBadge from "./StatusBadge.js";

const sum_alert = (obj) => {
  var sum = 0;
  for (var el in obj) {
    if (obj.hasOwnProperty(el)) {
      sum += parseFloat(obj[el]);
    }
  }
  return sum;
}

const MapListItem = ({ map, enterMap }) => {
  const { id, NAME, ALERTS, lastChanged } = map;
  return (
    <ListItem bottomDivider onPress={() => enterMap(map)}>
      <Avatar rounded source={require("../assets/map.png")} />
      <StatusBadge alerts={ALERTS}
        containerStyle={{ position: 'absolute', top: 10, left: 40 }} />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {NAME}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          <Text>{lastChanged && new Date(lastChanged.seconds * 1000).toISOString()}</Text>
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

export default MapListItem;