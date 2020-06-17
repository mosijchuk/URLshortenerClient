export type LinkType = {
    _id: string
    from: string
    to: string
    code: string
    date: Date
    clicks: number
    owner: string
}

export type GlobalMessage = {
 text: string
 severity: 'success' | 'error'
}

export type Form = {
    [key: string]: string
}

export type LoginData = {
    token: string
    userId: string
}

export type RegisterData = {
    errors?: any
    message: string
}

export type LinkDetails = {

}