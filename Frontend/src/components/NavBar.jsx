import React, { useState } from 'react'
import Modal from 'react-modal'
import classes from './NavBar.module.css'
import { useAuth } from '../hooks/auth'
import Register from './Register'
import { useApp } from '../hooks/app'
import AddStory from './AddStory'

// import Button from "./Button";

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '20px',
  },
}

function NavBar() {
  const { openLoginModal } = useApp()
  const { user } = useAuth()

  const [modalIsOpen, setIsOpen] = useState(false)
  const [addStoryModalIsOpen, setStoryModalIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openAddStoryModal() {
    setStoryModalIsOpen(true)
  }

  function closeAddStoryModal() {
    setStoryModalIsOpen(false)
  }

  return (
    <>
      <div className={classes.NavBar}>
        <h1 className={classes.title}>SwipTory</h1>
        {user ? (
          <div className={classes.loggedIn}>
            <div className={classes.buttonGroup}>
              <button className={`${classes.button} ${classes.bookmarkBtn}`}>
                Bookmarks
              </button>
              <button
                className={`${classes.button} ${classes.addStoryBtn}`}
                onClick={openAddStoryModal}
              >
                Add Story
              </button>
              <img
                className={classes.avatarIcon}
                src="https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"
                alt="profile-pic"
              />
              <img
                className={classes.menuIcon}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/2048px-Hamburger_icon.svg.png"
                alt=""
              />
            </div>
          </div>
        ) : (
          <div className={classes.buttonGroup}>
            <button
              className={`${classes.button} ${classes.registerBtn}`}
              onClick={openModal}
            >
              Register Now
            </button>
            <button
              className={`${classes.button} ${classes.signinBtn}`}
              onClick={openLoginModal}
            >
              Sign In
            </button>
          </div>
        )}
      </div>
      <Modal
        closeTimeoutMS={200}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <Register onClose={closeModal} />
      </Modal>
      <Modal
        closeTimeoutMS={200}
        isOpen={addStoryModalIsOpen}
        onRequestClose={closeAddStoryModal}
        style={customStyles}
      >
        <AddStory onClose={closeAddStoryModal} />
      </Modal>
    </>
  )
}
export default NavBar
