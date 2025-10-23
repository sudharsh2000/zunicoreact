import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Redux/store.jsx'
import { AuthProvider } from './Redux/AuthProvider.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
    <App />
    </AuthProvider>
    </Provider>
  </StrictMode>,
)
