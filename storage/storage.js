import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'SHOPPING_LISTS';

export const loadLists = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log('Помилка завантаження списків', e);
    return [];
  }
};

export const saveLists = async (lists) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
  } catch (e) {
    console.log('Помилка збереження списків', e);
  }
};

// Тут можна винести логіку роботи з AsyncStorage, якщо потрібно
// Поки що вся логіка у ShoppingListContext 