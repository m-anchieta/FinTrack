import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

import {
  useEffect,
  useState,
} from 'react';

import { PieChart } from 'react-native-chart-kit';

import { styles } from '../styles/reportsStyles';

import { useFinanceStore } from '../store/useFinanceStore';

import { useCategoryStore } from '../store/useCategoryStore';
import { formatCurrency } from '../utils/formatCurrency';

export default function Reports() {

  const entries = useFinanceStore(
    (state) => state.entries
  );

  const loadEntries = useFinanceStore(
    (state) => state.loadEntries
  );

  const categories = useCategoryStore(
    (state) => state.categories
  );

  const loadCategories = useCategoryStore(
    (state) => state.loadCategories
  );

  const [selectedDate, setSelectedDate] =
    useState(new Date());

  const [viewMode, setViewMode] = useState<
    'monthly' | 'yearly'
  >('monthly');

  useEffect(() => {

    loadEntries();

    loadCategories();

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

  const expenseEntries =
    filteredEntries.filter(
      (item) =>
        item.type === 'expense'
    );

  const incomeEntries =
    filteredEntries.filter(
      (item) =>
        item.type === 'income'
    );

  const groupedExpenses = categories
  .map((category) => {
    const total = expenseEntries
      .filter(
        (entry) =>
          entry.category.trim() ===
          category.name.trim()
      )
      .reduce(
        (sum, entry) =>
          sum + entry.amount,
        0
      );

    return {
      name: category.name.trim(),
      population: total,
      color: category.color,
      legendFontColor: '#334155',
      legendFontSize: 12,
    };
  })
  .filter(
    (item) =>
      item.population > 0
  );

  const groupedIncomes = categories
  .map((category) => {
    const total = incomeEntries
      .filter(
        (entry) =>
          entry.category.trim() ===
          category.name.trim()
      )
      .reduce(
        (sum, entry) =>
          sum + entry.amount,
        0
      );

    return {
      name: category.name.trim(),
      population: total,
      color: category.color,
      legendFontColor: '#334155',
      legendFontSize: 12,
    };
  })
  .filter(
    (item) =>
      item.population > 0
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

        console.log('ENTRIES:', entries);

console.log('FILTERED ENTRIES:', filteredEntries);

console.log('CATEGORIES:', categories);

console.log('EXPENSE ENTRIES:', expenseEntries);

console.log('INCOME ENTRIES:', incomeEntries);

console.log('GROUPED EXPENSES:', groupedExpenses);

console.log('GROUPED INCOMES:', groupedIncomes);

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={
        false
      }
    >

      <Text style={styles.title}>
        Relatórios
      </Text>

      <View style={styles.switchContainer}>

        <TouchableOpacity
          style={[
            styles.switchButton,

            viewMode ===
              'monthly' &&
              styles.switchActive,
          ]}
          onPress={() =>
            setViewMode(
              'monthly'
            )
          }
        >

          <Text
            style={
              styles.switchText
            }
          >
            Mensal
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.switchButton,

            viewMode ===
              'yearly' &&
              styles.switchActive,
          ]}
          onPress={() =>
            setViewMode(
              'yearly'
            )
          }
        >

          <Text
            style={
              styles.switchText
            }
          >
            Anual
          </Text>

        </TouchableOpacity>

      </View>

      <View style={styles.monthContainer}>

        <TouchableOpacity
          style={styles.arrowButton}
          onPress={
            previousPeriod
          }
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

      <View style={styles.reportCard}>

        <Text style={styles.expenseTitle}>
          Gastos por Categoria
        </Text>

        {groupedExpenses.length > 0 ? (

          <PieChart
            data={groupedExpenses}
            width={
              Dimensions.get(
                'window'
              ).width - 85
            }
            height={200}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            hasLegend={true}
            chartConfig={{
              color: () =>
                '#000',
            }}
          />

        ) : (

          <View
            style={
              styles.emptyContainer
            }
          >

            <Text
              style={
                styles.emptyText
              }
            >
              Nenhum gasto neste
              período
            </Text>

          </View>

        )}

      </View>

      <View style={styles.reportCard}>

        <Text style={styles.incomeTitle}>
          Ganhos por Categoria
        </Text>

        {groupedIncomes.length > 0 ? (

          <PieChart
            data={groupedIncomes}
            width={
              Dimensions.get(
                'window'
              ).width - 85
            }
            height={200}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            hasLegend={true}
            chartConfig={{
              color: () =>
                '#000',
            }}
          />

        ) : (

          <View
            style={
              styles.emptyContainer
            }
          >

            <Text
              style={
                styles.emptyText
              }
            >
              Nenhum ganho neste
              período
            </Text>

          </View>

        )}

      </View>

    </ScrollView>

  );
}