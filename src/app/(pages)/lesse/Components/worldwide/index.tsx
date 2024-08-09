import type { NextPage } from 'next'

export type MatchesWorldwideType = {
  className?: string
}

const MatchesWorldwide: NextPage<MatchesWorldwideType> = ({ className = '' }) => {
  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start gap-[34px] max-w-full text-center text-153xl text-black font-montserrat mq800:gap-[17px] ${className}`}
    >
      <div className="self-stretch flex flex-row items-start justify-start max-w-full">
        <div className="flex-1 relative leading-[124px] font-black inline-block max-w-full mq800:text-50xl mq450:text-24xl">
          100k
        </div>
        <div className="h-[124px] flex-1 relative leading-[0%] font-black inline-block max-w-full z-[1] ml-[-415px] mq800:text-50xl mq450:text-24xl">
          1M
        </div>
      </div>
      <div className="w-[1463px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full text-28xl">
        <div className="w-[861px] flex flex-row items-start justify-between max-w-full gap-[20px] mq800:flex-wrap">
          <h2 className="m-0 relative text-inherit leading-[165.4%] font-medium font-inherit inline-block max-w-full mq800:text-19xl mq800:leading-[62px] mq450:text-9xl mq450:leading-[47px]">
            <p className="m-0">weekly matches</p>
            <p className="m-0">worldwide</p>
          </h2>
          <h2 className="m-0 relative text-inherit leading-[78px] font-medium font-inherit mq800:text-19xl mq800:leading-[62px] mq450:text-9xl mq450:leading-[47px]">
            Listings
          </h2>
        </div>
      </div>
    </div>
  )
}

export default MatchesWorldwide
