import React from 'react';
import { Portal, Dialog, Button, TextInput } from 'react-native-paper';

export default function AddProductModal({ visible, onDismiss, onSave, name, setName, qty, setQty, isEdit }) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{isEdit ? 'Редагувати товар' : 'Новий товар'}</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Назва товару"
            value={name}
            onChangeText={setName}
            autoFocus
          />
          <TextInput
            label="Кількість"
            value={qty}
            onChangeText={setQty}
            keyboardType="numeric"
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Скасувати</Button>
          <Button onPress={onSave}>{isEdit ? 'Зберегти' : 'Додати'}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
} 