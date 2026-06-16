import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';

import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { useFinanceStore } from '../store/useFinanceStore';
import { useCategoryStore } from '../store/useCategoryStore';
import { useAuthStore } from '../store/useAuthStore';
import { currencyMask, currencyToNumber, } from '../utils/formatCurrency';

import { styles } from '../styles/addEntryStyles';

export default function AddEntry({ navigation }: any) {
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [type, setType] = useState<'income' | 'expense'>('expense');

  const user = useAuthStore((state) => state.user);
  const addEntry = useFinanceStore((state) => state.addEntry);

  const categories = useCategoryStore((state) => state.categories);
  const loadCategories = useCategoryStore((state) => state.loadCategories);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        loadCategories();
      }
    }, [user])
  );

  async function handleAdd() {
    const normalizedAmount = currencyToNumber(amount);

    if (
      !amount.trim() ||
      !title.trim() ||
      !category.trim() ||
      Number.isNaN(normalizedAmount) ||
      !user
    ) {
      return;
    }

    await addEntry({
      id: String(Date.now()),
      userId: user.id,
      title: title.trim(),
      amount: normalizedAmount,
      type,
      category: category.trim(),
      date: new Date().toISOString(),
    });

    setAmount('');
    setTitle('');
    setCategory('');
    setType('expense');

    navigation.goBack();
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Adicionar Transação</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Nova Transação</Text>

        <Text style={styles.label}>Tipo</Text>

        <View style={styles.switchContainer}>
          <TouchableOpacity
            style={[
              styles.switchButton,
              type === 'expense' && styles.switchButtonActive,
            ]}
            onPress={() => setType('expense')}
          >
            <Text style={styles.switchText}>Despesa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.switchButton,
              type === 'income' && styles.switchButtonActive,
            ]}
            onPress={() => setType('income')}
          >
            <Text style={styles.switchText}>Ganho</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Valor (R$)</Text>

        <TextInput
          style={styles.input}
          placeholder="R$ 0,00"
          keyboardType="numeric"
          value={amount}
          onChangeText={(value) =>
            setAmount(currencyMask(value))
          }
        />

        <Text style={styles.label}>Descrição</Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: Compras do mercado"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Categoria</Text>

        <TouchableOpacity
          style={styles.categorySelector}
          onPress={() => setModalVisible(true)}
        >
          <Text
            style={
              category
                ? styles.categorySelectorText
                : styles.categoryPlaceholderText
            }
          >
            {category || 'Selecione uma categoria'}
          </Text>
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Selecione uma categoria
              </Text>

              {categories.length === 0 ? (
                <Text style={styles.emptyCategoryText}>
                  Nenhuma categoria cadastrada.
                </Text>
              ) : (
                categories.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.categoryOption}
                    onPress={() => {
                      setCategory(item.name.trim());
                      setModalVisible(false);
                    }}
                  >
                    <View
                      style={[
                        styles.categoryColor,
                        { backgroundColor: item.color },
                      ]}
                    />

                    <Text style={styles.categoryOptionText}>
                      {item.name.trim()}
                    </Text>
                  </TouchableOpacity>
                ))
              )}

              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeModalButtonText}>
                  Fechar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAdd}
          >
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}