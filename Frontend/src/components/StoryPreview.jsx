import { useState } from 'react'
import classes from './StoryPreview.module.css'
import SendIcon from '../assets/send-icon.svg'
import CloseWhiteIcon from '../assets/close-white-icon.svg'
import BookmarkIcon from '../assets/bookmark-icon.svg'
import LikeIcon from '../assets/like-icon.svg'
import LikeFilledIcon from '../assets/like-filled-icon.svg'
import BookmarkFilledIcon from '../assets/bookmark-filled-icon.svg'
import SlidesProgressBar from './SlidesProgressBar'
import { useEffect } from 'react'

function StoryPreview({ story, onClose }) {
  const [likeClicked, setLikeClicked] = useState(false)
  const [bookmarkClicked, setBookmarkClicked] = useState(false)

  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  const imageSrc = story.slides[activeSlideIndex].image
  const heading = story.slides[activeSlideIndex].heading
  const description = story.slides[activeSlideIndex].description

  function handleSlideIndexChange(idx) {
    setActiveSlideIndex(idx)
  }

  useEffect(() => {
    story.slides.forEach((slide) => {
      const img = new Image()
      img.src = slide.image
    })
  }, [])

  return (
    <div className={classes.StoryPreviewContainer}>
      <img
        className={classes.StoryPreviewImage}
        src={imageSrc}
        alt="foodStory"
      />
      <div>
        <SlidesProgressBar
          key={Date.now()}
          slidesCount={story.slides.length}
          slideIndex={activeSlideIndex}
          onSlideIndexChange={handleSlideIndexChange}
        />
        <div className={classes.StoryPreviewHeader}>
          <button className={classes.IconButton} onClick={onClose}>
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
          <button
            className={classes.IconButton}
            onClick={() => setBookmarkClicked((x) => !x)}
          >
            <img
              src={!bookmarkClicked ? BookmarkIcon : BookmarkFilledIcon}
              alt="BookmarkIcon"
            />
          </button>
          <button
            className={classes.IconButton}
            onClick={() => setLikeClicked((x) => !x)}
          >
            <img
              src={!likeClicked ? LikeIcon : LikeFilledIcon}
              alt="LikeIcon"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default StoryPreview
