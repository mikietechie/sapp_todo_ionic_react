
import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonNote, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert, useIonRouter, useIonToast, useIonViewWillEnter } from '@ionic/react';
import { checkmarkDoneCircleOutline, logInOutline, personAddOutline } from 'ionicons/icons';
import { FormEvent, useContext, useRef, useState } from 'react';
import "./auth.scss"
import { AuthCtx } from '../../contexts/AuthCtx';
import { SappService } from '../../data/services/sapp-service';

export const RegisterPage: React.FC<{setPage: (p: "login" | "register") => void}> = ({setPage}) => {
    const usernameRef = useRef<HTMLIonInputElement>(null)
    const passwordRef = useRef<HTMLIonInputElement>(null)
    const [detail, setDetail] = useState("")
    const authCtx = useContext(AuthCtx)
    const [presentToast] = useIonToast()
    // const [formErrors, setFormErrors] = useState<{}[]>([])

    const submitForm = async (e: FormEvent) => {
        e.preventDefault()
        setDetail("")
        const [username, password] = [usernameRef.current?.value, passwordRef.current?.value]
        try {
            const payload = { username, password, password_confirmation: password }
            const data = await SappService.register(payload)
            if (data.id) {
                presentToast({message: `Hey ${username} good to have you, please proceed to login!`, duration: 1500, position: "bottom", buttons: ["Ok, Cool!"]})
                localStorage.setItem('user', JSON.stringify(data))
                authCtx?.setUser(data)
                // setPage("login")
            } else if (data?.form.errors) {
                let errorsStr = ""
                    Object.entries(data?.form?.errors).forEach(([field, errors]) => {
                        (errors as {message: string}[]).forEach(({message}) => {
                            errorsStr += " " + message
                        })
                    })
                    setDetail(errorsStr)
            }
        } catch (error: any) {
            setDetail(error?.response?.data?.detail || "An Error Occured")
        }
    }

    return (
        <IonPage id="login-page" className="auth-page">
            <IonHeader translucent>
                <IonToolbar>
                    <IonTitle>
                        <IonIcon icon={personAddOutline} className="ion-align-self-center" />&nbsp;
                        Register
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
                                                SAPP To Do
                                            </h1>
                                            <p className="ion-text-center">
                                                <IonNote>Good to have you :)</IonNote>
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
                                                <IonIcon icon={personAddOutline} slot='start' />&nbsp;Register
                                            </IonButton>
                                            <IonButton expand='block' fill='clear' className="" onClick={() => setPage("login")}>
                                                <IonIcon icon={logInOutline} slot='start' />&nbsp;Login
                                            </IonButton>
                                        </p>
                                    </form>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

