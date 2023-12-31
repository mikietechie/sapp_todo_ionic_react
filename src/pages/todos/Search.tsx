import { useEffect, useState } from "react"
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonList,  IonRow,  IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react"
import { Item } from "./Items"
import { filterOutline, searchOutline } from "ionicons/icons"
import { IItem } from "../../data/structs/todo"
import { TodoService } from "../../data/services/todo-service"


const filterByOptions = ["subject__icontains", "details__icontains"] as const
type TFilterByOptions = typeof filterByOptions[number]
const fmtFilterBy = (v: string) => v.split("__").at(0)?.toUpperCase()

export const SearchPage: React.FC<{}> = () => {
    const [items, setItems] = useState<IItem[]>([])
    const [filterBy, setFilterBy] = useState<TFilterByOptions>("subject__icontains")
    const [filterValue, setFilterValue] = useState<any>(null)

    useEffect(() => {
    }, [])

    const submitFilters = async (e: any = null) => {
        e?.preventDefault()
        setItems(await TodoService.getSortedItems(`?submit=Apply&${filterBy}=${filterValue}`))
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home"></IonBackButton>
                    </IonButtons>
                    <IonTitle>
                        <IonIcon icon={searchOutline} className="ion-align-self-center" />&nbsp;
                        Search
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <form onSubmit={submitFilters} className="ion-margin-bottom">
                    <IonGrid>
                        <IonRow>
                            <IonCol sizeMd="4" size="12">
                                <IonItem>
                                    <IonSelect label="Filter by" labelPlacement="floating" interface="popover" value={filterBy} onIonChange={(e) => setFilterBy(e.target.value)}>
                                        {
                                            filterByOptions.map((v) => <IonSelectOption key={v} value={v}>{fmtFilterBy(v)}</IonSelectOption>)
                                        }
                                    </IonSelect>
                                </IonItem>
                            </IonCol>
                            <IonCol sizeMd="8" size="12">
                                <IonItem>
                                    <IonInput label={`ITEM ${fmtFilterBy(filterBy)}`} required={true} minlength={3} labelPlacement="floating" onIonInput={(e) => setFilterValue(e.target.value)} />
                                </IonItem>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonItem className="item-lines-none">
                        <IonButton type="submit" expand="block" fill="clear" style={{width: "100%"}}>
                            <IonIcon icon={filterOutline} />&nbsp;Apply Filter
                        </IonButton>
                    </IonItem>
                </form>
                <IonList className="pb-100">
                    {
                        items.map((item, index) => <Item onUpdate={submitFilters} key={index} item={item} />)
                    }
                </IonList>
            </IonContent>
        </>
    )
}