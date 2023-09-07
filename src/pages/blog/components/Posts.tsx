import React from "react";
import { IPost } from "../data/structs";
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { Post } from "./Post";

export const Posts: React.FC<{ posts: IPost[] }> = ({ posts }) => {
    return (
        <IonGrid>
            <IonRow>
                {posts.map((post, i) => (
                    <IonCol size="12" sizeMd="6" sizeLg="4" key={i}>
                        <Post post={post} key={i} />
                    </IonCol>
                ))}
            </IonRow>
        </IonGrid>
    )
}