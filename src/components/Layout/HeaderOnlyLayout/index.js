import React from 'react'
import Header from '../common/Header'

function HeaderOnlyLayout({children}) {
  return (
    <div>
        <Header/>
        <div className='container'>
            <div className='content'>{children}</div>
        </div>
    </div>
  )
}

export default HeaderOnlyLayout