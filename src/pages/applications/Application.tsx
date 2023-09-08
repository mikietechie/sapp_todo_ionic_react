import { useEffect,  useState } from "react"
import { IonBackButton, IonButtons, IonChip, IonContent, IonHeader, IonIcon,  IonItem,  IonLabel,  IonList,  IonListHeader,  IonTitle, IonToolbar, useIonRouter} from "@ionic/react"
import { useParams } from "react-router"
import { listOutline } from "ionicons/icons"
import { SappService } from "../../data/services/sapp-service"
import { IApplication, IStage } from "./data/structs"
import { orderBy } from "lodash"

export const ApplicationPage: React.FC<{}> = () => {
    const [application, setApplication] = useState<IApplication>()
    const [stages, setStages] = useState<IStage[]>([])
    const { applicationID } = useParams<{ applicationID: string }>()
    const router = useIonRouter()

    useEffect(() => {
        if (!applicationID) router.goBack()
        loadApplication()
    }, [])

    useEffect(() => {
        if (!application) return
        SappService.listInstances<IStage>("sapp_applications", "stage", `?submit=Appply&program=${application.program}`).then(({page}) => {
            setStages(orderBy(page, (i) => i.number))
        })
    }, [application])

    const loadApplication = async () => {
        setApplication((await SappService.detailInstance<IApplication>("sapp_applications", "application", parseInt(applicationID))).instance)
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={`/applications`}></IonBackButton>
                    </IonButtons>
                    <IonTitle>
                        <IonIcon icon={listOutline} className="ion-align-self-center" />&nbsp; Hello
                        {application ? application.about : `List #${applicationID}`}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding pb-100">
                <IonList>
                    <IonListHeader></IonListHeader>
                    {
                        stages.map((stage, index) => (
                            <IonItem lines="none">
                                <IonChip color="primary" slot="start">
                                    <IonLabel>
                                        <IonChip><IonLabel>{stage.number}</IonLabel></IonChip>
                                        {stage.name}
                                    </IonLabel>
                                </IonChip>
                            </IonItem>
                        ))
                    }
                </IonList>
            </IonContent>
        </>
    )
}