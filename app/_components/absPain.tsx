'use client';

import AbsDefualt from '@images/default-abs.png';
import Image from 'next/image';
import React, { FC } from 'react';
import AbsPainComponent from './absPainComponent';

interface Props {
  selected: string;
}

const Page: FC<Props> = ({ selected }) => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center p-[19.2px] sm:p-8">
      <div className="top-3 z-10 flex h-0 w-full items-center justify-center overflow-visible">
        <AbsPainComponent selected={selected} />
      </div>
      <Image src={AbsDefualt} alt={''} className="z-0 h-auto w-[500px] select-none" />
    </div>
  );
};

export default Page;
