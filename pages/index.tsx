/* eslint-disable @next/next/no-img-element */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { useState } from 'react'
import useKeypress from 'react-use-keypress'

const images = [
  '/images/1.jpeg',
  '/images/2.jpeg',
  '/images/3.jpeg',
  '/images/4.jpeg',
  '/images/5.jpeg',
  '/images/6.jpeg'
]

const collapsedAspectRatio = 1 / 3
const fullAspectRatio = 3 / 2
const margin = 12
const gap = 2

export default function Page() {
  const [index, setIndex] = useState(0)

  useKeypress('ArrowRight', () => {
    if (index < images.length - 1) setIndex(index + 1)
  })

  useKeypress('ArrowLeft', () => {
    if (index > 0) setIndex(index - 1)
  })

  return (
    <MotionConfig transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}>
      <div className="flex h-full min-h-screen flex-col items-center justify-center bg-black">
        <div className="max-w-4xl">
          <div className="relative mb-4 overflow-hidden">
            <motion.div
              animate={{ x: `-${index * 100}%` }}
              className="flex"
            >
              {images.map((image, i) => (
                <motion.img
                  key={image}
                  src={image}
                  className="aspect-[3/2] object-cover"
                  animate={{ opacity: i === index ? 1 : 0.3 }}
                  alt="image in carousel"
                />
              ))}
            </motion.div>
            <AnimatePresence initial={false}>
              {index > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: 'none' }}
                  whileHover={{ opacity: 1 }}
                  className="absolute left-3 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                  onClick={() => setIndex(index - 1)}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {index + 1 < images.length && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: 'none' }}
                  whileHover={{ opacity: 1 }}
                  className="absolute right-3 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                  onClick={() => setIndex(index + 1)}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          <div className="flex h-16 justify-center overflow-hidden">
            <motion.div
              initial={false}
              animate={{ x: `-${index * 100 * (collapsedAspectRatio / fullAspectRatio) + margin + index * gap}%` }}
              style={{ aspectRatio: fullAspectRatio, gap: `${gap}%` }}
              className="flex h-full"
            >
              {images.map((image, i) => (
                <motion.button
                  key={image}
                  initial={false}
                  onClick={() => setIndex(i)}
                  whileHover={{ opacity: 1 }}
                  animate={i === index ? 'active' : 'inActive'}
                  variants={{
                    active: {
                      aspectRatio: fullAspectRatio,
                      marginLeft: `${margin}%`,
                      marginRight: `${margin}%`,
                      opacity: 1
                    },
                    inActive: {
                      aspectRatio: collapsedAspectRatio,
                      marginLeft: 0,
                      marginRight: 0,
                      opacity: 0.5
                    }
                  }}
                  className="shrink-0"
                >
                  <img
                    src={image}
                    className="h-full object-cover"
                    alt="hej"
                  />
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}
