import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  const initialOptions = {
    clientId: "test",
    currency: "PEN",
    intent: "capture",
  };
  return (
  <PayPalScriptProvider options={initialOptions}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </PayPalScriptProvider>
  )
}

export default App