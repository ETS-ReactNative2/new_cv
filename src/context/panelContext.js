import React, { createContext, useContext, useReducer } from 'react'

export const initialState = {
    expand: false,
    expandDuration: 900,
    panelX: 0,
    panelY: 0,
    panelWidth: 0,
    panelHeight: 0,
    selectedName: '',
    currentIndex: -1,
    item: null
}

export const PanelContext = createContext()

export const PanelProvider = ({ reducer, children }) => (
    <PanelContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </PanelContext.Provider>
)

export const usePanelValues = () => useContext(PanelContext)