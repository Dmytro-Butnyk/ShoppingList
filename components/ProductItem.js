import React from 'react';
import { List, IconButton, Checkbox } from 'react-native-paper';
import { View } from 'react-native';

export default function ProductItem({ name, qty, bought, onToggle, onEdit, onDelete }) {
  return (
    <List.Item
      title={`${name} (${qty})`}
      left={props => (
        <Checkbox status={bought ? 'checked' : 'unchecked'} onPress={onToggle} />
      )}
      right={props => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconButton icon="pencil" onPress={onEdit} />
          <IconButton icon="delete" onPress={onDelete} />
        </View>
      )}
    />
  );
} 