import { Redirect, Route, useHistory } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, useIonRouter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

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
import { useEffect, useRef, useState } from 'react';
import { LoginPage } from './pages/auth/Login';
import { RegisterPage } from './pages/auth/Register';
import { LogoutPage } from './pages/auth/Logout';
import { TestPage } from './pages/Test';
import { AuthCtx, IAuthCTXUser } from './contexts/AuthCtx';

setupIonicReact();

const App: React.FC = () => {
    const [user, setUser] = useState<IAuthCTXUser | null>(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    useEffect(() => {
        console.log(`user changed ${user?.username}`);
        if (!user) {
        }
    }, [user])


    return (
        <IonApp>
            <IonReactRouter>
                <AuthCtx.Provider value={{ setUser, user }}>
                    <IonRouterOutlet>
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
                        <Route path="/test" exact={true}>
                            <TestPage />
                        </Route>
                        <Route path={user ? "/todo" : "hidden-forever"}>
                            <TodoIndexPage />
                        </Route>
                        <Route render={() => <Redirect to="/login" />}></Route>
                    </IonRouterOutlet>
                </AuthCtx.Provider>
            </IonReactRouter>
        </IonApp >
    )
}

export default App;
