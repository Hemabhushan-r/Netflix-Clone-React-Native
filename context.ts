import React from 'react'

export type AppContextType={ signIn: () => Promise<void>; signOut: () => Promise<void>; signUp: () => Promise<void>; };

export const AppContext=React.createContext<AppContextType>({signIn:async ()=>{},signOut:async ()=>{},signUp:async ()=>{}});