import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import { useEffect, useState } from 'react';

import { Feather } from '@expo/vector-icons';

import { styles } from '../styles/tagStyles';

import { useCategoryStore } from '../store/useCategoryStore';
import { useAuthStore } from '../store/useAuthStore';

const COLORS = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#F7B267',
  '#A78BFA',
  '#34D399',
];

export default function Tags() {
  const [name, setName] = useState('');

  const [selectedColor, setSelectedColor] =
    useState(COLORS[0]);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const {
    categories,
    addCategory,
    loadCategories,
    deleteCategory,
    updateCategory,
  } = useCategoryStore();

  const user = useAuthStore(
    (state) => state.user
  );

  useEffect(() => {
    if (user) {
      loadCategories();
    }
  }, [user, loadCategories]);

  async function handleAddOrUpdate() {
    const categoryName = name.trim();

    if (!categoryName || !user) return;

    if (editingId) {
      await updateCategory(
        editingId,
        categoryName,
        selectedColor
      );

      setEditingId(null);
    } else {
      await addCategory({
        id: String(Date.now()),
        userId: user.id,
        name: categoryName,
        color: selectedColor,
      });
    }

    setName('');
    setSelectedColor(COLORS[0]);
  }

  function handleEdit(item: any) {
    setEditingId(item.id);
    setName(item.name.trim());
    setSelectedColor(item.color);
  }

  function handleDelete(id: string) {
    Alert.alert(
      'Excluir categoria',
      'Deseja realmente excluir esta categoria?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => deleteCategory(id),
        },
      ]
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        Gerenciar Categorias
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          {editingId
            ? 'Editar Categoria'
            : 'Criar Nova Categoria'}
        </Text>

        <Text style={styles.label}>
          Nome da Categoria
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: Lazer, Saúde..."
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>
          Cor
        </Text>

        <View style={styles.colorsContainer}>
          {COLORS.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorItem,
                { backgroundColor: color },
                selectedColor === color &&
                  styles.selectedColor,
              ]}
              onPress={() =>
                setSelectedColor(color)
              }
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddOrUpdate}
        >
          <Text style={styles.addButtonText}>
            {editingId
              ? 'Salvar Alterações'
              : 'Adicionar Categoria'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>
        Suas Categorias
      </Text>

      {categories.length === 0 ? (
        <View style={styles.categoryCard}>
          <Text
            style={{
              color: '#64748B',
              textAlign: 'center',
            }}
          >
            Nenhuma categoria cadastrada.
          </Text>
        </View>
      ) : (
        categories.map((item) => (
          <View
            key={item.id}
            style={styles.categoryCard}
          >
            <View style={styles.categoryLeft}>
              <View
                style={[
                  styles.categoryColor,
                  {
                    backgroundColor:
                      item.color,
                  },
                ]}
              />

              <Text
                style={styles.categoryName}
              >
                {item.name.trim()}
              </Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() =>
                  handleEdit(item)
                }
              >
                <Feather
                  name="edit"
                  size={20}
                  color="#2563EB"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  handleDelete(item.id)
                }
              >
                <Feather
                  name="trash-2"
                  size={20}
                  color="#EF4444"
                />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}