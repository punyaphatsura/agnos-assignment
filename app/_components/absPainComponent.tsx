'use client';

import React, { FC } from 'react';
import Image from 'next/image';

interface Props {
  selected: string;
}

const AbdominalPainComponent: FC<Props> = ({ selected }) => {
  const getAllOver = [
    'epigastrium',
    'llq',
    'luq',
    'rlq',
    'ruq',
    'umbilicus',
    'suprapubic',
    'all-over',
  ];

  const renderHighlight = () => {
    if (selected !== 'all-over' && selected) {
      return (
        <Image
          width={500}
          height={500}
          src={require(`.//../../public/images/${selected}-highlight.png`)}
          alt={selected}
          className="absolute h-auto w-full select-none"
        />
      );
    } else if (selected === 'all-over') {
      return getAllOver.map((img, idx) => {
        return (
          <Image
            key={idx}
            width={500}
            height={500}
            id="highlight"
            src={require(`.//../../public/images/${img}-highlight.png`)}
            alt={img}
            className="absolute h-auto w-full select-none"
          />
        );
      });
    }
  };

  const renderActive = () => {
    if (!selected.includes('all-over') && selected !== '') {
      return (
        <Image
          width={500}
          height={500}
          src={require(`.//../../public/images/${selected}-active.png`)}
          alt={selected}
          className="absolute h-auto w-full select-none"
        />
      );
    }
  };

  return (
    <div className="relative z-20 -ml-px h-auto w-full max-w-[500px]">
      {renderActive()}
      {renderHighlight()}
    </div>
  );
};

export default AbdominalPainComponent;
