import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'mts-income',
    data: { pageTitle: 'moreThanFinancialApp.mtsIncome.home.title' },
    loadChildren: () => import('./mts-income/mts-income.routes'),
  },
  {
    path: 'mts-expense',
    data: { pageTitle: 'moreThanFinancialApp.mtsExpense.home.title' },
    loadChildren: () => import('./mts-expense/mts-expense.routes'),
  },
  {
    path: 'money-flow-view',
    data: { pageTitle: 'moreThanFinancialApp.moneyFlowView.home.title' },
    loadChildren: () => import('./money-flow-view/money-flow-view.routes'),
  },
  {
    path: 'nayax-transactions',
    data: { pageTitle: 'moreThanFinancialApp.nayaxTransactions.home.title' },
    loadChildren: () => import('./nayax-transactions/nayax-transactions.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
