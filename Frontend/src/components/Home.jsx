import NavBar from './NavBar'
import FList from './FilterList'
import { filtersList } from '../utils/filters-list'
import SList from './StoryList'
import useSWR from 'swr'
import { getStories } from '../api/stories'
import StoryPreview from './StoryPreview'
import { useCallback, useState } from 'react'
import Modal from 'react-modal'
import classes from './Home.module.css'

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
    padding: 0,
    border: 'none',
    borderRadius: '0px',
  },
}

function Home() {
  const { data, error, isLoading } = useSWR('/stories', getStories)

  const [activeStory, setActiveStory] = useState(undefined)

  const onStoryClick = useCallback((story) => {
    setActiveStory(story)
  }, [])

  if (isLoading) return <>Loading.....</>

  if (error) return <>Error occured</>

  return (
    <>
      <NavBar></NavBar>
      <main
        style={{
          padding: '2rem 3rem',
        }}
      >
        <FList filters={filtersList} />
        <div className={classes.HomeSection}>
          <h1 className={classes.Title}>Your Stories</h1>
          <div className={classes.StorySection}>
            <SList stories={data} onStoryClick={onStoryClick} />
          </div>
        </div>
        <div className={classes.HomeSection}>
          <h1 className={classes.Title}>Top Stories about Food!</h1>
          <div className={classes.StorySection}>
            <SList stories={data} onStoryClick={onStoryClick} />
          </div>
        </div>
        <div className={classes.HomeSection}>
          <h1 className={classes.Title}>
            Top Stories about Health and Fitness!
          </h1>
          <div className={classes.StorySection}>
            <SList stories={data} onStoryClick={onStoryClick} />
          </div>
        </div>
        <div className={classes.HomeSection}>
          <h1 className={classes.Title}>Top Stories about Travel!</h1>
          <div className={classes.StorySection}>
            <SList stories={data} onStoryClick={onStoryClick} />
          </div>
        </div>
        <div className={classes.HomeSection}>
          <h1 className={classes.Title}>Top Stories about Movies !</h1>
          <div className={classes.StorySection}>
            <SList stories={data} onStoryClick={onStoryClick} />
          </div>
        </div>
        <div className={classes.HomeSection}>
          <h1 className={classes.Title}>Top Stories about Education!</h1>
          <div className={classes.StorySection}>
            <SList stories={data} onStoryClick={onStoryClick} />
          </div>
        </div>
        <Modal
          closeTimeoutMS={200}
          isOpen={!!activeStory}
          onRequestClose={() => setActiveStory(undefined)}
          style={customStyles}
        >
          {activeStory && (
            <StoryPreview
              story={activeStory}
              onClose={() => setActiveStory(undefined)}
            />
          )}
        </Modal>
      </main>
    </>
  )
}

export default Home
