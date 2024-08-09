'use client'

import React, { useEffect, useState } from 'react'
import Carousel from 'react-grid-carousel'
import Link from 'next/link'
import styled from 'styled-components'

import { Page, Product } from '../../../payload/payload-types'

import classes from './index.module.scss'

type FlashDealsBlock = Extract<Page['layout'][number], { blockType: 'flash-sales' }>

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 0 0 10px 0;
`

const RowWrapper = styled.div`
  max-width: 100%;
  margin: 0px auto;
  border-radius: 8px;
  background: wheat;

  @media screen and (max-width: 767px) {
    margin: 10px;
  }
`

const Row = styled.div`
  max-width: 100%;
  margin: 0 auto;
`

const ArrowBtn = styled.span`
  display: inline-block;
  position: absolute;
  top: 50%;
  right: ${({ type }) => (type === 'right' ? '-40px' : 'unset')};
  left: ${({ type }) => (type === 'left' ? '-40px' : 'unset')};
  width: 45px;
  height: 45px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.15);
  cursor: pointer;

  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: ${({ type }) =>
      type === 'right'
        ? 'translate(-75%, -50%) rotate(45deg)'
        : 'translate(-25%, -50%) rotate(-135deg)'};
    width: 10px;
    height: 10px;
    border-top: 2px solid #666;
    border-right: 2px solid #666;
  }

  &:hover::after {
    border-color: #333;
  }
`

const CardContainer = styled.div`
  margin: 4px 0;
  border-radius: 6px;
  border: 1px solid #eaeaea;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.25s;
  max-width: 180px;
  min-width: 180px;
  min-height: 250px;
  max-height: 250px;
  @media screen and (max-width: 767px) {
    margin: 10px;
    max-height: 260px;
    min-height: 150px;
    max-width: 160px;
    min-width: 160px;
  }

  :hover {
    box-shadow: 0 0 2px 0 #00000063;
  }
`

const Img = styled.div`
  height: 160px;
  margin-bottom: 4px;
  background-image: ${({ $img }) => `url(${$img})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const Title = styled.div`
  margin: 0 5px 5px;
  font-size: 15px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Star = styled.div`
  float: left;
  margin: 10px;
  color: #26bec9;
  font-size: 15px;
`

const Price = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #999;
  float: right;
  margin: 10px;

  span {
    font-size: 15px;
    color: #26bec9;
  }
`

const RowHead = styled.div`
  padding: 10px;
  background-color: ${({ background }) => `${background}`};
  color: ${({ color }) => color};
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`

const ProgressBar = styled.div`
  position: relative;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin: 5px 0;

  & > div {
    position: absolute;
    height: 100%;
    width: ${({ $percentage }) => `${$percentage}%`};
    background-color: #76c7c0;
  }
`

const FlashDealsArchive: React.FC<FlashDealsBlock & { className?: string }> = props => {
  const { Heading, BackgroundColor, TextColor, selectedDocs, className } = props

  const [timeRemaining, setTimeRemaining] = useState('')

  useEffect(() => {
    const fetchFlashSaleTimes = async () => {
      // Replace this with actual fetch from your database
      const startTime = new Date('2024-06-17T12:00:00Z')
      const endTime = new Date('2024-06-17T18:00:00Z')

      const updateRemainingTime = () => {
        const now = new Date()
        const timeDiff = endTime.getTime() - now.getTime()
        if (timeDiff > 0) {
          const hours = Math.floor(timeDiff / (1000 * 60 * 60))
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
          setTimeRemaining(`${hours}H:${minutes}M:${seconds}S`)
        } else {
          setTimeRemaining('Sale Ended')
          //TODO: After time ended hide the block
        }
      }

      updateRemainingTime()
      const interval = setInterval(updateRemainingTime, 1000)

      return () => clearInterval(interval)
    }

    fetchFlashSaleTimes()
  }, [])

  // Type guard function to check if a doc is a Product
  function isProduct(doc: any): doc is Product {
    return typeof doc === 'object' && 'id' in doc
  }

  // Filter out invalid docs using the type guard
  const validDocs = selectedDocs?.filter(isProduct) || []
  return (
    <RowWrapper>
      <Container>
        <RowHead background={BackgroundColor} color={TextColor}>
          <div
            className={`${classes.headerContainer} ${className}`}
            style={{ backgroundColor: BackgroundColor, color: TextColor }}
          >
            <div>{Heading}</div>
            <div>
              <span>
                {' '}
                Time Left: <span className={classes.Bold}>{timeRemaining}</span>
              </span>
            </div>
            <div className={classes.seeAll}>
              <div>See All </div>
              <div>
                <span className={classes.arrow}>&#8594;</span>
              </div>
            </div>
          </div>
        </RowHead>
        <Row>
          <Carousel
            cols={5}
            rows={1}
            gap={10}
            loop
            showDots
            responsiveLayout={[
              {
                breakpoint: 1920,
                cols: 8,
              },
              {
                breakpoint: 1500,
                cols: 5,
                loop: true,
              },
              {
                breakpoint: 990,
                cols: 3,
              },
              {
                breakpoint: 670,
                cols: 2,
              },
              {
                breakpoint: 400,
                cols: 2,
              },
            ]}
            mobileBreakpoint={400}
            arrowRight={<ArrowBtn type="right" />}
            arrowLeft={<ArrowBtn type="left" />}
          >
            {validDocs.map((product, index) => {
              // Demo data for units left
              const totalUnits = 100
              const unitsLeft = Math.floor(Math.random() * totalUnits)
              const percentageLeft = (unitsLeft / totalUnits) * 100

              return (
                <Carousel.Item key={index}>
                  <Link href={`/products/${product.slug}`} passHref>
                    <CardContainer>
                      <Img $img={product?.meta?.image?.imagekit.url} />
                      <Title>{product.title}</Title>
                      <Price>
                        USD <span>{product.price}</span>
                      </Price>
                      <ProgressBar $percentage={percentageLeft}>
                        <div />
                      </ProgressBar>
                      <div style={{ textAlign: 'center', fontSize: '12px' }}>
                        {unitsLeft} units left
                      </div>
                    </CardContainer>
                  </Link>
                </Carousel.Item>
              )
            })}
          </Carousel>
        </Row>
      </Container>
    </RowWrapper>
  )
}

export default FlashDealsArchive
