import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonItem, IonLabel } from "@ionic/react"
import { useContext, useEffect, useState } from "react"
import { fmtDateTime } from "../data/functions/filters"

import "./Timer.scss"
import { sunnyOutline, todayOutline } from "ionicons/icons"
import { AuthCtx } from "../contexts/AuthCtx"

export const Timer = () => {
    const [now, setNow] = useState(new Date())
    const authCtx = useContext(AuthCtx)

    useEffect(() => {
        const intervalID = setInterval(() => {
            setNow(new Date())
        }, 300)
        return (() => clearInterval(intervalID))
    }, [])

    return (
        <IonCard className="timer-card">
            <IonCardHeader>
                <IonIcon icon={sunnyOutline} className="icon-large"/>
                <IonCardTitle>
                    Good Day {authCtx?.user?.username?.toLocaleUpperCase()}
                </IonCardTitle>
                <IonCardSubtitle>{fmtDateTime(now)}</IonCardSubtitle>
            </IonCardHeader>
        </IonCard>
    )
}