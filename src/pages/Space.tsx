import { IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { analyticsOutline, appsOutline, calendarOutline, chatboxOutline, flagOutline, libraryOutline, listOutline, logOutOutline, newspaperOutline, peopleCircleOutline } from "ionicons/icons";
import React, { useContext } from "react";
import { SpaceCtx } from "../contexts/SpaceCtx";
import { AuthCtx } from "../contexts/AuthCtx";

const SpacePage: React.FC<{}> = ({}) => {
    const spaceCtx = useContext(SpaceCtx)
    const authCtx = useContext(AuthCtx)

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle color="primary">
                        <IonIcon icon={appsOutline} />
                        {authCtx?.user?.username}'s Space
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    <IonItem onClick={() => spaceCtx?.setSpace("blog")}>
                        <IonIcon icon={newspaperOutline} slot="start" />
                        <IonLabel>School</IonLabel>
                    </IonItem>
                    <IonItem onClick={() => spaceCtx?.setSpace("blog")}>
                        <IonIcon icon={peopleCircleOutline} slot="start" />
                        <IonLabel>Applications</IonLabel>
                    </IonItem>
                    <IonItem onClick={() => spaceCtx?.setSpace("blog")}>
                        <IonIcon icon={analyticsOutline} slot="start" />
                        <IonLabel>Projects</IonLabel>
                    </IonItem>
                    <IonItem onClick={() => spaceCtx?.setSpace("blog")}>
                        <IonIcon icon={newspaperOutline} slot="start" />
                        <IonLabel>Blog</IonLabel>
                    </IonItem>
                    <IonItem onClick={() => spaceCtx?.setSpace("todo")}>
                        <IonIcon icon={listOutline} slot="start" />
                        <IonLabel>To Do</IonLabel>
                    </IonItem>
                    <IonItem onClick={() => spaceCtx?.setSpace("todo")}>
                        <IonIcon icon={calendarOutline} slot="start" />
                        <IonLabel>Events</IonLabel>
                    </IonItem>
                    <IonItem onClick={() => spaceCtx?.setSpace("todo")}>
                        <IonIcon icon={libraryOutline} slot="start" />
                        <IonLabel>Library</IonLabel>
                    </IonItem>
                    <IonItem onClick={() => spaceCtx?.setSpace("todo")}>
                        <IonIcon icon={flagOutline} slot="start" />
                        <IonLabel>Membership</IonLabel>
                    </IonItem>
                    <IonItem onClick={() => spaceCtx?.setSpace("todo")}>
                        <IonIcon icon={chatboxOutline} slot="start" />
                        <IonLabel>Chat</IonLabel>
                    </IonItem>
                    <IonItem onClick={() => authCtx?.logout()}>
                        <IonIcon icon={logOutOutline} slot="start" />
                        <IonLabel>Logout</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </>
    )
}

export default SpacePage
