import React from 'react'
import FilterCard from './FilterCard'
import classes from './FilterList.module.css'

const FilterList = ({ filters }) => {
  return (
    <div className={classes.CardContainer}>
      {filters.map((filter) => {
        return (
          <div className="item" key={filter.id}>
            <FilterCard filter={filter} />
          </div>
        )
      })}
    </div>
  )
}

export default FilterList
