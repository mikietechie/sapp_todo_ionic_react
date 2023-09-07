import { useContext, useEffect, useState } from "react"
import { IonBackButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonRefresher, IonRefresherContent, IonText, IonThumbnail, IonTitle, IonToolbar, useIonRouter } from "@ionic/react"
import { useParams } from "react-router"
import { bookmarkOutline, listOutline, pencilOutline } from "ionicons/icons"
import { SappService } from "../../data/services/sapp-service"
import { ICategory, IPost } from "./data/structs"
import { Posts } from "./components/Posts"
import { AuthCtx } from "../../contexts/AuthCtx"
import { fmtMediaUrl } from "../../data/functions/filters"


export const BlogPage: React.FC<{}> = () => {
    const [posts, setposts] = useState<IPost[]>([])
    const authCtx = useContext(AuthCtx)
    // const router = useIonRouter()

    useEffect(() => {
        loadPosts()
    }, [])

    const loadPosts = async () => {
        setposts((await SappService.listInstances<IPost>("sapp_blog", "post", `?submit=Apply&created_by=${authCtx?.user?.id}`)).page)
    }

    const refresh = async (e: CustomEvent) => {
        await loadPosts()
        e.detail.complete()
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home"></IonBackButton>
                    </IonButtons>
                    <IonTitle>
                        <IonIcon icon={pencilOutline} className="ion-align-self-center" />&nbsp;
                        My Blog
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonList>
                    {
                        posts.map((post, index) => (
                            <IonItem key={index} className="post-item" routerLink={`/blog/write/${post.id}`}>
                                {/* <IonThumbnail slot="start">
                                    <img alt={`${post.title} Header Image`} src={fmtMediaUrl(post.image)} />
                                </IonThumbnail> */}
                                <IonLabel>
                                    <h2>{post.title}</h2>
                                    <p>{post.edit_timestamp}</p>
                                </IonLabel>
                            </IonItem>
                        ))
                    }
                </IonList>
                <IonFab slot="fixed" horizontal="end" vertical="top" color="pri">
                    <IonFabButton routerLink="/blog/write" size="small">
                        <IonIcon icon={pencilOutline} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </>
    )
}