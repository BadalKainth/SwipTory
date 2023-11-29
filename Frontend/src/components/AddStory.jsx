import { useState } from 'react'
import classes from './AddStory.module.css'
import CloseIcon from '../assets/close-icon.svg'
import { addStory, editStory } from '../api/stories'
import { toast } from 'react-toastify'
import { mutate } from 'swr'
import PropTypes from 'prop-types'

const createInitialSlide = () => ({
  heading: '',
  description: '',
  image: '',
})

function AddStory({ onClose, initialStory }) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  const [selectedCategory, setSelectedCategory] = useState(
    initialStory ? initialStory.category : 'Food'
  )

  const [slides, setSlides] = useState(
    initialStory
      ? initialStory.slides
      : Array(3)
          .fill(0)
          .map(() => createInitialSlide())
  )

  const { heading, description, image } = slides[activeSlideIndex]

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

  function checkValid() {
    for (const slide of slides) {
      for (const value of Object.values(slide)) {
        if (!value) return false
      }
    }
    return true
  }

  async function handleAddStory() {
    try {
      const isValid = checkValid()

      if (!isValid) {
        return toast.error('Pleae fill all the fields', {
          position: 'bottom-center',
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'dark',
        })
      }

      if (initialStory) {
        await editStory(initialStory._id, {
          category: selectedCategory,
          slides,
        })
      } else {
        await addStory({
          category: selectedCategory,
          slides,
        })
      }

      onClose()
      mutate('/stories')
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
              value={selectedCategory}
              name="category"
              onChange={(e) => setSelectedCategory(e.target.value)}
              placeholder="Select category"
            >
              <option value="Food">Food</option>
              <option value="Health and Fitness">Health and fitness</option>
              <option value="Travel">Travel</option>
              <option value="Movies">Movies</option>
              <option value="Education">Education</option>
            </select>
          </div>
          <div className={classes.AddStoryButtonActions}>
            <div className={classes.AddStoryButtonGroup}>
              <button
                className={classes.PreviousSlideButton}
                onClick={() => {
                  if (activeSlideIndex > 0)
                    setActiveSlideIndex((idx) => idx - 1)
                }}
              >
                Previous
              </button>
              <button
                className={classes.NextSlideButton}
                onClick={() => {
                  if (activeSlideIndex < slides.length - 1)
                    setActiveSlideIndex((idx) => idx + 1)
                }}
              >
                Next
              </button>
            </div>
            <button
              className={classes.PostStoryButton}
              onClick={handleAddStory}
            >
              {initialStory ? 'Edit' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

AddStory.propTypes = {
  onClose: PropTypes.func.isRequired,
  initialStory: PropTypes.object,
}

export default AddStory
