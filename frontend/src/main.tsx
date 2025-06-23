import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './app/Routes/Routes.tsx'
import { Provider } from 'react-redux'
import { persistor, store } from './app/redux/store/Store.tsx'
import { Toaster } from 'react-hot-toast'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position="bottom-right" reverseOrder={false} />
   <Provider store={store}>
     <PersistGate  loading={null} persistor={persistor}>
     <RouterProvider router={router}/>
      </PersistGate>
   </Provider>
  </StrictMode>,
)
