import React from 'react'
import classes from './Bookmarks.module.css'
import NavBar from '../components/NavBar'
import image from '../assets/momos1.jpg'

function Bookmarks() {
  return (
    <>
      <NavBar />
      <div className={classes.BookmarkSection}>
        <h1 className={classes.Header}>Your Bookmarks</h1>
        <div className={classes.BookmarkedStories}>
          <div className={classes.StoryCard}>
            <div className={classes.info}>
              <span className={classes.cardTitle}>Heading</span>
              <span className={classes.cardDesc}>Description</span>
            </div>
            <img className={classes.cardImage} src={image} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}
export default Bookmarks
