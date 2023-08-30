import { useEffect, useState } from "react"
import { IItem, getSortedItems } from "../../data/todos"
import axios from "axios"
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList,  IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react"
import { Item } from "./Items"
import { filterOutline, searchOutline } from "ionicons/icons"


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
        // Process Filters
        setItems(await getSortedItems(`?submit=Apply&${filterBy}=${filterValue}`))
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
                <form onSubmit={submitFilters}>
                    <IonItem>
                        <IonSelect label="Searched By" labelPlacement="floating" interface="popover" value={filterBy} onIonChange={(e) => setFilterBy(e.target.value)}>
                            {
                                filterByOptions.map((v) => <IonSelectOption key={v} value={v}>{fmtFilterBy(v)}</IonSelectOption>)
                            }
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonInput label={`ITEM ${fmtFilterBy(filterBy)}`} minlength={3} labelPlacement="floating"  onIonChange={(e) => setFilterValue(e.target.value)} />
                    </IonItem>
                    <IonItem className="item-lines-none">
                        <IonButton type="submit" expand="block" fill="clear" style={{width: "100%"}}>
                            <IonIcon icon={filterOutline} />&nbsp;Filter
                        </IonButton>
                    </IonItem>
                </form>
                <IonList>
                    {
                        items.map((item, index) => <Item onUpdate={submitFilters} key={index} item={item} />)
                    }
                </IonList>
            </IonContent>
        </>
    )
}