import React, { useContext, useEffect, useState } from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { homeOutline, bookmarkOutline, pencilOutline, appsOutline } from 'ionicons/icons';
import "./Applications.scss"
import { SpaceCtx } from '../../contexts/SpaceCtx';
import { HomePage } from './Home';
import { ApplicationPage } from './Application';

const ApplicationsIndexPage: React.FC = () => {
    const spaceCtx = useContext(SpaceCtx)

    return (
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Redirect exact path="" to="/home" />
                    <Route path="/home" render={() => <HomePage />} exact={true} />
                    <Route path="/application/:applicationID" render={() => <ApplicationPage />} />
                    {/* 
                    <Route path="/categories" render={() => <CategoriesPage />} exact={true} />
                    <Route path="/bookmarks" render={() => <BookmarksPage />} exact={true} />
                    <Route path="/post/:postID" render={() => <PostPage />} />
                    <Route path="/blog" render={() => <BlogPage />} exact={true} />
                    <Route path="/blog/write" render={() => <WritePage />} exact={true} />
                    <Route path="/blog/write/:postID" render={() => <WritePage />} exact={true} /> */}
                    <Route render={() => <Redirect to="/home" />} exact={true} />
                </IonRouterOutlet>

                <IonTabBar slot="bottom">

                    <IonTabButton tab='space' onClick={() => spaceCtx?.setSpace("space")}>
                        <IonIcon icon={appsOutline} />
                        <IonLabel>Space</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="home" href="/home">
                        <IonIcon icon={homeOutline} />
                        <IonLabel><b style={{ fontSize: "larger" }}>Home</b></IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="programs" href="/programs">
                        <IonIcon icon={bookmarkOutline} />
                        <IonLabel>Programs</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="applications" href="/applications">
                        <IonIcon icon={pencilOutline} />
                        <IonLabel>My Applications</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    );
}

export default ApplicationsIndexPage