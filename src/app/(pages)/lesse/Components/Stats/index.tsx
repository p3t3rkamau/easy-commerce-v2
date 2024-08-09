import type { NextPage } from 'next'

export type StatisticsType = {
  className?: string
}

const Statistics: NextPage<StatisticsType> = ({ className = '' }) => {
  return (
    <section
      className={`w-[1652px] flex flex-row items-start justify-start pt-0 px-[61px] pb-[9px] box-border max-w-full text-center text-153xl text-black font-montserrat mq1350:pl-[30px] mq1350:pr-[30px] mq1350:box-border ${className}`}
    >
      <div className="flex-1 flex flex-col items-end justify-start gap-[34px] max-w-full mq800:gap-[17px]">
        <div className="self-stretch flex flex-row items-start justify-start max-w-full">
          <div className="flex-1 relative leading-[124px] font-black inline-block max-w-full mq800:text-50xl mq450:text-24xl">
            <p className="m-0">70+</p>
            <p className="m-0">&nbsp;</p>
          </div>
          <div className="h-[124px] flex-1 relative leading-[0%] font-black inline-block max-w-full z-[1] ml-[-448px] mq800:text-50xl mq450:text-24xl">
            $1k
          </div>
        </div>
        <div className="w-[1512px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full text-28xl">
          <div className="w-[858px] flex flex-row items-start justify-between max-w-full gap-[20px] mq800:flex-wrap">
            <h2 className="m-0 w-[300px] relative text-inherit leading-[165.4%] font-medium font-inherit inline-block min-w-[300px] mq800:text-19xl mq800:leading-[62px] mq800:flex-1 mq450:text-9xl mq450:leading-[47px]">
              <p className="m-0">{`hours saved `}</p>
              <p className="m-0">yearly</p>
            </h2>
            <h2 className="m-0 relative text-inherit leading-[165.4%] font-medium font-inherit inline-block min-w-[333px] max-w-full mq800:text-19xl mq800:leading-[62px] mq800:flex-1 mq450:text-9xl mq450:leading-[47px]">
              <p className="m-0">rental income</p>
              <p className="m-0">recovered</p>
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Statistics
