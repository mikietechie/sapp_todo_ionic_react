import React, { useContext, useEffect, useState } from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, useIonRouter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { search, homeOutline, listOutline, bookmarkOutline, pencilOutline, appsOutline } from 'ionicons/icons';
import "./Blog.scss"
import { HomePage } from './Home';
import { CategoriesPage } from './Categories';
import { IUserCTXUser, UserCtx } from './contexts/UserContext';
import { CategoryPage } from './Category';
import { PostPage } from './Post';
import { WritePage } from './Write';
import { BookmarksPage } from './Bookmarks';
import { BlogPage } from './Blog';
import { SpaceCtx } from '../../contexts/SpaceCtx';

const BlogIndexPage: React.FC = () => {
    const [user, setUser] = useState<IUserCTXUser | null>(null)
    const spaceCtx = useContext(SpaceCtx)

    useEffect(() => {
    }, [])

    return (
        <IonReactRouter>
            <UserCtx.Provider value={{ user, setUser }}>
                <IonTabs>
                    <IonRouterOutlet>
                        <Redirect exact path="" to="/home" />
                        <Route path="/home" render={() => <HomePage />} exact={true} />
                        <Route path="/category/:categoryID" render={() => <CategoryPage />} />
                        <Route path="/categories" render={() => <CategoriesPage />} exact={true} />
                        <Route path="/bookmarks" render={() => <BookmarksPage />} exact={true} />
                        <Route path="/post/:postID" render={() => <PostPage />} />
                        <Route path="/blog" render={() => <BlogPage />} exact={true} />
                        <Route path="/blog/write" render={() => <WritePage />} exact={true} />
                        <Route path="/blog/write/:postID" render={() => <WritePage />} exact={true} />
                        <Route render={() => <Redirect to="/home" />} exact={true} />
                    </IonRouterOutlet>

                    <IonTabBar slot="bottom">

                        <IonTabButton tab='space' onClick={() => spaceCtx?.setSpace("space")}>
                            <IonIcon icon={appsOutline} />
                            <IonLabel>Space</IonLabel>
                        </IonTabButton>


                        <IonTabButton tab="bookmarks" href="/bookmarks">
                            <IonIcon icon={bookmarkOutline} />
                            <IonLabel>Bookmarked</IonLabel>
                        </IonTabButton>

                        <IonTabButton tab="home" href="/home">
                            <IonIcon icon={homeOutline} />
                            <IonLabel><b style={{ fontSize: "larger" }}>Home</b></IonLabel>
                        </IonTabButton>

                        <IonTabButton tab="blog" href="/blog">
                            <IonIcon icon={pencilOutline} />
                            <IonLabel>Blog</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </UserCtx.Provider>
        </IonReactRouter>
    );
}

export default BlogIndexPage