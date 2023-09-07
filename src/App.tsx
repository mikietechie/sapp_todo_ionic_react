import { IonApp, setupIonicReact} from '@ionic/react';
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
import './App.scss'
import TodoIndexPage from './pages/todos/Index';
import { useEffect, useState, lazy } from 'react';
import { AuthCtx, IAuthCTXUser } from './contexts/AuthCtx';
import { AuthPage } from './pages/auth/auth';

setupIonicReact();

const Todo = lazy(() => import('./pages/todos/Index'))
const Blog = lazy(() => import('./pages/blog/Index'))

const App: React.FC = () => {
    const [user, setUser] = useState<IAuthCTXUser | null>(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    return (
        <IonApp>
            <AuthCtx.Provider value={{ setUser, user }}>
            {
                !user ? <AuthPage /> : <Blog />
            }
            </AuthCtx.Provider>
        </IonApp >
    )
}

export default App;
