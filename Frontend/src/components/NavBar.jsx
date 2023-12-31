import { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import classes from './NavBar.module.css'
import { useAuth } from '../hooks/auth'
import Register from './Register'
import { useApp } from '../hooks/app'
import AddStory from './AddStory'
import ClickOutside from './ClickOutside'
import { useEvent } from '../hooks/event'

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

function NavBar({ onRefresh }) {
  const { openLoginModal } = useApp()
  const { user, setUser } = useAuth()

  const [initialStory, setInitialStory] = useState(undefined)

  const [modalIsOpen, setIsOpen] = useState(false)
  const [popupIsOpen, setPoupIsOpen] = useState(false)
  const [addStoryModalIsOpen, setStoryModalIsOpen] = useState(false)

  useEvent('editStory', (story) => {
    setInitialStory(story)
    setStoryModalIsOpen(true)
  })

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openAddStoryModal() {
    setStoryModalIsOpen(true)
    setPoupIsOpen(false)
  }

  function closeAddStoryModal() {
    setStoryModalIsOpen(false)
    setInitialStory(undefined)
    onRefresh()
  }

  function handleSignout() {
    setPoupIsOpen(false)
    setUser(null)
    localStorage.clear()
  }

  return (
    <>
      <div className={classes.NavBar}>
        <Link to="/">
          <h1 className={classes.title}>SwipTory</h1>
        </Link>

        {user ? (
          <div className={classes.loggedIn}>
            <div className={classes.buttonGroup}>
              <Link to="/bookmarks">
                <button
                  className={`${classes.button} ${classes.bookmarkBtn} ${classes.isDekstop}`}
                >
                  Bookmarks
                </button>
              </Link>
              <button
                className={`${classes.button} ${classes.addStoryBtn} ${classes.isDekstop}`}
                onClick={openAddStoryModal}
              >
                Add Story
              </button>
              <img
                className={classes.avatarIcon}
                src="https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"
                alt="profile-pic"
              />
              <div style={{ position: 'relative' }}>
                <button
                  className={classes.IconButton}
                  onClick={() => setPoupIsOpen((x) => !x)}
                >
                  <img
                    className={classes.menuIcon}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/2048px-Hamburger_icon.svg.png"
                    alt=""
                  />
                </button>
                {popupIsOpen && (
                  <ClickOutside onClickOutside={() => setPoupIsOpen(false)}>
                    <div className={classes.buttonPopup}>
                      <p
                        style={{
                          fontSize: '20px',
                          fontWeight: 700,
                        }}
                      >
                        {user.username}
                      </p>
                      <Link to="/bookmarks">
                        <button
                          className={`${classes.button} ${classes.bookmarkBtn} ${classes.isMobile}`}
                        >
                          Bookmarks
                        </button>
                      </Link>
                      <button
                        className={`${classes.button} ${classes.addStoryBtn} ${classes.isMobile}`}
                        onClick={openAddStoryModal}
                      >
                        Add Story
                      </button>
                      <button
                        className={classes.SignoutButton}
                        onClick={handleSignout}
                      >
                        Sign out
                      </button>
                    </div>
                  </ClickOutside>
                )}
              </div>
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
        <AddStory onClose={closeAddStoryModal} initialStory={initialStory} />
      </Modal>
    </>
  )
}
export default NavBar
