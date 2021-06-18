import React from "react";
import { ListItem, Avatar, Badge } from "react-native-elements";

const sum_alert = (obj) => {
  var sum = 0;
  for (var el in obj) {
    if (obj.hasOwnProperty(el)) {
      sum += parseFloat(obj[el]);
    }
  }
  return sum;
}

const HyperMapListItem = ({ map, enterMap }) => {
  const { id, NAME, ALERTS } = map;
  return (
    <ListItem onPress={() => enterMap(map)}>
      <Avatar rounded source={require("../assets/map.png")} />
      {ALERTS.CRITICAL > 0 && <Badge
        value={ALERTS.CRITICAL}
        containerStyle={{ position: 'absolute', top: 10, left: 40 }}
        status="error"
      />}
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {NAME}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          Subtitle Text
        </ListItem.Subtitle>
      </ListItem.Content>
      <Badge
        value={sum_alert(ALERTS)}
        containerStyle={{ marginTop: -20 }}
      />

    </ListItem>
  );
};

export default HyperMapListItem;