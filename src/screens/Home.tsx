import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  useEffect,
  useState,
} from 'react';

import { styles } from '../styles/homeStyles';

import { useFinanceStore } from '../store/useFinanceStore';

import Header from '../components/Header';

import { formatCurrency } from '../utils/formatCurrency';

export default function Home() {

  const loadEntries = useFinanceStore(
    (state) => state.loadEntries
  );

  const entries = useFinanceStore(
    (state) => state.entries
  );

  const [selectedDate, setSelectedDate] =
    useState(new Date());

  const [viewMode, setViewMode] = useState<
    'monthly' | 'yearly'
  >('monthly');

  useEffect(() => {

    loadEntries();

  }, []);

  function previousPeriod() {

    setSelectedDate((current) => {

      const date = new Date(current);

      if (viewMode === 'monthly') {

        date.setMonth(
          date.getMonth() - 1
        );

      } else {

        date.setFullYear(
          date.getFullYear() - 1
        );

      }

      return date;

    });

  }

  function nextPeriod() {

    setSelectedDate((current) => {

      const date = new Date(current);

      if (viewMode === 'monthly') {

        date.setMonth(
          date.getMonth() + 1
        );

      } else {

        date.setFullYear(
          date.getFullYear() + 1
        );

      }

      return date;

    });

  }

  const filteredEntries = entries.filter(
    (entry) => {

      const entryDate =
        new Date(entry.date);

      if (viewMode === 'monthly') {

        return (
          entryDate.getMonth() ===
            selectedDate.getMonth() &&
          entryDate.getFullYear() ===
            selectedDate.getFullYear()
        );

      }

      return (
        entryDate.getFullYear() ===
        selectedDate.getFullYear()
      );

    }
  );

  const balance = filteredEntries.reduce(
    (total, item) => {

      return item.type === 'income'
        ? total + item.amount
        : total - item.amount;

    },
    0
  );

  const income = filteredEntries
    .filter(
      (item) =>
        item.type === 'income'
    )
    .reduce(
      (total, item) =>
        total + item.amount,
      0
    );

  const expense = filteredEntries
    .filter(
      (item) =>
        item.type === 'expense'
    )
    .reduce(
      (total, item) =>
        total + item.amount,
      0
    );

  const periodLabel =
    viewMode === 'monthly'
      ? selectedDate.toLocaleDateString(
          'pt-BR',
          {
            month: 'long',
            year: 'numeric',
          }
        )
      : String(
          selectedDate.getFullYear()
        );

  return (

    <ScrollView
      contentContainerStyle={
        styles.container
      }
      showsVerticalScrollIndicator={
        false
      }
    >

      <Header />

      <Text style={styles.title}>
        Controle Financeiro
      </Text>

      <View style={styles.toggleContainer}>

        <TouchableOpacity
          style={
            viewMode === 'monthly'
              ? styles.activeToggle
              : styles.toggleButton
          }
          onPress={() =>
            setViewMode('monthly')
          }
        >

          <Text
            style={
              viewMode === 'monthly'
                ? styles.activeToggleText
                : styles.toggleText
            }
          >
            Mensal
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={
            viewMode === 'yearly'
              ? styles.activeToggle
              : styles.toggleButton
          }
          onPress={() =>
            setViewMode('yearly')
          }
        >

          <Text
            style={
              viewMode === 'yearly'
                ? styles.activeToggleText
                : styles.toggleText
            }
          >
            Anual
          </Text>

        </TouchableOpacity>

      </View>

      <View style={styles.monthContainer}>

        <TouchableOpacity
          style={styles.arrowButton}
          onPress={previousPeriod}
        >
          <Text>←</Text>
        </TouchableOpacity>

        <Text style={styles.monthText}>
          {periodLabel}
        </Text>

        <TouchableOpacity
          style={styles.arrowButton}
          onPress={nextPeriod}
        >
          <Text>→</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.balanceCard}>

        <Text style={styles.balanceTitle}>
          Saldo
        </Text>

        <Text style={styles.balanceValue}>
          {formatCurrency(balance)}
        </Text>

      </View>

      <View style={styles.resumeContainer}>

        <View style={styles.resumeCard}>

          <Text style={styles.incomeText}>
            Ganhos
          </Text>

          <Text style={styles.incomeValue}>
            {formatCurrency(income)}
          </Text>

        </View>

        <View style={styles.resumeCard}>

          <Text style={styles.expenseText}>
            Gastos
          </Text>

          <Text style={styles.expenseValue}>
            {formatCurrency(expense)}
          </Text>

        </View>

      </View>

      <Text style={styles.sectionTitle}>
        Últimas movimentações
      </Text>

      {filteredEntries.map((item) => (

        <View
          key={item.id}
          style={styles.transactionCard}
        >

          <View>

            <Text
              style={
                styles.transactionTitle
              }
            >
              {item.title}
            </Text>

            <Text
              style={
                styles.transactionCategory
              }
            >
              {item.category}
            </Text>

          </View>

          <Text
            style={
              item.type === 'income'
                ? styles.incomeTransaction
                : styles.expenseTransaction
            }
          >
            {item.type === 'income'
              ? '+'
              : '-'}
            {formatCurrency(item.amount)}
          </Text>

        </View>

      ))}

    </ScrollView>

  );
}