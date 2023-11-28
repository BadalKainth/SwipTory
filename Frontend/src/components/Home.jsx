import classes from './Home.module.css'
import NavBar from './NavBar'
import FList from './FilterList'
import { filtersList } from '../utils/filters-list'
import SList from './StoryList'
import useSWR from 'swr'
import { getStories } from '../api/stories'
import StoryPreview from './StoryPreview'
import { useCallback, useState } from 'react'
import Modal from 'react-modal'

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
        <SList stories={data} onStoryClick={onStoryClick} />
        <Modal
          closeTimeoutMS={200}
          isOpen={!!activeStory}
          onRequestClose={() => setActiveStory(undefined)}
          style={customStyles}
        >
          {activeStory && <StoryPreview story={activeStory} />}
        </Modal>
      </main>
    </>
  )
}

export default Home
