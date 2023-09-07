import { IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList, IonIcon, useIonViewDidEnter, IonItem, IonLabel, IonInput, InputCustomEvent, InputChangeEventDetail, IonButtons, IonBackButton } from "@ionic/react";
import { addCircle, listCircle, listOutline } from "ionicons/icons";
import React, { FormEvent, useEffect, useState } from "react";
import { IList } from "../../data/structs/todo";
import { SappService } from "../../data/services/sapp-service";
import { Category } from "./components/Category";
import { ICategory } from "./data/structs";

export const CategoriesPage: React.FC<{}> = () => {
    const [categories, setCategories] = useState<ICategory[]>([])

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = () => {
        return SappService.listInstances<ICategory>("sapp_blog", "category").then(({page}) => setCategories(page))
    }

    const refresh = (e: CustomEvent) => {
        loadCategories().then(() => e.detail.complete())
    }

    return (
    <>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/home"></IonBackButton>
                </IonButtons>
                <IonTitle>
                    <IonIcon icon={listOutline} className="ion-align-self-center" />&nbsp;
                    Topics
                </IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            <IonRefresher slot="fixed" onIonRefresh={refresh}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            <IonList>
                {
                    categories.map((category, index) => <Category category={category} key={index} />)
                }
            </IonList>
        </IonContent>
    </>
)}