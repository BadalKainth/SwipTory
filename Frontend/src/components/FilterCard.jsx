import React from 'react'
import classes from './FilterCard.module.css'

const FilterCard = ({ filter }) => {
  const { id, name, image } = filter
  return (
    <div key={id} className={classes.card}>
      <span className={classes.cardTitle}>{name}</span>
      <img className={classes.cardImage} src={image} alt="" />
    </div>
  )
}

export default FilterCard
