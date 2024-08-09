import type { NextPage } from 'next'

export type DreamHomeType = {
  className?: string
}

const DreamHome: NextPage<DreamHomeType> = ({ className = '' }) => {
  return (
    <div
      className={`w-[1530px] flex flex-col items-start justify-start gap-[53px] max-w-full text-left text-27xl text-black font-montserrat mq800:gap-[26px] ${className}`}
    >
      <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-black" />
      <div className="self-stretch flex flex-col items-start justify-start gap-[39px] max-w-full text-14xl mq800:gap-[19px]">
        <div className="self-stretch flex flex-row items-start justify-start relative max-w-full">
          <div className="w-[810px] absolute !m-[0] bottom-[-19px] left-[0px] leading-[165.4%] inline-block z-[1] mq800:text-7xl mq800:leading-[44px] mq450:text-xl mq450:leading-[33px]">
            <b>Picture this:</b>
            <span className="font-light">{` every detail of your dream home comes to life before your eyes. The dimensions, the textures, the play of light – all effortlessly revealed through immersive HD photos, virtual tours, live location, amenities available. It's a spectacle that accelerates your search & ignites your imagination. Plus ... you discover all gems around your future home`}</span>
          </div>
          <div className="flex-1 bg-gainsboro-200 flex flex-row items-start justify-between pt-0 px-0 pb-[135px] box-border max-w-full gap-[20px] text-27xl mq800:pb-[88px] mq800:box-border mq1350:flex-wrap">
            <div className="h-[603px] w-[1530px] relative bg-gainsboro-200 hidden max-w-full" />
            <h2 className="m-0 w-[811px] relative text-inherit leading-[165.4%] inline-block shrink-0 min-w-[811px] max-w-full z-[1] font-inherit mq800:text-18xl mq800:leading-[61px] mq1150:min-w-full mq450:text-9xl mq450:leading-[46px] mq1350:flex-1">
              <span className="font-extrabold">{`Unveiling the Future of Property Discovery `}</span>
              <span>- Lessee</span>
            </h2>
            <div className="h-[468px] w-[392px] flex flex-col items-start justify-start pt-[76px] px-0 pb-0 box-border min-w-[392px] max-w-full mq800:pt-[49px] mq800:box-border mq800:min-w-full mq1350:flex-1">
              <img
                className="self-stretch flex-1 relative rounded-[50%] max-w-full overflow-hidden max-h-full object-cover z-[1] mq1350:self-stretch mq1350:w-auto"
                loading="lazy"
                alt=""
                src="/ellipse-16@2x.png"
              />
            </div>
          </div>
        </div>
        <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-black" />
      </div>
      <div className="self-stretch bg-gainsboro-200 flex flex-col items-start justify-start gap-[157px] max-w-full mq800:gap-[39px] mq450:gap-[20px] mq1350:gap-[78px]">
        <div className="self-stretch h-[603px] relative bg-gainsboro-200 hidden" />
        <div className="self-stretch flex flex-row items-start justify-between max-w-full gap-[20px] mq1350:flex-wrap">
          <div className="w-[811px] flex flex-col items-start justify-start gap-[34px] min-w-[811px] max-w-full mq1150:min-w-full mq450:gap-[17px] mq1350:flex-1">
            <h2 className="m-0 self-stretch relative text-inherit leading-[165.4%] z-[1] font-inherit mq800:text-18xl mq800:leading-[61px] mq450:text-9xl mq450:leading-[46px]">
              <span className="font-extrabold">{`Evolve from dusty record books that never give insights `}</span>
              <span>- Lessor</span>
            </h2>
            <div className="self-stretch relative text-14xl leading-[165.4%] z-[1] mq800:text-7xl mq800:leading-[44px] mq450:text-xl mq450:leading-[33px]">
              <b>Picture this:</b>
              <span className="font-light">{` monthly, weekly & anual insights on rental income, occupancy rate, move in & out data, spending, repairs on one dashboard`}</span>
            </div>
          </div>
          <div className="w-[392px] flex flex-col items-start justify-start pt-[54px] px-0 pb-0 box-border min-w-[392px] max-w-full mq800:min-w-full mq450:pt-[35px] mq450:box-border mq1350:flex-1">
            <div className="self-stretch h-[392px] relative">
              <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-gainsboro-100 w-full h-full z-[1]" />
              <div className="absolute top-[183px] left-[5px] box-border w-[388px] h-px z-[2] border-t-[1px] border-solid border-black" />
            </div>
          </div>
        </div>
        <div className="self-stretch h-px relative box-border z-[1] border-t-[1px] border-solid border-black" />
      </div>
      <div className="self-stretch flex flex-row items-start justify-start relative max-w-full">
        <h2 className="!m-[0] w-[811px] absolute top-[-10px] left-[0px] text-inherit leading-[165.4%] inline-block z-[1] font-inherit mq800:text-18xl mq800:leading-[61px] mq450:text-9xl mq450:leading-[46px]">
          <span className="font-extrabold">{`A unreal, seamless experience controlled by a community `}</span>
          <span>{`- Lessee & Lessor`}</span>
        </h2>
        <div className="flex-1 bg-gainsboro-200 flex flex-row items-start justify-between pt-11 px-0 pb-24 box-border relative max-w-full gap-[20px] text-center text-white mq800:pt-[29px] mq800:pb-[62px] mq800:box-border mq1350:flex-wrap">
          <div className="h-[603px] w-[1530px] relative bg-gainsboro-200 hidden max-w-full z-[0]" />
          <div className="w-[810px] flex flex-col items-start justify-start pt-[190px] px-0 pb-0 box-border min-w-[810px] max-w-full text-left text-14xl text-black mq1150:min-w-full mq450:pt-[123px] mq450:box-border mq1350:flex-1">
            <div className="self-stretch relative leading-[165.4%] z-[1] mq800:text-7xl mq800:leading-[44px] mq450:text-xl mq450:leading-[33px]">
              <b>Picture this:</b>
              <span className="font-light">{` In app messaging, inquiries, payment, records history, Lease agreements, Lessee & Lessor matching, ratings, payment tracking, Lessee or Lesssor screening ...... and much more.`}</span>
            </div>
          </div>
          <div className="h-[392px] w-[392px] relative rounded-[50%] bg-gainsboro-100 min-w-[392px] max-w-full z-[1] mq800:min-w-full mq1350:flex-1" />
          <h2 className="!m-[0] w-3.5 absolute right-[159.5px] bottom-[92.02px] text-inherit leading-[165.4%] font-extrabold font-inherit inline-block [transform:_rotate(-12.3deg)] [transform-origin:0_0] z-[2] mq800:text-18xl mq800:leading-[61px] mq450:text-9xl mq450:leading-[46px]">
            .
          </h2>
          <h2 className="!m-[0] w-3.5 absolute right-[39.6px] bottom-[77.12px] text-inherit leading-[165.4%] font-extrabold font-inherit inline-block [transform:_rotate(-12.3deg)] [transform-origin:0_0] z-[1] mq800:text-18xl mq800:leading-[61px] mq450:text-9xl mq450:leading-[46px]">
            .
          </h2>
        </div>
      </div>
    </div>
  )
}

export default DreamHome
