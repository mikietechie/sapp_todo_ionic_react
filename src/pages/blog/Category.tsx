import { useEffect,  useState } from "react"
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon,  IonList, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, useIonRouter} from "@ionic/react"
import { useParams } from "react-router"
import { listOutline } from "ionicons/icons"
import { SappService } from "../../data/services/sapp-service"
import { ICategory, IPost } from "./data/structs"
import { Posts } from "./components/Posts"

export const CategoryPage: React.FC<{}> = () => {
    const [posts, setposts] = useState<IPost[]>([])
    const [category, setCategory] = useState<ICategory>()
    const { categoryID } = useParams<{ categoryID: string }>()
    const router = useIonRouter()

    useEffect(() => {
        if (!categoryID) router.push("/categories")
        loadCategory()
        loadPosts()
    }, [])

    const loadCategory = async () => {
        setCategory((await SappService.detailInstance<ICategory>("sapp_blog", "category", parseInt(categoryID))).instance)
    }

    const loadPosts = async () => {
        setposts((await SappService.listInstances<IPost>("sapp_blog", "post", `?submit=Apply&category=${categoryID}`)).page)
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
                        <IonBackButton defaultHref="/lists"></IonBackButton>
                    </IonButtons>
                    <IonTitle>
                        <IonIcon icon={listOutline} className="ion-align-self-center" />&nbsp;
                        {category ? category.name : `List #${categoryID}`}
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