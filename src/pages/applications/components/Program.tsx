import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import React from "react";
import { IProgram } from "../data/structs";
import { addOutline } from "ionicons/icons";

export const Program: React.FC<{ program: IProgram }> = ({ program }) => {
    return (
        <IonItem className="program-item ion-margin-vertical" routerLink={`/program/${program.id}`}>
            <IonIcon icon={addOutline} slot="start" />
            <IonLabel>
                <h2>{program.name}</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, expedita.</p>
                <p>{program.creation_timestamp}</p>
            </IonLabel>
        </IonItem>
    )
}