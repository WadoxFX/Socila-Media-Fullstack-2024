'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useToggle } from '@/hooks/useToggle'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

import fileIcon from '/public/svg/file.svg'
import arrowIcon from '/public/svg/arrow.svg'
import checkMarkIcon from '/public/svg/checkMark.svg'

import style from '@/components/ui/accordion/accordion.module.scss'

const Accordion: React.FC<UIAccordion> = ({ accordionPages }) => {
  const [value, toggle] = useToggle(false)
  const path: string = usePathname()

  return (
    <div className={style.accordion_container}>
      <button data-cy="open_accordion" onClick={toggle}>
        <div className={style.accordion_title}>
          <Image src={fileIcon} width={24} height={24} alt="Select page" />
          <div>All pages</div>
        </div>
        <Image src={arrowIcon} width={24} height={24} alt="Arrow" />
      </button>
      <AnimatePresence>
        {!!value && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: 40 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0.62, 0.23, 0.98] }}
          >
            <ul>
              {accordionPages.map((item, id: number) => (
                <li key={id}>
                  <Link href={item.path} data-cy={item.title}>
                    <div className={style.accordion_category}>
                      <Image src={item.icon} width={24} height={24} alt={item.title} priority />

                      <div>{item.title}</div>
                    </div>
                    {path === item.path && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, scale: 0 }}
                        animate={{ opacity: 1, height: 'auto', y: 0, scale: 1 }}
                        exit={{ opacity: 0, height: 0, scale: 0 }}
                      >
                        <Image src={checkMarkIcon} width={24} height={24} alt="Check mark" />
                      </motion.div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Accordion
