import React from 'react';
import { List, IconButton } from 'react-native-paper';
import { View } from 'react-native';

export default function ListItem({ title, description, onPress, onEdit, onDelete }) {
  return (
    <List.Item
      title={title}
      description={description}
      onPress={onPress}
      right={props => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconButton icon="pencil" onPress={onEdit} />
          <IconButton icon="delete" onPress={onDelete} />
        </View>
      )}
    />
  );
} 