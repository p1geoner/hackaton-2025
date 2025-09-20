import {App, ConfigProvider} from "antd";
import {BrowserRouter, Route, Routes} from "react-router";
import {MainPage} from "./pages";
import {DefaultLayout} from "./components/DefaultLayout";
import './styles/index.scss';
import ru_RU from 'antd/locale/ru_RU';
import {EThemes, getTHemeConfig} from "./components/config";

function MyApp(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <BrowserRouter>
      <ConfigProvider
        locale={ru_RU}
        theme={getTHemeConfig(EThemes.LIGHT)}
      >
      <App>

          <Routes>
            <Route path="/"  element={<MainPage />} />
            <Route element={<DefaultLayout />} >
              <Route path="/main"  element={<MainPage />} />
            </Route>
          </Routes>

      </App>
      </ConfigProvider>
    </BrowserRouter>

  )
}

export default MyApp
