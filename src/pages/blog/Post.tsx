import { useEffect,  useState } from "react"
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon,  IonList, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, useIonRouter} from "@ionic/react"
import { useParams } from "react-router"
import { bookmarkOutline, listOutline } from "ionicons/icons"
import { SappService } from "../../data/services/sapp-service"
import { IPost } from "./data/structs"
import { Post } from "./components/Post"
import { Posts } from "./components/Posts"
import { Comments } from "./components/Comments"

export const PostPage: React.FC<{}> = () => {
    const [post, setPost] = useState<IPost>()
    const { postID } = useParams<{ postID: string }>()
    const router = useIonRouter()

    useEffect(() => {
        if (!postID) router.goBack()
        loadPost()
    }, [])

    const loadPost = async () => {
        setPost((await SappService.detailInstance<IPost>("sapp_blog", "post", parseInt(postID))).instance)
    }

    const bookmarkBlog = async () => {
        await SappService.createEditInstance("sapp", "bookmark", {model: "sapp_blog.Post", instance_id: postID, title: "love"})
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={`/category/${post?.category}`}></IonBackButton>
                    </IonButtons>
                    <IonTitle>
                        <IonIcon icon={listOutline} className="ion-align-self-center" />&nbsp;
                        {post ? post.title : `List #${postID}`}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding pb-100">
                {/* <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher> */}
                {post && (
                    <>
                    <Post post={post} />
                    <IonButton onClick={bookmarkBlog}><IonIcon icon={bookmarkOutline} /></IonButton>
                    <Comments post={post} />
                    </>
                ) || ""}
                
            </IonContent>
        </>
    )
}