import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2F5',
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 25,
    marginTop: 45,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },

  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },

  colorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },

  colorItem: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },

  selectedColor: {
    borderWidth: 3,
    borderColor: '#2563EB',
  },

  addButton: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  addButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },

  categoryCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },

  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },

  categoryColor: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },

  categoryName: {
    fontSize: 18,
  },

  actions: {
    flexDirection: 'row',
    gap: 15,
  },
});