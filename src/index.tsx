import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import * as serviceWorker from './serviceWorker';
import configureStore, { history } from "./store/configureStore";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import { ConfigProvider } from "antd";
import locale from "antd/es/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
// import { IntlProvider } from "react-intl";
// import zh_CN from "./locales/zh_CN";
// import en_US from "./locales/en_US";
// import intl from "intl";
import App from './App';
import './index.css';


moment.locale("zh-cn");
export { moment };
export const store = configureStore();
const persistor = persistStore(store);

// let messages = {
//     en: {},
//     zh: {},
// }
// messages["en"] = en_US;
// messages["zh"] = zh_CN;


const Loading = () => <div>loading</div>;

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {/* <IntlProvider locale="zh" messages={messages["zh"]}> */}
                <PersistGate loading={<Loading/>} persistor={persistor}>
                    <ConfigProvider locale={locale}>
                        <App />
                    </ConfigProvider>
                </PersistGate>
            {/* </IntlProvider> */}
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
