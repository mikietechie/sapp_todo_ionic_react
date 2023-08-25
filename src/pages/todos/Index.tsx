import React, { useContext, useEffect } from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, useIonRouter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router';
import { search, homeOutline, listOutline, libraryOutline, starOutline } from 'ionicons/icons';

import { LandingPage } from './Landing';
import { ListsPage } from './Lists';
import { ListPage } from './List';
import { HistoryPage } from './History';
import { SearchPage } from './Search';
import { ImportantPage } from './Important';
import { SettingsPage } from './Settings';
import { AuthContext } from '../../contexts/AuthContext';

export const TodoIndexPage: React.FC = () => {
    const router = useIonRouter()
    const authCtx = useContext(AuthContext)

    useEffect(() => {
        // if (!authCtx?.user) {
        //     router.push("/login")
        // }
    }, [])

    return (
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Redirect exact path="/todo" to="/todo/home" />
                    <Route path="/todo/home" render={() => <LandingPage />} exact={true} />
                    <Route path="/todo/list/:listID" render={() => <ListPage />} />
                    <Route path="/todo/lists" render={() => <ListsPage />} exact={true} />
                    <Route path="/todo/history" render={() => <HistoryPage />} exact={true} />
                    <Route path="/todo/search" render={() => <SearchPage />} exact={true} />
                    <Route path="/todo/important" render={() => <ImportantPage />} exact={true} />
                    <Route path="/todo/settings" render={() => <SettingsPage />} exact={true} />
                </IonRouterOutlet>

                <IonTabBar slot="bottom">

                    <IonTabButton tab="lists" href="/todo/lists">
                        <IonIcon icon={listOutline} />
                        <IonLabel>Lists</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="search" href="/todo/search">
                        <IonIcon icon={search} />
                        <IonLabel>Search</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="home" href="/todo/home">
                        <IonIcon icon={homeOutline} />
                        <IonLabel><b style={{fontSize: "larger"}}>Home</b></IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="important" href="/todo/important">
                        <IonIcon icon={starOutline} />
                        <IonLabel>Important</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="history" href="/todo/history">
                        <IonIcon icon={libraryOutline} />
                        <IonLabel>History</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    );
}