import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, useIonRouter, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import ViewMessage from './pages/ViewMessage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { TodoIndexPage } from './pages/todos/Index';
import { useEffect, useState } from 'react';
import { AuthContext, AuthContextType } from './contexts/AuthContext'
import { LoginPage } from './pages/auth/Login';
import { RegisterPage } from './pages/auth/Register';
import { IToken, IUser, getSessionUser } from './data/auth';
import { AxiosRequestConfig } from 'axios';
import { LogoutPage } from './pages/auth/Logout';

setupIonicReact();

const App: React.FC = () => {
    const [token, _setToken] = useState<IToken>()
    const [user, _setUser] = useState<IUser>()
    const [headers, _setHeaders] = useState<AxiosRequestConfig>()
    const router = useIonRouter()

    useEffect(() => {
        loadTokenUser()
    }, [])

    const loadTokenUser = async () => {
        const storedToken = localStorage.getItem("token")
        if (storedToken) {
            try {
                await loadUser()
                setToken(JSON.parse(localStorage.getItem("token")!))
                router.push("/todo")
            } catch (error) {
                console.error(error)
            }
        }
    }

    const loadUser = async () => {
        setUser(await getSessionUser())
    }

    const clearToken = () => {
        localStorage.removeItem("token")
        _setHeaders({})
        _setToken(undefined)
    }

    const setToken = (o: IToken | undefined) => {
        localStorage.setItem("token", JSON.stringify(o))
        setHeaders({ headers: { Authorization: `Bearer ${o?.access}` } })
        _setToken(o)
    }

    const setUser = (o: IUser|undefined) => {
        localStorage.setItem("user", JSON.stringify(o))
        _setUser(o)
    }

    const setHeaders = (o: AxiosRequestConfig|undefined) => {
        localStorage.setItem("headers", JSON.stringify(o))
        _setHeaders(o)
    }


    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <AuthContext.Provider value={{ token, user, setToken, setUser, loadUser, clearToken }}>
                        <Route path="/" exact={true}>
                            <Redirect to="/login" />
                        </Route>
                        <Route path="/login" exact={true}>
                            <LoginPage />
                        </Route>
                        <Route path="/logout" exact={true}>
                            <LogoutPage />
                        </Route>
                        <Route path="/register" exact={true}>
                            <RegisterPage />
                        </Route>
                        <Route path="/home" exact={true}>
                            <Home />
                        </Route>
                        <Route path="/todo">
                            <TodoIndexPage />
                        </Route>
                        <Route path="/message/:id">
                            <ViewMessage />
                        </Route>
                    </AuthContext.Provider>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp >
    )
}

export default App;
