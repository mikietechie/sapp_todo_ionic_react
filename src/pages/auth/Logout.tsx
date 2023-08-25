
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';
import { AuthCtx } from '../../contexts/AuthCtx';

export const LogoutPage: React.FC = () => {
    const authCtx = useContext(AuthCtx)
    const router = useIonRouter()

    useEffect(() => {
        localStorage.clear()
        authCtx?.setUser(null)
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

