import React, { useEffect, useState } from 'react'

import classes from './index.module.scss' // Import the styles

const contentData = [
  {
    title: 'Experience Adventure In Africa',
    description:
      'Have the best experience in the African game parks reserves. Get to experience the best tours.',
    buttonText: 'Explore Tours',
    buttonLink: '#',
  },
  {
    title: 'Discover The Wildlife',
    description: 'Join us for a journey into the wild. Witness the beauty of nature.',
    buttonText: 'Join Now',
    buttonLink: '#',
  },
  // Add more content objects as needed
]

const ContentSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % contentData.length)
    }, 10000) // Change content every 10 seconds

    return () => clearInterval(interval) // Clear interval on component unmount
  }, [])

  const currentContent = contentData[currentIndex]

  return (
    <div className={classes.contentSlider}>
      <div className={classes.backgroundImage}>
        <div className={classes.content}>
          <span className={`${classes.title} ${classes.animate__animated}`}>
            {currentContent.title}
          </span>
          <p className={classes.animate__animated}>{currentContent.description}</p>
          <button className={classes.animate__animated}>
            <a href={currentContent.buttonLink} className={`${classes.btn}`}>
              {currentContent.buttonText}
            </a>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContentSlider
