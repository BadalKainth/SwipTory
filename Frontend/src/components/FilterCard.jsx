import classes from './FilterCard.module.css'

const FilterCard = ({ filter, currentFilter }) => {
  const { id, name, image } = filter
  return (
    <div
      key={id}
      className={classes.card}
      style={{
        borderColor: name === currentFilter ? '#00acd2' : 'white',
      }}
    >
      <span className={classes.cardTitle}>{name}</span>
      <img className={classes.cardImage} src={image} alt="" />
    </div>
  )
}

export default FilterCard
