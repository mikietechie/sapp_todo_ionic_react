import React, { useContext, useEffect } from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, useIonRouter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { search, homeOutline, listOutline, libraryOutline, starOutline } from 'ionicons/icons';

import { LandingPage } from './Landing';
import { ListsPage } from './Lists';
import { ListPage } from './List';
import { HistoryPage } from './History';
import { SearchPage } from './Search';
import { ImportantPage } from './Important';
import { SettingsPage } from './Settings';
import { AuthCtx } from '../../contexts/AuthCtx';

export const TodoIndexPage: React.FC = () => {
    const authCtx = useContext(AuthCtx)
    const router = useIonRouter()

    useEffect(() => {
        console.log(authCtx?.user)
        console.log({localStorage})
    }, [])

    return (
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Redirect exact path="" to="/home" />
                    <Route path="/home" render={() => <LandingPage />} exact={true} />
                    <Route path="/list/:listID" render={() => <ListPage />} />
                    <Route path="/lists" render={() => <ListsPage  />} exact={true} />
                    <Route path="/history" render={() => <HistoryPage />} exact={true} />
                    <Route path="/search" render={() => <SearchPage />} exact={true} />
                    <Route path="/important" render={() => <ImportantPage />} exact={true} />
                    <Route path="/settings" render={() => <SettingsPage />} exact={true} />
                    <Route render={() => <Redirect to="/home" />} exact={true} />
                </IonRouterOutlet>

                <IonTabBar slot="bottom">

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
                        <IonLabel><b style={{fontSize: "larger"}}>Home</b></IonLabel>
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