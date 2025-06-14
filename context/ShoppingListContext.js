import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadLists as loadListsFromStorage, saveLists as saveListsToStorage } from '../storage/storage';

const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLists();
  }, []);

  useEffect(() => {
    if (!loading) saveLists();
  }, [lists]);

  const loadLists = async () => {
    const data = await loadListsFromStorage();
    setLists(data);
    setLoading(false);
  };

  const saveLists = async () => {
    await saveListsToStorage(lists);
  };

  const addList = (title) => {
    setLists(prev => [
      ...prev,
      { id: Date.now().toString(), title, products: [] }
    ]);
  };

  const editList = (id, newTitle) => {
    setLists(prev => prev.map(list => list.id === id ? { ...list, title: newTitle } : list));
  };

  const deleteList = (id) => {
    setLists(prev => prev.filter(list => list.id !== id));
  };

  const addProduct = (listId, product) => {
    setLists(prev => prev.map(list =>
      list.id === listId
        ? { ...list, products: [...list.products, { ...product, id: Date.now().toString(), bought: false }] }
        : list
    ));
  };

  const editProduct = (listId, productId, newProduct) => {
    setLists(prev => prev.map(list =>
      list.id === listId
        ? {
            ...list,
            products: list.products.map(p => p.id === productId ? { ...p, ...newProduct } : p)
          }
        : list
    ));
  };

  const deleteProduct = (listId, productId) => {
    setLists(prev => prev.map(list =>
      list.id === listId
        ? { ...list, products: list.products.filter(p => p.id !== productId) }
        : list
    ));
  };

  const toggleProductStatus = (listId, productId) => {
    setLists(prev => prev.map(list =>
      list.id === listId
        ? {
            ...list,
            products: list.products.map(p => p.id === productId ? { ...p, bought: !p.bought } : p)
          }
        : list
    ));
  };

  return (
    <ShoppingListContext.Provider
      value={{ lists, addList, editList, deleteList, addProduct, editProduct, deleteProduct, toggleProductStatus, loading }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => useContext(ShoppingListContext); 