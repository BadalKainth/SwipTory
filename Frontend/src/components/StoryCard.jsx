import React from 'react'
import classes from './StoryCard.module.css'
import { useApp } from '../hooks/app'
import { useAuth } from '../hooks/auth'

const StoryCard = ({ story }) => {
  const { openLoginModal } = useApp()
  const { user } = useAuth()

  const { id, slides } = story

  const { heading, description, image } = slides[0]

  return (
    <div
      key={id}
      className={classes.card}
      onClick={() => {
        if (!user) {
          openLoginModal()
        }
      }}
    >
      <div className={classes.info}>
        <span className={classes.cardTitle}>{heading}</span>
        <span className={classes.cardDesc}>{description}</span>
      </div>

      <img className={classes.cardImage} src={image} alt="" />
    </div>
  )
}

export default StoryCard
