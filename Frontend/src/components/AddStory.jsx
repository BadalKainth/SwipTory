import { useState } from 'react'
import classes from './AddStory.module.css'
import CloseIcon from '../assets/close-icon.svg'
import { groupBy } from '../utils/groupBy'
import { addStory } from '../api/stories'

const createInitialSlide = () => ({
  heading: '',
  description: '',
  image: '',
  category: '',
})

function AddStory({ onClose }) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  const [slides, setSlides] = useState(
    Array(3)
      .fill(0)
      .map(() => createInitialSlide())
  )

  const { heading, description, image, category } = slides[activeSlideIndex]

  function addSlide() {
    setSlides((slides) => [...slides, createInitialSlide()])
    setActiveSlideIndex(slides.length)
  }

  function removeSlide(idx) {
    if (idx <= activeSlideIndex) {
      setActiveSlideIndex(0)
    }

    setSlides((slides) => {
      const newSlides = [...slides]
      newSlides.splice(idx, 1)
      return newSlides
    })
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

  async function handleAddStory() {
    const storiesMap = groupBy(slides, (slide) => slide.category)
    const stories = Array.from(storiesMap.entries()).map(
      ([category, slides]) => ({
        category,
        slides,
      })
    )
    try {
      const promises = stories.map((story) => addStory(story))
      await Promise.all(promises)
      onClose()
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className={classes.AddFormWrapper}>
      <div className={classes.AddStoryForm}>
        <div className={classes.CloseFormButton}>
          <button className={classes.CloseButton} onClick={onClose}>
            <img src={CloseIcon} alt="" />
          </button>
        </div>
        <div className={classes.AddStoryButtonActions}>
          <div className={classes.AddStorySlides}>
            {slides.map((_, idx) => (
              <div
                key={idx}
                style={{
                  position: 'relative',
                }}
              >
                <button
                  style={{
                    ...(idx === activeSlideIndex && {
                      border: '2px solid RGB(115,171,	255)',
                    }),
                  }}
                  className={classes.AddStorySlide}
                  onClick={() => setActiveSlideIndex(idx)}
                >
                  Slide {idx + 1}
                </button>
                {idx > 2 && (
                  <button
                    className={classes.DeleteSlideButton}
                    onClick={() => removeSlide(idx)}
                  >
                    <img
                      style={{
                        height: 16,
                      }}
                      src={CloseIcon}
                      alt=""
                    />
                  </button>
                )}
              </div>
            ))}
            {slides.length !== 6 && (
              <button className={classes.AddStorySlide} onClick={addSlide}>
                Add+
              </button>
            )}
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
              placeholder="Your heading"
            />
          </div>
          <div className={classes.AddStoryItem}>
            <label className={classes.FormLabel}>Description:</label>
            <textarea
              className={classes.FormInputDescription}
              value={description}
              name="description"
              onChange={handleChange}
              placeholder="Story Description"
            />
          </div>
          <div className={classes.AddStoryItem}>
            <label className={classes.FormLabel}>Image:</label>
            <input
              type="text"
              className={classes.FormInput}
              value={image}
              name="image"
              onChange={handleChange}
              placeholder="Add Image url"
            />
          </div>
          <div className={classes.AddStoryItem}>
            <label htmlFor="category" className={classes.FormLabel}>
              Category:
            </label>
            <select
              id="category"
              className={classes.FormInput}
              value={category}
              name="category"
              onChange={handleChange}
              placeholder="Select category"
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
            <button
              className={classes.PostStoryButton}
              onClick={handleAddStory}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddStory
