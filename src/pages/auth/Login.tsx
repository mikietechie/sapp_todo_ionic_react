
import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonNote, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { atOutline, checkmarkDoneCircleOutline, logInOutline, personAddOutline } from 'ionicons/icons';
import { FormEvent, useContext, useRef, useState } from 'react';
import "./auth.scss"
import { AuthCtx } from '../../contexts/AuthCtx';
import { SappService } from '../../data/services/sapp-service';

export const LoginPage: React.FC<{setPage: (p: "login" | "register") => void}> = ({setPage}) => {
    const usernameRef = useRef<HTMLIonInputElement>(null)
    const passwordRef = useRef<HTMLIonInputElement>(null)
    const [error, setError] = useState("")
    const [detail, setDetail] = useState("")
    const authCtx = useContext(AuthCtx)

    const submitForm = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const token = await SappService.login({ username: usernameRef.current?.value, password: passwordRef.current?.value })
            const user = await SappService.getSessionUser({headers: {Authorization: `Bearer ${token.access}`}})
            localStorage.setItem('user', JSON.stringify({...user, token}))
            authCtx?.setUser(user)
        } catch (error: any) {
            setError(error)
            setDetail(error?.response?.data?.detail || "An Error Occured")
        }
    }

    return (
        <IonPage id="login-page" className="auth-page">
            <IonHeader translucent>
                <IonToolbar>
                    <IonTitle>
                        <IonIcon icon={logInOutline} className="ion-align-self-center" />&nbsp;
                        Login
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonGrid>
                    <IonRow className='ion-padding-top'>
                        <IonCol sizeMd='6' offsetMd='2' sizeLg='5' offsetLg='2' sizeXl='4'>
                            <IonCard>
                                <IonCardContent>
                                    <IonItem className="item-lines-none heading">
                                        <IonLabel className="ion-text-wrap">
                                            <h1 className="ion-text-center ion-margin-vertical">
                                                <IonIcon icon={checkmarkDoneCircleOutline} slot='start' />&nbsp;
                                                SAPP Space
                                            </h1>
                                            <p className="ion-text-center">
                                                <IonNote>Welcome Back, Buddy {authCtx?.user?.username} :)</IonNote>
                                            </p>
                                        </IonLabel>
                                    </IonItem>
                                    <form onSubmit={submitForm}>
                                        {
                                            detail ? <IonItem className="item-lines-none"><IonLabel className="ion-text-wrap" color="danger">{detail}</IonLabel></IonItem> : ""
                                        }
                                        <IonItem className="ion-margin-vertical">
                                            <IonInput label='Username *' minlength={2} labelPlacement='stacked' ref={usernameRef} autocomplete='username' required={true} />
                                        </IonItem>
                                        <IonItem className="ion-margin-vertical">
                                            <IonInput type='password' label='Password *' minlength={2} labelPlacement='stacked' ref={passwordRef} autocomplete='current-password' required={true} />
                                        </IonItem>
                                        <p>
                                            <IonButton type='submit' expand='block' className="ion-margin-vertical">
                                                <IonIcon icon={logInOutline} slot='start' />&nbsp;Login
                                            </IonButton>
                                            <IonButton expand='block' fill='clear' className="" onClick={() => setPage("register")}>
                                                <IonIcon icon={personAddOutline} slot='start' />&nbsp;Register
                                            </IonButton>
                                        </p>
                                    </form>
                                    {/* <pre>
                                        {JSON.stringify(error, null, 2)}
                                    </pre> */}
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

