// 'use client'
// import React, { useEffect, useState } from 'react'
// import Image from 'next/image'

// import classes from './index.module.scss'

// const Promotion = ({ promoImage }: { promoImage: string }) => {
//   const [time, setTime] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   })

//   const targetDate = new Date()
//   targetDate.setDate(targetDate.getDate() + 3) //contol this value to change number of dayss

//   useEffect(() => {
//     const timerInterval = setInterval(() => {
//       const currentTime = new Date()
//       const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0)

//       const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
//       const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
//       const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
//       const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

//       setTime({ days, hours, minutes, seconds })

//       if (timeDifference === 0) {
//         clearInterval(timerInterval)
//         // You can add code here to handle what happens when the target date is reached.
//       }
//     }, 1000)

//     return () => {
//       clearInterval(timerInterval) // Cleanup the interval when the component unmounts.
//     }
//   }, [])

//   return (
//     <section className={classes.promotion}>
//       <div className={classes.textBox}>
//         <h3 className={classes.title}>Deals of the Month</h3>
//         <p>
//           Get ready for a shopping experience like never before with our Deals of the Month! Every
//           purchase comes with exclusive perks and offers, making this month a celebration of savvy
//           choices and amazing deals. Don't miss out! 🎁🛒
//         </p>

//         <ul className={classes.stats}>
//           <StatBox label="Days" value={time.days} />
//           <StatBox label="Hours" value={time.hours} />
//           <StatBox label="Minutes" value={time.minutes} />
//           <StatBox label="Seconds" value={time.seconds} />
//         </ul>
//       </div>
//       <Image
//         src={
//           'https://ik.imagekit.io/6cga8hi9z/All_Products/image-removebg-preview_-_2024-03-14T161137.352_0ktoe8xjJ.png?updatedAt=1710421961054'
//         }
//         alt="promotions-image"
//         priority={true}
//         width={500}
//         height={500}
//         className={classes.image}
//       />
//     </section>
//   )
// }

// const StatBox = ({ label, value }: { label: string; value: number }) => (
//   <li className={classes.statBox}>
//     <h4>{value}</h4>
//     <p>{label}</p>
//   </li>
// )

// export default Promotion
