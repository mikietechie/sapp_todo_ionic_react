
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonNote, IonPage, IonRow, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import axios from 'axios';
import { checkmarkDoneCircleOutline, checkmarkDoneOutline, checkmarkOutline, logInOutline, personAddOutline } from 'ionicons/icons';
import { FormEvent, useRef, useState } from 'react';
import "./auth.scss"
import { serverURL } from '../../data/common';

export const RegisterPage: React.FC = () => {
    const usernameRef = useRef<HTMLIonInputElement>(null)
    const passwordRef = useRef<HTMLIonInputElement>(null)
    const [detail, setDetail] = useState("")

    useIonViewWillEnter(() => {

    })

    const submitForm = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const payload = { username: usernameRef.current?.value, password: passwordRef.current?.value }
            const res = await axios.post(`${serverURL}auth/api/login/`, payload)
            console.log(res.data)
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
                        <IonCol sizeMd='4' offsetMd='4' sizeLg='4' offsetLg='3' sizeXl='3'>
                            <IonCard>
                                <IonCardContent>
                                    <IonItem className="item-lines-none heading">
                                        <IonLabel className="ion-text-wrap">
                                            <h1 className="ion-text-center ion-margin-vertical">
                                                <IonIcon icon={checkmarkDoneCircleOutline} slot='start' />&nbsp;
                                                SAPP To Do
                                            </h1>
                                            <p className="ion-text-center">
                                                <IonNote>Welcome, Buddy :)</IonNote>
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
                                        <IonItem className="item-lines-none">
                                            <p>
                                                <IonButton type='submit' expand='block' className="ion-margin-vertical">
                                                    <IonIcon icon={personAddOutline} slot='start' />&nbsp;Register
                                                </IonButton>
                                                <IonButton expand='block' fill='clear' routerLink='/login'>
                                                    <IonIcon icon={logInOutline} slot='start' />&nbsp;Login
                                                </IonButton>
                                            </p>
                                        </IonItem>
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

