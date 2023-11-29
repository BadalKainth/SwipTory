import { useRef, forwardRef } from 'react'
import './SlidesProgressBar.scoped.css'
import { useEffect } from 'react'

const ProgessBar = forwardRef(function ProgessBar(_, ref) {
  return (
    <div className="outer">
      <div className="inner" ref={ref}></div>
    </div>
  )
})

export default function SlidesProgressBar({
  slidesCount = 3,
  slideIndex = 0,
  onSlideIndexChange,
}) {
  // const [slidesProgress, setSlidesProgress] = useState(0)

  const eleRef = useRef([])

  useEffect(() => {
    async function updateProgress() {
      setTimeout(() => {
        if (slideIndex < slidesCount - 1) {
          onSlideIndexChange(slideIndex + 1)
        }
      }, 4700)

      for (let i = 0; i < slideIndex; i++) {
        eleRef.current[i].style.animationDuration = '0s'
        eleRef.current[i].style.animationPlayState = 'running'
      }

      eleRef.current[slideIndex].style.animationPlayState = 'running'
    }
    updateProgress()
  }, [slidesCount, onSlideIndexChange, slideIndex])

  return (
    <div className="container">
      {Array(slidesCount)
        .fill(0)
        .map((_, i) => (
          <ProgessBar key={i} ref={(el) => (eleRef.current[i] = el)} />
        ))}
    </div>
  )
}
