
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';

export const LogoutPage: React.FC = () => {
    const authCtx = useContext(AuthContext)
    const router = useIonRouter()

    useEffect(() => {
        localStorage.clear()
        authCtx?.setUser(undefined)
        router.push("/login")
    }, [])

    return (
        <IonPage id="logout-page" className="auth-page">
            <IonHeader translucent>
                <IonToolbar>
                    <IonTitle>
                        <IonIcon icon={logOutOutline} className="ion-align-self-center" />&nbsp;
                        Logout
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
            </IonContent>
        </IonPage>
    );
};

