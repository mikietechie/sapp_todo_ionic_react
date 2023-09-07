import { IonButton, IonIcon, IonItem, IonList, IonRefresher, IonRefresherContent, IonText, IonTextarea } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { IComment, IPost } from "../data/structs";
import { fmtDateTime, fmtMediaUrl } from "../../../data/functions/filters";
import { SappService } from "../../../data/services/sapp-service";
import { sendOutline } from "ionicons/icons";

export const Comments: React.FC<{ post: IPost }> = ({ post }) => {
    const [comments, setComments] = useState<IComment[]>([])
    const textRef = useRef(null)

    useEffect(() => {
        loadComments()
    }, [post])

    const loadComments = async () => {
        setComments((await SappService.listInstances<IComment>("sapp_blog", "comment", `?submit=Apply&post=${post.id}`)).page)
    }

    const sendComment = async () => {
        const target = textRef.current as never as HTMLIonTextareaElement
        const text = target.value
        if (!text) return
        await SappService.createEditInstance("sapp_blog", "comment", {text, post: post.id})
        target.value = ""
        loadComments()
    }
    return (
        <>
        <IonList>
            <IonItem>
                <IonTextarea ref={textRef} rows={4} fill="outline" label="Your comment ...." labelPlacement="floating" >
                </IonTextarea>
                <IonButton onClick={sendComment} slot="end" >
                    <IonIcon icon={sendOutline} />
                </IonButton>
            </IonItem>
            {
                comments.map((comment, index) => (
                    <IonItem key={index} lines="none">
                        <IonText>
                            <q>* {comment.text}</q>
                        </IonText>
                    </IonItem>
                ))
            }
        </IonList>
        </>
    )
}