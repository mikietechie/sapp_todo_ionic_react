import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonText, IonThumbnail } from "@ionic/react";
import React from "react";
import { IPost } from "../data/structs";
import { fmtDateTime, fmtMediaUrl } from "../../../data/functions/filters";

export const Post: React.FC<{ post: IPost }> = ({ post }) => {
    return (
        <IonCard className="post-item ion-margin-vertical" routerLink={`/post/${post.id}`}>
            <img alt={`${post.title} Header Image`} src={fmtMediaUrl(post.image)} />
            <IonCardHeader>
                <IonCardTitle>{post.title}</IonCardTitle>
                <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <IonText>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, expedita.
                </IonText>
            </IonCardContent>
        </IonCard>
    )
}