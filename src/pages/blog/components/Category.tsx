import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonText, IonThumbnail } from "@ionic/react";
import React from "react";
import { ICategory, IPost } from "../data/structs";
import { fmtDateTime, fmtMediaUrl } from "../../../data/functions/filters";

export const Category: React.FC<{ category: ICategory }> = ({ category }) => {
    return (
        <IonItem className="category-item ion-margin-vertical" routerLink={`/category/${category.id}`}>
            <IonThumbnail slot="start">
                <img alt={`${category.name} Header Image`} src={fmtMediaUrl(category.image)} />
            </IonThumbnail>
            <IonLabel>
                <h2>{category.name}</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, expedita.</p>
                <p>{category.creation_timestamp}</p>
            </IonLabel>

        </IonItem>
    )
}