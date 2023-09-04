export const datefyJSON = (date: string) => new Date(date)

export const fmtDateTime = (date: Date | string) => new Intl.DateTimeFormat("en-GB", {dateStyle: "medium", timeStyle: "short"}).format(new Date(date))
export const fmtDate = (date: Date | string) => new Intl.DateTimeFormat("en-GB", {dateStyle: "medium"}).format(new Date(date))
export const fmtDateJSON = (date: Date | string) => (new Date(date)).toJSON().slice(0, 10)