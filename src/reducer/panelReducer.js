import React, { useReducer } from 'react'

export const EXPAND = 'EXPAND'
export const MINIMIZE = 'MINIMIZE'
export const EXPAND_DURATION = 'EXPAND_DURATION'
export const SET_X = 'SET_X'
export const SET_Y = 'SET_Y'
export const SET_WIDTH = 'SET_WIDTH'
export const SET_HEIGHT = 'SET_HEIGHT'
export const SET_NAME = 'SET_NAME'
export const SET_ITEM = 'SET_ITEM'
export const SET_INDEX = 'SET_INDEX'

export default (state, { type, payload }) => {
    switch (type) {
        case EXPAND:
            return { ...state, expand: true }

        case MINIMIZE:
            return { ...state, expand: false }

        case SET_X:
            return { ...state, panelX: payload }

        case SET_Y:
            return { ...state, panelY: payload }

        case SET_WIDTH:
            return { ...state, panelWidth: payload }

        case SET_HEIGHT:
            return { ...state, panelHeight: payload }

        case SET_NAME:
            return { ...state, selectedName: payload }

        case SET_ITEM:
            return { ...state, item: payload }

        case SET_INDEX:
            return { ...state, currentIndex: payload }
    
        default:
            return state
    }
}