import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs'
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 5000,
          createdAt: new Date('2021-07-16'),
        },
        {
          id: 2,
          title: 'Freelance',
          type: 'deposit',
          category: 'abc',
          amount: 1200,
          createdAt: new Date('2021-07-16'),
        },
        {
          id: 3,
          title: 'Cerveja',
          type: 'withdraw',
          category: 'bom',
          amount: 250,
          createdAt: new Date('2021-07-16'),
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';
    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

