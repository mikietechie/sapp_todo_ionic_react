import React, { useRef, useState } from "react";

import "./FileInput.scss"
import { IonCheckbox, IonChip, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { cloudUploadOutline } from "ionicons/icons";

export interface FileInputProps {
    name: string
    onChange?: (ev: any) => any
    type: "image" | "file"
    required: boolean
    value: string | null | undefined | number
}

export const FileInput: React.FC<FileInputProps> = ({name, onChange, type, required, value}) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    // let setValue
    // [value, setValue] = useState<any>(value)

    return (
        <IonItem className="file-input-item">
            <input ref={inputRef} type={type} className="file-input d-none" name={name} onChange={onChange} />
            {
                value ? <IonCheckbox name={`${name}-clear`} defaultChecked={false} /> : ''
            }
            <IonChip slot="start" onClick={(e) => {inputRef.current?.click()}}>
                <IonIcon icon={cloudUploadOutline} />
                <IonLabel>{required ? "*" : ""} Select File</IonLabel>
            </IonChip>
            <IonLabel>{value ? (`Clear ${value}`) : '............................'}</IonLabel>
        </IonItem>
    )
}
