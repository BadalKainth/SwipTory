import React from 'react'
import StoryCard from './StoryCard'
import classes from './StoryList.module.css'

const StoryList = ({ stories, onStoryClick }) => {
  return (
    <div className={classes.CardContainer}>
      {stories.map((story) => {
        return (
          <div
            className={classes.storyCard}
            key={story._id}
            onClick={() => onStoryClick(story)}
          >
            <StoryCard story={story} />
          </div>
        )
      })}
    </div>
  )
}

export default StoryList
