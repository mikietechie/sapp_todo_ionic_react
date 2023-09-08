import { useContext, useEffect, useState } from "react"
import { IonContent, IonHeader, IonIcon, IonLabel, IonList, IonListHeader, IonRefresher, IonRefresherContent, IonTitle, IonToolbar} from "@ionic/react"
import {  documentTextOutline } from "ionicons/icons"
import { AuthCtx } from "../../contexts/AuthCtx"
import { SappService } from "../../data/services/sapp-service"
import { IApplication, IProgram } from "./data/structs"
import { Program } from "./components/Program"
import { ApplicationsService } from "./data/ApplicationsService"
import { Application } from "./components/Application"


export const HomePage: React.FC<{}> = ({ }) => {
    const [programs, setPrograms] = useState<IProgram[]>([])
    const [applications, setApplications] = useState<IApplication[]>([])
    const authCtx = useContext(AuthCtx)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        loadPrograms()
        loadApplications()
    }

    const loadPrograms = async () => {
        setPrograms((await SappService.listInstances<IProgram>("sapp_applications", "program")).page)
    }

    const loadApplications = async () => {
        setApplications(await ApplicationsService.listMyApplications(authCtx!.user!.id))
    }

    const refresh = async (e: CustomEvent) => {
        await loadData()
        e.detail.complete()
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle color="primary">
                        <IonIcon icon={documentTextOutline} className="ion-align-self-center" />&nbsp;
                        {authCtx?.user?.username?.toLocaleUpperCase()}'s Applications
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonList className="">
                    <IonListHeader>
                        <IonLabel>My Applications</IonLabel>
                    </IonListHeader>
                    {
                        applications.map((application, index) => <Application key={index} application={application} />)
                    }
                </IonList>
                <IonList className="pb-100">
                    <IonListHeader>
                        <IonLabel>Open Programs</IonLabel>
                    </IonListHeader>
                    {
                        programs.map((program, index) => <Program key={index} program={program} />)
                    }
                </IonList>
            </IonContent>
        </>
    )
}