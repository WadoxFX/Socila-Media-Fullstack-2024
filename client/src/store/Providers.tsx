'use client'

import React from 'react'
import { store } from './store'
import { Provider } from 'react-redux'

const Providers: React.FC<Children> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

export default Providers
