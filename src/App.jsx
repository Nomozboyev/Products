import { Provider as ReduxProvider } from "react-redux";
import "./App.css";
import { Layout } from "./components/layout/layout";
import { store } from "./config/redux/store";

function App() {
  return (
    <>
      <ReduxProvider store={store}>
        <Layout />
      </ReduxProvider>
    </>
  );
}

export default App;
