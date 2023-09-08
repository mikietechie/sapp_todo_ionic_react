import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { accessibilityOutline, analyticsOutline, appsOutline, calendarOutline, chatboxOutline, flagOutline, libraryOutline, listOutline, logOutOutline, newspaperOutline, peopleCircleOutline, personCircleOutline, settingsOutline, time } from "ionicons/icons";
import React, { useContext, useEffect } from "react";
import { SpaceCtx } from "../../contexts/SpaceCtx";
import { AuthCtx } from "../../contexts/AuthCtx";

import "./Space.scss"
import { Timer } from "../../components/Timer";

const SpacePage: React.FC<{}> = ({}) => {
    const spaceCtx = useContext(SpaceCtx)
    const authCtx = useContext(AuthCtx)

    return (
        <IonPage className="space-page">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle color="primary">
                        <IonIcon icon={appsOutline} />&nbsp;
                        {authCtx?.user?.username?.toUpperCase()}'s Space
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <Timer />
                <IonList className="dotted-list">
                    <IonItem className="" lines="none" onClick={() => spaceCtx?.setSpace("blog")}>
                        <IonIcon className="icon-large" icon={newspaperOutline} slot="start" />
                        <IonLabel>
                            <h2>School</h2>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </IonLabel>
                    </IonItem>
                    <IonItem className="" lines="none" onClick={() => spaceCtx?.setSpace("applications")}>
                        <IonIcon className="icon-large" icon={peopleCircleOutline} slot="start" />
                        <IonLabel>
                            <h2>Applications</h2>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </IonLabel>
                    </IonItem>
                    <IonItem className="" lines="none" onClick={() => spaceCtx?.setSpace("blog")}>
                        <IonIcon className="icon-large" icon={analyticsOutline} slot="start" />
                        <IonLabel>
                            <h2>Projects</h2>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </IonLabel>
                    </IonItem>
                    <IonItem className="" lines="none" onClick={() => spaceCtx?.setSpace("blog")}>
                        <IonIcon className="icon-large" icon={accessibilityOutline} slot="start" />
                        <IonLabel>
                            <h2>HR</h2>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </IonLabel>
                    </IonItem>
                    <IonItem className="ion" lines="none" onClick={() => spaceCtx?.setSpace("blog")}>
                        <IonIcon className="icon-large" icon={newspaperOutline} slot="start" />
                        <IonLabel>
                            <h2>Blog</h2>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </IonLabel>
                    </IonItem>
                    <IonItem className="" lines="none" onClick={() => spaceCtx?.setSpace("todo")}>
                        <IonIcon className="icon-large" icon={listOutline} slot="start" />
                        <IonLabel>
                            <h2>To Do</h2>
                            <p>Lorem ipsum dolor sit amet.</p></IonLabel>
                    </IonItem>
                    <IonItem className="" lines="none" onClick={() => spaceCtx?.setSpace("todo")}>
                        <IonIcon className="icon-large" icon={calendarOutline} slot="start" />
                        <IonLabel>
                            <h2>Events</h2>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </IonLabel>
                    </IonItem>
                    <IonItem className="" lines="none" onClick={() => spaceCtx?.setSpace("todo")}>
                        <IonIcon className="icon-large" icon={libraryOutline} slot="start" />
                        <IonLabel>
                            <h2>Library</h2>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </IonLabel>
                    </IonItem>
                    <IonItem className="" lines="none" onClick={() => spaceCtx?.setSpace("todo")}>
                        <IonIcon className="icon-large" icon={flagOutline} slot="start" />
                        <IonLabel>
                            <h2>Membership</h2>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </IonLabel>
                    </IonItem>
                    <IonItem className="" lines="none" onClick={() => spaceCtx?.setSpace("todo")}>
                        <IonIcon className="icon-large" icon={chatboxOutline} slot="start" />
                        <IonLabel>
                            <h2>Chat</h2>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </IonLabel>
                    </IonItem>
                    <IonItem className="" lines="none" onClick={() => spaceCtx?.setSpace("profile")}>
                        <IonIcon className="icon-large" icon={personCircleOutline} slot="start" />
                        <IonLabel>
                            <h2>Profile</h2>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </IonLabel>
                    </IonItem>
                    <IonItem className="" lines="none" onClick={() => spaceCtx?.setSpace("settings")}>
                        <IonIcon className="icon-large" icon={settingsOutline} slot="start" />
                        <IonLabel>
                            <h2>Settings</h2>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </IonLabel>
                    </IonItem>
                    <IonItem className="" lines="none" onClick={() => authCtx?.logout()}>
                        <IonIcon className="icon-large" icon={logOutOutline} slot="start" />
                        <IonLabel>
                            <h2>Logout</h2>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default SpacePage
