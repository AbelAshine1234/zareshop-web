import React from 'react'
import styles from './Breadcrumbs.module.scss'

export default function Breadcrumbs() {
  return (
    <nav className={styles.breadcrumbs}>
      <a href="#">Home</a> &gt; <a href="#">Electronics</a> &gt; <a href="#">Phones</a> &gt; <span>Mobile phones</span>
    </nav>
  )
}
