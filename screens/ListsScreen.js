import React, { useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { Appbar, FAB, List, IconButton, Portal, Dialog, Button, TextInput, ActivityIndicator } from 'react-native-paper';
import { useShoppingList } from '../context/ShoppingListContext';

export default function ListsScreen({ navigation }) {
  const { lists, addList, editList, deleteList, loading } = useShoppingList();
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  const handleAdd = () => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;
    if (lists.some(l => l.title.toLowerCase() === trimmed.toLowerCase())) {
      setError('Список з такою назвою вже існує!');
      return;
    }
    addList(trimmed);
    setNewTitle('');
    setAddVisible(false);
    setError('');
  };

  const handleEdit = () => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;
    if (lists.some(l => l.title.toLowerCase() === trimmed.toLowerCase() && l.id !== editId)) {
      setError('Список з такою назвою вже існує!');
      return;
    }
    editList(editId, trimmed);
    setNewTitle('');
    setEditId(null);
    setEditVisible(false);
    setError('');
  };

  const confirmDelete = (id) => {
    Alert.alert('Видалити список?', 'Ви впевнені, що хочете видалити цей список?', [
      { text: 'Скасувати', style: 'cancel' },
      { text: 'Видалити', style: 'destructive', onPress: () => deleteList(id) },
    ]);
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={lists}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => {
          const bought = item.products.filter(p => p.bought).length;
          return (
            <View style={{ marginBottom: 12 }}>
              <List.Item
                title={item.title}
                description={`${item.products.length} товарів, з них ${bought} куплено`}
                onPress={() => navigation.navigate('ListDetailScreen', { listId: item.id })}
                left={props => <List.Icon {...props} icon="clipboard-list-outline" color="#1976d2" />}
                right={props => (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="pencil" onPress={() => { setEditId(item.id); setNewTitle(item.title); setEditVisible(true); }} />
                    <IconButton icon="delete" onPress={() => confirmDelete(item.id)} />
                  </View>
                )}
                style={{ backgroundColor: '#f5f5f5', borderRadius: 12, elevation: 2 }}
                titleStyle={{ fontWeight: 'bold', fontSize: 18 }}
                descriptionStyle={{ color: '#666' }}
              />
            </View>
          );
        }}
        ListEmptyComponent={<List.Item title="Списків ще немає" style={{ backgroundColor: '#f5f5f5', borderRadius: 12, margin: 16 }} />} />
      <FAB
        style={{ position: 'absolute', right: 16, bottom: 16 }}
        icon="plus"
        label="Додати список"
        onPress={() => setAddVisible(true)}
      />
      {/* Діалог додавання */}
      <Portal>
        <Dialog visible={addVisible} onDismiss={() => setAddVisible(false)}>
          <Dialog.Title>Новий список</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Назва списку"
              value={newTitle}
              onChangeText={t => { setNewTitle(t); setError(''); }}
              autoFocus
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
          <Dialog.Title>Редагувати список</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Назва списку"
              value={newTitle}
              onChangeText={t => { setNewTitle(t); setError(''); }}
              autoFocus
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