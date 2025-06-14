import React, { useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { Appbar, FAB, List, IconButton, Portal, Dialog, Button, TextInput, ActivityIndicator, Checkbox } from 'react-native-paper';
import { useShoppingList } from '../context/ShoppingListContext';

export default function ListDetailScreen({ route, navigation }) {
  const { listId } = route.params;
  const { lists, addProduct, editProduct, deleteProduct, toggleProductStatus, loading } = useShoppingList();
  const list = lists.find(l => l.id === listId);
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [productName, setProductName] = useState('');
  const [productQty, setProductQty] = useState('1');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  if (!list) return <List.Item title="Список не знайдено" />;
  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  const handleAdd = () => {
    const trimmed = productName.trim();
    if (!trimmed) return;
    if (list.products.some(p => p.name.toLowerCase() === trimmed.toLowerCase())) {
      setError('Товар з такою назвою вже існує!');
      return;
    }
    addProduct(listId, { name: trimmed, qty: productQty || '1' });
    setProductName('');
    setProductQty('1');
    setAddVisible(false);
    setError('');
  };

  const handleEdit = () => {
    const trimmed = productName.trim();
    if (!trimmed) return;
    if (list.products.some(p => p.name.toLowerCase() === trimmed.toLowerCase() && p.id !== editId)) {
      setError('Товар з такою назвою вже існує!');
      return;
    }
    editProduct(listId, editId, { name: trimmed, qty: productQty });
    setProductName('');
    setProductQty('1');
    setEditId(null);
    setEditVisible(false);
    setError('');
  };

  const confirmDelete = (id) => {
    Alert.alert('Видалити товар?', 'Ви впевнені, що хочете видалити цей товар?', [
      { text: 'Скасувати', style: 'cancel' },
      { text: 'Видалити', style: 'destructive', onPress: () => deleteProduct(listId, id) },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={list.products}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12 }}>
            <List.Item
              title={item.name}
              description={`Кількість: ${item.qty}`}
              left={props => (
                <Checkbox
                  status={item.bought ? 'checked' : 'unchecked'}
                  onPress={() => toggleProductStatus(listId, item.id)}
                  color={item.bought ? '#43a047' : '#1976d2'}
                  style={{ alignSelf: 'center', marginRight: 0 }}
                />
              )}
              right={props => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <IconButton icon="pencil" onPress={() => { setEditId(item.id); setProductName(item.name); setProductQty(item.qty); setEditVisible(true); }} />
                  <IconButton icon="delete" onPress={() => confirmDelete(item.id)} />
                </View>
              )}
              style={{ backgroundColor: '#fff', borderRadius: 12, elevation: 2, minHeight: 64 }}
              titleStyle={{ fontWeight: 'bold', fontSize: 17, textDecorationLine: item.bought ? 'line-through' : 'none', color: item.bought ? '#888' : '#222' }}
              descriptionStyle={{ color: '#666' }}
            />
          </View>
        )}
        ListEmptyComponent={<List.Item title="Товарів ще немає" style={{ backgroundColor: '#f5f5f5', borderRadius: 12, margin: 16 }} />} />
      <FAB
        style={{ position: 'absolute', right: 16, bottom: 16 }}
        icon="plus"
        label="Додати товар"
        onPress={() => setAddVisible(true)}
      />
      {/* Діалог додавання */}
      <Portal>
        <Dialog visible={addVisible} onDismiss={() => setAddVisible(false)}>
          <Dialog.Title>Новий товар</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Назва товару"
              value={productName}
              onChangeText={t => { setProductName(t); setError(''); }}
              autoFocus
            />
            <TextInput
              label="Кількість"
              value={productQty}
              onChangeText={setProductQty}
              keyboardType="numeric"
            />
            {!!error && <Button disabled style={{ color: 'red', marginTop: 8 }}>{error}</Button>}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setAddVisible(false)}>Скасувати</Button>
            <Button onPress={handleAdd}>Додати</Button>
          </Dialog.Actions>
        </Dialog>
        {/* Діалог редагування */}
        <Dialog visible={editVisible} onDismiss={() => setEditVisible(false)}>
          <Dialog.Title>Редагувати товар</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Назва товару"
              value={productName}
              onChangeText={t => { setProductName(t); setError(''); }}
              autoFocus
            />
            <TextInput
              label="Кількість"
              value={productQty}
              onChangeText={setProductQty}
              keyboardType="numeric"
            />
            {!!error && <Button disabled style={{ color: 'red', marginTop: 8 }}>{error}</Button>}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setEditVisible(false)}>Скасувати</Button>
            <Button onPress={handleEdit}>Зберегти</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
} 