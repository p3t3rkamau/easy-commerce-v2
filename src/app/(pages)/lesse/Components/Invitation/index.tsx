'use client'
import type { NextPage } from 'next'

import Button from '../Button'

export type InvitationType = {
  className?: string
}

const Invitation: NextPage<InvitationType> = ({ className = '' }) => {
  return (
    <section
      className={`w-[1652px] flex flex-row items-start justify-start pt-0 px-[61px] pb-[103px] box-border max-w-full text-center text-27xl text-black font-montserrat mq800:pb-[67px] mq800:box-border mq1350:pl-[30px] mq1350:pr-[30px] mq1350:box-border ${className}`}
    >
      <div className="flex-1 flex flex-col items-end justify-start gap-[86px] max-w-full mq800:gap-[43px] mq450:gap-[21px]">
        <h2 className="m-0 self-stretch relative text-inherit leading-[165.4%] font-extrabold font-inherit mq800:text-18xl mq800:leading-[61px] mq450:text-9xl mq450:leading-[46px]">
          Don't miss out on this invitation to a future that's waiting for you. The clock is
          ticking, and your journey toward unrivaled property management starts now. Welcome to the
          future you can't afford to miss.
        </h2>
        <div className="w-[1441px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
          <div className="w-[453px] flex flex-row items-end justify-center gap-[28px] max-w-full mq450:flex-wrap">
            <div className="flex-1 flex flex-col items-start justify-end pt-0 px-0 pb-[22px] box-border min-w-[124px] mq450:flex-1">
              <Button className="self-stretch h-[59px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
                Sign In
              </Button>
            </div>
            <div className="h-[104px] flex flex-col items-start justify-start py-0 pr-2 pl-0 box-border">
              <div className="w-[7px] h-[111px] relative box-border border-r-[7px] border-solid border-black" />
            </div>
            <div className="flex-1 flex flex-col items-start justify-end pt-0 px-0 pb-[22px] box-border min-w-[124px] mq450:flex-1">
              <Button className="self-stretch h-[59px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Invitation
