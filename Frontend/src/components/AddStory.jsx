import React, { useState } from 'react'
import classes from './AddStory.module.css'
import CloseIcon from '../assets/close-icon.svg'

const createInitialSlide = () => ({
  id: Date.now(),
  heading: '',
  description: '',
  image: '',
  category: '',
})

function AddStory() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  const [slides, setSlides] = useState(
    Array(3)
      .fill(0)
      .map(() => createInitialSlide())
  )

  const { id, heading, description, image, category } = slides[activeSlideIndex]

  function addSlide() {
    setSlides((slides) => [...slides, createInitialSlide()])
  }

  function removeSlide(id) {
    setSlides((slides) => slides.filter((slide) => slide.id !== id))
  }

  function handleChange(e) {
    const name = e.target.name
    const value = e.target.value

    const newSlide = { ...slides[activeSlideIndex] }
    newSlide[name] = value

    const newSlides = [...slides]
    newSlides[activeSlideIndex] = newSlide
    setSlides(newSlides)
  }

  return (
    <div className={classes.AddFormWrapper}>
      <div className={classes.AddStoryForm}>
        <div className={classes.CloseFormButton}>
          <button className={classes.CloseButton}>
            <img src={CloseIcon} alt="" />
          </button>
        </div>
        <div className={classes.AddStoryButtonActions}>
          <div className={classes.AddStorySlides}>
            {slides.map((_, idx) => (
              <button
                style={{
                  ...(idx === activeSlideIndex && {
                    backgroundColor: 'gray',
                    color: 'white',
                  }),
                }}
                className={classes.AddStorySlide}
              >
                Slide {idx + 1}
              </button>
            ))}
            <button className={classes.AddStorySlide} onChange={addSlide}>
              Add+
            </button>
          </div>
        </div>
        <div className={classes.AddStoryContent}>
          <div className={classes.AddStoryItem}>
            <label className={classes.FormLabel}>Heading:</label>
            <input
              type="text"
              className={classes.FormInput}
              value={heading}
              name="heading"
              onChange={handleChange}
            />
          </div>
          <div className={classes.AddStoryItem}>
            <label className={classes.FormLabel}>Description:</label>
            <textarea
              className={classes.FormInputDescription}
              name="description"
              onChange={handleChange}
            />
          </div>
          <div className={classes.AddStoryItem}>
            <label className={classes.FormLabel}>Image:</label>
            <input
              type="text"
              className={classes.FormInput}
              name="image"
              onChange={handleChange}
            />
          </div>
          <div className={classes.AddStoryItem}>
            <label htmlFor="category" className={classes.FormLabel}>
              Category:
            </label>
            <select
              id="category"
              className={classes.FormInput}
              name="category"
              onChange={handleChange}
            >
              <option value="Food">Food</option>
              <option value="health and fitness">Health and fitness</option>
              <option value="travel">Travel</option>
              <option value="movies">Movies</option>
              <option value="education">Education</option>
            </select>
          </div>
          <div className={classes.AddStoryButtonActions}>
            <div className={classes.AddStoryButtonGroup}>
              <button className={classes.PreviousSlideButton}>Previous</button>
              <button className={classes.NextSlideButton}>Next</button>
            </div>
            <button className={classes.PostStoryButton}>Post</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddStory
