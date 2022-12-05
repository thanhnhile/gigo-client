import React, { useEffect, useState } from 'react'
import className from 'classnames/bind'
import styles from './Menu.module.scss'

const cx = className.bind(styles)

const Menu = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    const getMenu = () => {
      const response = [
        {
          id: 1,
          name: 'Tra sua',
        },
        {
          id: 2,
          name: 'Tra trai cay',
        },
        {
          id: 3,
          name: 'Ca phe',
        },
      ]
      setMenu(response)
    }
    getMenu()
  }, [])
  return (
    <div className={cx('wrapper', 'container')}>
      <ul className={cx('list-categories')}>
        {menu &&
          menu.map((menuItem) => <li key={menuItem.id}>{menuItem.name}</li>)}
      </ul>
      <div className={cx('list-products')}></div>
    </div>
  )
}

export default Menu
