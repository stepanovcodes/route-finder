import {
  FluentProvider,
  webLightTheme,
  Button,
} from "@fluentui/react-components";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <div className="App">
        <Header />
        <Main />
      </div>
    </FluentProvider>
  );
}

export default App;
