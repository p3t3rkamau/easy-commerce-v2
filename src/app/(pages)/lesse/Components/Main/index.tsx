'use client'
import type { NextPage } from 'next'

import Button from '../Button'
import DreamHome from '../DreamHome/index'
import Invitation from '../Invitation/index'
import Statistics from '../Stats/index'
import MatchesWorldwide from '../worldwide/index'

const Main: NextPage = () => {
  return (
    <div>
      <div className="w-full relative flex flex-col items-start justify-start gap-[119px] leading-[normal] tracking-[normal] text-center text-153xl text-black font-montserrat mq1150:gap-[59px] mq450:gap-[30px]">
        <section className="self-stretch flex flex-col items-end justify-start pt-[55px] pb-[59.5px] pr-1.5 pl-0.5 box-border relative gap-[21px] min-h-[1191px] max-w-full text-center text-27xl text-white font-montserrat mq800:pt-[23px] mq800:pb-[25px] mq800:box-border mq1350:pt-9 mq1350:pb-[39px] mq1350:box-border">
          <h2 className="!m-[0] h-[62.4px] absolute top-[495.97px] left-[75.41px] text-inherit leading-[165.4%] font-extrabold font-inherit inline-block [transform:_rotate(-175deg)] [transform-origin:0_0] mq800:text-18xl mq800:leading-[61px] mq450:text-9xl mq450:leading-[46px]">
            .
          </h2>
          <div className="w-full h-[calc(100%_-_44px)] absolute !m-[0] top-[0px] right-[0px] bottom-[44px] left-[0px] z-[2]" />
          <div className="w-[1117px] flex flex-row items-start justify-end py-0 px-[38px] box-border max-w-full text-right text-28xl text-black">
            <div className="flex-1 flex flex-col items-end justify-start gap-[457.1px] max-w-full mq800:gap-[114px] mq1150:gap-[229px] mq450:gap-[57px]">
              <div className="w-[191px] flex flex-row items-start justify-start relative">
                <div className="h-48 w-[1728px] absolute !m-[0] bottom-[-69.1px] left-[-1492px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] bg-gray-200" />
                <div className="p-4">
                  <Button onClick={() => console.log('Button clicked!')}>Sign In</Button>
                </div>
              </div>
              <h2 className="m-0 self-stretch relative text-inherit leading-[146.4%] font-extrabold font-inherit z-[3] mq800:text-19xl mq800:leading-[55px] mq450:text-9xl mq450:leading-[41px]">
                <p className="m-0">{`Many Moons ago we used to `}</p>
                <p className="m-0">{`go around on foot in search of habitats `}</p>
                <p className="m-0">Property owners kept huge record books</p>
                <p className="m-0">{`& hanged posters all over.`}</p>
              </h2>
            </div>
          </div>
          <div className="self-stretch h-[213.5px] relative max-w-full shrink-0 z-[3] flex items-center justify-center">
            <img
              className="self-stretch h-full overflow-hidden shrink-0 z-[3] object-contain absolute left-[0px] top-[5px] w-full [transform:scale(1.064)]"
              loading="lazy"
              alt=""
              src="/vector-12.svg"
            />
          </div>
        </section>
        <div className="self-stretch flex flex-row items-start justify-end pt-0 px-11 pb-[26px] box-border max-w-full mq1150:pl-[22px] mq1150:pr-[22px] mq1150:box-border">
          <h1 className="m-0 h-0 w-[1627px] relative text-inherit leading-[0%] font-black font-inherit inline-block shrink-0 max-w-full mq800:text-50xl mq450:text-24xl">
            <p className="m-0">{`Welcome `}</p>
          </h1>
        </div>
        <div className="self-stretch flex flex-row items-start justify-end pt-0 px-11 pb-[39px] box-border max-w-full mq1150:pl-[22px] mq1150:pr-[22px] mq1150:box-border">
          <h1 className="m-0 h-0 w-[1627px] relative text-inherit leading-[0%] font-black font-inherit inline-block shrink-0 max-w-full mq800:text-50xl mq450:text-24xl">
            <p className="m-0">
              <span>
                {`the `}
                <span className="[text-decoration:underline]">Future</span>
              </span>
              <span className="text-deeppink-200">{` `}</span>
              <span className="text-black">of</span>
            </p>
          </h1>
        </div>
        <section className="self-stretch flex flex-row items-start justify-end pt-0 px-11 pb-[133px] box-border max-w-full text-center text-153xl font-montserrat mq1150:pl-[22px] mq1150:pr-[22px] mq1150:box-border">
          <h1 className="m-0 h-0 w-[1627px] relative text-inherit leading-[0%] font-black font-inherit inline-block shrink-0 max-w-full mq800:text-50xl mq450:text-24xl">
            <p className="m-0">
              <span className="text-black">
                <span className="[text-decoration:underline]">Property</span>
              </span>
              <span className="text-black">{` `}</span>
              <span className="text-deeppink-200">Rental.</span>
            </p>
          </h1>
        </section>
        <section className="w-[1686px] flex flex-row items-start justify-start pt-0 px-[43px] pb-[103px] box-border max-w-full text-center text-28xl text-black font-montserrat mq800:pb-[67px] mq800:box-border mq1350:pl-[21px] mq1350:pr-[21px] mq1350:box-border">
          <h2 className="m-0 flex-1 relative text-inherit leading-[165.4%] inline-block max-w-full font-inherit mq800:text-19xl mq800:leading-[62px] mq450:text-9xl mq450:leading-[47px]">
            <span className="font-medium">{`In the spirit of `}</span>
            <b>2050</b>
            <span className="font-medium">
              , welcome to a new era of property rental, where technology and imagination seamlessly
              intertwine to redefine how you discover and experience your dream home. Step into a
              world where physical boundaries dissolve, and your journey towards finding the perfect
              property is elevated to extraordinary heights.
            </span>
          </h2>
        </section>
        <Statistics />
        <section className="w-[1685px] flex flex-row items-start justify-start py-0 px-[61px] box-border max-w-full mq1350:pl-[30px] mq1350:pr-[30px] mq1350:box-border">
          <div className="flex-1 flex flex-col items-start justify-start gap-[117px] max-w-full mq800:gap-[58px] mq450:gap-[29px]">
            <MatchesWorldwide />
            <DreamHome />
          </div>
        </section>
        <Invitation />
        <section className="w-[1153px] flex flex-row items-start justify-start py-0 px-[25px] box-border max-w-full text-center text-153xl text-black font-montserrat">
          <div className="flex-1 flex flex-row flex-wrap items-start justify-center gap-[84px] max-w-full mq800:gap-[21px] mq1150:gap-[42px]">
            <div className="w-[212px] flex flex-col items-start justify-start pt-[47px] px-0 pb-0 box-border">
              <div className="self-stretch flex flex-row items-start justify-start relative">
                <h1 className="!m-[0] h-[118px] w-[132px] absolute top-[-5.9px] left-[40.14px] text-inherit leading-[0%] font-black font-inherit inline-block [text-shadow:4px_0_0_#fc0183,_0_4px_0_#fc0183,_-4px_0_0_#fc0183,_0_-4px_0_#fc0183] [transform:_rotate(17.1deg)] [transform-origin:0_0] mq800:text-50xl mq450:text-24xl">
                  L
                </h1>
                <h1 className="!m-[0] h-[73.7px] absolute top-[-9px] right-[-1.96px] text-inherit leading-[0%] font-black font-inherit inline-block [transform:_rotate(2.7deg)] [transform-origin:0_0] z-[1] mq800:text-50xl mq450:text-24xl">{`&`}</h1>
                <div className="flex-1 flex flex-col items-start justify-start gap-[191px] text-darkgray">
                  <h1 className="m-0 w-[132px] h-0 relative text-inherit leading-[0%] font-black font-inherit inline-block mq800:text-50xl mq450:text-24xl">
                    L
                  </h1>
                  <div className="self-stretch flex flex-row items-start justify-end text-6xl text-black">
                    <b className="relative mq450:text-xl">Le.seh Le.ser</b>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-start justify-start gap-[14px] min-w-[525px] max-w-full text-13xl mq800:min-w-full">
              <div className="w-[445px] flex flex-row items-start justify-between gap-[20px] max-w-full mq450:flex-wrap">
                <div className="relative font-extrabold mq800:text-7xl mq450:text-lgi">{`Lessee & Lessor`}</div>
                <div className="relative font-extrabold inline-block min-w-[93px] mq800:text-7xl mq450:text-lgi">
                  Legal
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-1.5 box-border gap-[7px] max-w-full text-6xl">
                <div className="w-[537px] flex flex-row items-start justify-start py-0 px-[3px] box-border max-w-full">
                  <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px]">
                    <b className="relative inline-block min-w-[79px]">Home</b>
                    <div className="flex flex-col items-start justify-start pt-[7px] px-0 pb-0">
                      <b className="relative whitespace-nowrap">Privacy Policy</b>
                    </div>
                  </div>
                </div>
                <div className="w-[610px] flex flex-row items-start justify-start py-0 px-[3px] box-border max-w-full">
                  <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px] mq450:flex-wrap">
                    <b className="relative inline-block min-w-[99px] mq450:text-xl">Explore</b>
                    <div className="flex flex-col items-start justify-start pt-[7px] px-0 pb-0">
                      <b className="relative mq450:text-xl">{`Terms & Conditions`}</b>
                    </div>
                  </div>
                </div>
                <div className="w-[532px] flex flex-row items-start justify-start py-0 px-[3px] box-border max-w-full">
                  <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px] mq450:flex-wrap">
                    <b className="relative inline-block min-w-[100px] whitespace-nowrap mq450:text-xl">
                      Sign up
                    </b>
                    <div className="flex flex-col items-start justify-start pt-[7px] px-0 pb-0">
                      <b className="relative mq450:text-xl">Cookie Policy</b>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-start justify-start pt-0 px-[3px] pb-[7px]">
                  <b className="relative inline-block min-w-[74px] mq450:text-xl">Login</b>
                </div>
                <div className="flex flex-row items-start justify-start pt-0 px-[3px] pb-[7px]">
                  <b className="relative inline-block min-w-[104px] mq450:text-xl">{`Contact `}</b>
                </div>
                <div className="flex flex-row items-start justify-start pt-0 px-0 pb-[7px]">
                  <b className="relative mq450:text-xl">Publications</b>
                </div>
                <div className="flex flex-row items-start justify-start pt-0 px-[3px] pb-[13px]">
                  <div className="relative">
                    <b>{`/Inspired by `}</b>
                    <span className="text-lgi [text-decoration:underline] font-museomoderno">
                      AirBnB.Com
                    </span>
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-start justify-end max-w-full">
                  <div className="w-[529px] flex flex-row items-start justify-center gap-[17px] max-w-full mq800:flex-wrap">
                    <div className="h-[74px] flex-1 relative rounded-[50%] bg-lime min-w-[73px] max-w-[74px]" />
                    <div className="h-[74px] flex-1 relative rounded-[50%] bg-gray-100 min-w-[73px] max-w-[74px]" />
                    <div className="h-[74px] flex-1 relative rounded-[50%] bg-royalblue min-w-[73px] max-w-[74px]" />
                    <div className="h-[74px] flex-1 relative rounded-[50%] bg-deeppink-200 min-w-[73px] max-w-[74px]" />
                    <div className="h-[74px] flex-1 relative rounded-[50%] bg-deeppink-200 min-w-[73px] max-w-[74px]" />
                    <div className="h-[74px] flex-1 relative rounded-[50%] bg-deeppink-100 min-w-[73px] max-w-[74px]" />
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-center py-0 pr-5 pl-[298px] mq800:pl-[149px] mq800:box-border mq450:pl-5 mq450:box-border">
                <div className="relative font-semibold mq800:text-7xl mq450:text-lgi">
                  2023 lNl INC
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Main
