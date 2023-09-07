import React from "react";
import { IFieldError, IFormErrors } from "../data/structs/api";
import { IonItem, IonLabel } from "@ionic/react";
import "./FormErrors.scss"



export const FieldErrors: React.FC<{errors: IFieldError[]}> = ({errors}) => {
    return (
        <div className="field-errors-list">
            {
                errors.map((err, index) => (
                    <div key={index} className="field-error">
                        <b>{err.code.toUpperCase()}</b>&nbsp;{err.message}
                    </div>
                ))
            }
        </div>
    )
}

export const FormErrors: React.FC<{errors: IFormErrors}> = ({errors}) => {
    return (
        <div className="form-errors ion-padding">
            {Object.entries(errors).map(([field, fieldErrors], index) => (
                <div className="field-error" key={index}>
                    <h5>{field}</h5>
                    <FieldErrors key={index} errors={fieldErrors} />
                </div>
            ))}
        </div>
    )
}
