import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import React from "react";
import { IList } from "../../data/todos";
import { listCircle } from "ionicons/icons";

interface ListProps {
    list: IList;
}

export const List: React.FC<ListProps> = ({list}) => {
    return (
        <>
        <IonItem>
            <div slot="start">
                <IonIcon icon={listCircle} />
            </div>
            <IonLabel>
                <h2>
                    {list.name}
                </h2>
                <h3>
                    {list.desc}
                </h3>
                <p>{list.desc}</p>
            </IonLabel>
        </IonItem>
        </>
    )
}
