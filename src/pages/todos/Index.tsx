import React, { useContext, useEffect } from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, useIonRouter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { search, homeOutline, listOutline, libraryOutline, starOutline, appsOutline } from 'ionicons/icons';

import { HomePage } from './Home';
import { ListsPage } from './Lists';
import { ListPage } from './List';
import { HistoryPage } from './History';
import { SearchPage } from './Search';
import { ImportantPage } from './Important';
import { SettingsPage } from './Settings';
import { AuthCtx } from '../../contexts/AuthCtx';
import { OverduePage } from './Overdue';
import { SpaceCtx } from '../../contexts/SpaceCtx';

const TodoIndexPage: React.FC = () => {
    const authCtx = useContext(AuthCtx)
    const spaceCtx = useContext(SpaceCtx)
    // const router = useIonRouter()

    return (
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Redirect exact path="" to="/home" />
                    <Route path="/home" render={() => <HomePage />} exact={true} />
                    <Route path="/list/:listID" render={() => <ListPage />} />
                    <Route path="/lists" render={() => <ListsPage />} exact={true} />
                    <Route path="/history" render={() => <HistoryPage />} exact={true} />
                    <Route path="/search" render={() => <SearchPage />} exact={true} />
                    <Route path="/important" render={() => <ImportantPage />} exact={true} />
                    <Route path="/settings" render={() => <SettingsPage />} exact={true} />
                    <Route path="/overdue" render={() => <OverduePage />} exact={true} />
                    <Route render={() => <Redirect to="/home" />} exact={true} />
                </IonRouterOutlet>

                <IonTabBar slot="bottom">

                    <IonTabButton tab='space' onClick={() => spaceCtx?.setSpace("space")}>
                        <IonIcon icon={appsOutline} />
                        <IonLabel>Space</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="lists" href="/lists">
                        <IonIcon icon={listOutline} />
                        <IonLabel>Lists</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="search" href="/search">
                        <IonIcon icon={search} />
                        <IonLabel>Search</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="home" href="/home">
                        <IonIcon icon={homeOutline} />
                        <IonLabel><b style={{ fontSize: "larger" }}>Home</b></IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="important" href="/important">
                        <IonIcon icon={starOutline} />
                        <IonLabel>Important</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="history" href="/history">
                        <IonIcon icon={libraryOutline} />
                        <IonLabel>History</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    );
}

export default TodoIndexPage