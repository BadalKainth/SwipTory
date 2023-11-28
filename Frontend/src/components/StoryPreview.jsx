import React, { useState } from 'react'
import classes from './StoryPreview.module.css'
import SendIcon from '../assets/send-icon.svg'
import CloseWhiteIcon from '../assets/close-white-icon.svg'
import BookmarkIcon from '../assets/bookmark-icon.svg'
import LikeIcon from '../assets/like-icon.svg'
import LikeFilledIcon from '../assets/like-filled-icon.svg'
import BookmarkFilledIcon from '../assets/bookmark-filled-icon.svg'
import SlidesProgressBar from './SlidesProgressBar'

function StoryPreview({ story }) {
  const imageSrc = story.slides[0].image
  const heading = story.slides[0].heading
  const description = story.slides[0].description

  const slidesCount = story.slides.length

  console.log(slidesCount)

  const [likeClicked, setLikeClicked] = useState(false)

  return (
    <div className={classes.StoryPreviewContainer}>
      <img
        className={classes.StoryPreviewImage}
        src={imageSrc}
        alt="foodStory"
      />
      <div>
        <SlidesProgressBar />
        <div className={classes.StoryPreviewHeader}>
          <button className={classes.IconButton}>
            <img src={CloseWhiteIcon} alt="" />
          </button>
          <button className={classes.IconButton}>
            <img src={SendIcon} alt="" />
          </button>
        </div>
      </div>
      <div>
        <div className={classes.StoryPreviewContent}>
          <p
            style={{
              fontSize: '28px',
              fontWeight: 700,
            }}
          >
            {heading}
          </p>
          <p>{description}</p>
        </div>
        <div className={classes.StoryPreviewActions}>
          <button className={classes.IconButton}>
            <img src={BookmarkIcon} alt="" />
          </button>
          <button
            className={classes.IconButton}
            onClick={() => setLikeClicked((x) => !x)}
          >
            <img src={!likeClicked ? LikeIcon : LikeFilledIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default StoryPreview
