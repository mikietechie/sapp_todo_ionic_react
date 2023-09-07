import { FormEvent, useEffect, useRef, useState } from "react"
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonRouter } from "@ionic/react"
import { useParams } from "react-router"
import { pencilOutline, saveOutline } from "ionicons/icons"
import { SappService } from "../../data/services/sapp-service"
import { IPost } from "./data/structs"
import { IForm } from "../../data/structs/api"
import { Editor } from '@tinymce/tinymce-react';
import { TINYMCE_KEY } from "../../data/data/conf"
import { FormErrors } from "../../components/FormErrors"
import { FileInput } from "../../components/FileInput"


export const WritePage: React.FC<{}> = () => {
    const { postID } = useParams<{ postID: string }>()
    const router = useIonRouter()
    const [form, setForm] = useState<IForm | undefined>(undefined)
    const editorRef = useRef<any>();

    useEffect(() => {
        loadForm()
    }, [])

    const loadForm = async () => {
        setForm((await SappService.createEditInstance("sapp_blog", "post", null, Number(postID || 0))).form)
    }

    const submitForm = async (e: FormEvent) => {
        e.preventDefault()
        const formElement  = e.currentTarget! as HTMLFormElement
        const formData = new FormData(formElement)
        console.log([...formData.entries()]);
        const res = await SappService.createEditInstance("sapp_blog", "post", formData, Number(postID || 0))
        if (res.id) {
            router.push("/blog")
        } else if (res.form) {
            setForm(res.form)
        }
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={`/blog`}></IonBackButton>
                    </IonButtons>
                    <IonTitle>
                        <IonIcon icon={pencilOutline} className="ion-align-self-center" />&nbsp;
                        Write
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding pb-100">
                
                <form onSubmit={submitForm}>
                    <FormErrors errors={form?.errors || {}} />
                    <IonItem>
                        <IonInput name="title" label="*Title" labelPlacement="floating" value={form?.fields?.title?.value} required={true} minlength={2} maxlength={256}></IonInput>
                    </IonItem>
                    <IonItem lines="none" className="ion-margin-vertical">
                        <Editor
                            textareaName="body"
                            apiKey={TINYMCE_KEY}
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue={String(form?.fields?.body?.value || "")}
                            init={{
                                height: 500,
                                width: "100%",
                                menubar: false,
                                plugins: [
                                    //  'advlist autolink lists link image charmap print preview anchor',
                                    //  'searchreplace visualblocks code fullscreen',
                                    //  'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
                    </IonItem>
                    <IonItem>
                        <IonSelect name="category" label="*Category" labelPlacement="floating" interface="popover" value={form?.fields?.category?.value || ""}>
                            {(form?.fields?.category?.choices || []).map(([value, title], index) => <IonSelectOption key={index} value={value}>{title}</IonSelectOption>)}
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonInput name="keywords" label="Keywords" labelPlacement="floating" value={form?.fields?.keywords?.value} maxlength={256}></IonInput>
                    </IonItem>
                    <FileInput name="image" type="file" required={true} value={form?.fields?.image?.value} />
                    <IonItem lines="none">
                        <IonButtons slot="end">
                            <IonButton type="submit" fill="solid" expand="block" color="primary">
                                <IonIcon icon={saveOutline} slot="start"/>&nbsp;Save
                            </IonButton>
                        </IonButtons>
                    </IonItem>
                </form>
            </IonContent>
        </>
    )
}