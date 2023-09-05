import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <div className="App min-h-screen flex flex-col bg-white">
        <Header />
        <Main />
      </div>
    </FluentProvider>
  );
}

export default App;
