import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF1F7',
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 25,
    marginTop: 45,
  },

  switchContainer: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    padding: 4,
    marginBottom: 24,
  },

  switchButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },

  switchActive: {
    backgroundColor: '#FFFFFF',
  },

  switchText: {
    fontWeight: '600',
    color: '#000',
  },

  monthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  arrowButton: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  monthText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0B1736',
  },

  reportCard: {
    backgroundColor: '#FFF',
    borderRadius: 22,
    padding: 20,
    marginBottom: 24,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },

  expenseTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF0000',
    marginBottom: 40,
  },

  incomeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00A63E',
    marginBottom: 40,
  },

  emptyContainer: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyText: {
    color: '#64748B',
    fontSize: 16,
  },
});