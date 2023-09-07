import { useContext, useEffect,  useState } from "react"
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon,  IonList, IonRefresher, IonRefresherContent, IonText, IonTitle, IonToolbar, useIonRouter} from "@ionic/react"
import { useParams } from "react-router"
import { bookmarkOutline, listOutline } from "ionicons/icons"
import { SappService } from "../../data/services/sapp-service"
import { ICategory, IPost } from "./data/structs"
import { Posts } from "./components/Posts"
import { AuthCtx } from "../../contexts/AuthCtx"


export const BookmarksPage: React.FC<{}> = () => {
    const [posts, setposts] = useState<IPost[]>([])
    const [ids, setIds] = useState<number[]>([])
    const authCtx = useContext(AuthCtx)
    // const router = useIonRouter()

    useEffect(() => {
        loadIds()
    }, [])

    useEffect(() => {
        loadPosts()
    }, [ids])

    const loadPosts = async () => {
        if (!ids.length) return
        setposts((await SappService.listInstances<IPost>("sapp_blog", "post", `?submit=Apply${ids.map(v => `&id__in=${v}`).join("")}`)).page)
    }

    const loadIds = async () => {
        setIds((await SappService.listInstances<{instance_id: number}>("sapp", "bookmark", `?submit=Apply&created_by=${authCtx?.user?.id}`)).page.map(i => i.instance_id))
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
                        <IonIcon icon={bookmarkOutline} className="ion-align-self-center" />&nbsp;
                        Bookmarked
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <Posts posts={posts} />
            </IonContent>
        </>
    )
}