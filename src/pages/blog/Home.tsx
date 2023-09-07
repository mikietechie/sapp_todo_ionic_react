import { FormEvent, useContext, useEffect, useRef, useState } from "react"
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonList, IonRefresher, IonRefresherContent, IonSearchbar, IonTitle, IonToolbar} from "@ionic/react"
import { bookmarkOutline, logOutOutline, pencilOutline, searchOutline, newspaperOutline, appsOutline } from "ionicons/icons"
import { AuthCtx } from "../../contexts/AuthCtx"
import { SappService } from "../../data/services/sapp-service"
import { ICategory, IPost } from "./data/structs"
import { PostSwiper } from "./components/PostSwiper"
import { Category } from "./components/Category"
import { SpaceCtx } from "../../contexts/SpaceCtx"


export const HomePage: React.FC<{}> = ({ }) => {
    const [categories, setCategories] = useState<ICategory[]>([])
    const [posts, setPosts] = useState<IPost[]>([])
    const [date, setDate] = useState((new Date()).toJSON().slice(0, 10))
    const authCtx = useContext(AuthCtx)
    const spaceCtx = useContext(SpaceCtx)

    useEffect(() => {
        loadData()
    }, [date])

    const loadData = async () => {
        setPosts((await SappService.listInstances<IPost>("sapp_blog", "post", "")).page)
        setCategories((await SappService.listInstances<ICategory>("sapp_blog", "category")).page)
    }

    const refresh = async (e: CustomEvent) => {
        await loadData()
        e.detail.complete()
    }

    const onSearch = async (v: string | null | undefined) => {
        if (!v) return
        alert(v)
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle color="primary">
                        <IonIcon icon={newspaperOutline} className="ion-align-self-center" />&nbsp;
                        {authCtx?.user?.username?.toLocaleUpperCase()}'s Feed
                    </IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <IonButtons className="ion-justify-content-center">
                        <IonButton fill="clear" size="small" routerLink="/search">
                            <IonIcon icon={searchOutline} />
                        </IonButton>
                        <IonButton fill="clear" size="small" routerLink="/overdue">
                            <IonIcon icon={bookmarkOutline} />
                        </IonButton>
                        <IonButton fill="clear" size="small" routerLink="/settings">
                            <IonIcon icon={pencilOutline} />
                        </IonButton>
                        <IonButton fill="clear" size="small" onClick={authCtx?.logout} >
                            <IonIcon icon={logOutOutline} />
                        </IonButton>
                        <IonButton fill="clear" size="small" onClick={() => spaceCtx?.setSpace("space")} >
                            <IonIcon icon={appsOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
                <IonToolbar>
                    <IonSearchbar onIonChange={(e) => onSearch(e.target.value)}></IonSearchbar>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding pb-150">
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                { posts.length ? <PostSwiper posts={posts} /> : "" }
                <IonList>
                    {
                        categories.map((category, index) => <Category category={category} key={index} />)
                    }
                </IonList>
            </IonContent>
        </>
    )
}