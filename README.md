# App Finanças

Aplicativo de controle financeiro feito em React Native com Expo. Permite registrar entradas e saídas e acompanhar o saldo.

## Funcionalidades

- Adicionar transações com descrição, valor, tipo (entrada/saída), categoria e data
- Editar e excluir transações
- Saldo calculado automaticamente
- Lista ordenada da transação mais recente para a mais antiga

## Como rodar

Pré-requisitos: [Node.js](https://nodejs.org) instalado e o app **Expo Go** no celular.

```bash
npm install
npx expo start
```

Depois, escaneie o QR code que aparece no terminal com o Expo Go (Android) ou com a câmera (iOS). O celular e o computador precisam estar na mesma rede Wi-Fi.

## Estrutura

```
App.js                          navegação entre telas e lista de transações
pages/Home.jsx                  tela inicial com saldo e lista
pages/TransactionManagement.jsx formulário para adicionar/editar
components/Transaction.jsx      card de cada transação
constants/categories.js         lista de categorias
```

## Tecnologias

- React Native + Expo (SDK 57)
- @react-native-picker/picker
- @react-native-community/datetimepicker
