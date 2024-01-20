'use client';

import React, { FC } from 'react';
import Image from 'next/image';
import useImagePreloader from '../_hook/useImagePreloader';

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

  const { imagesPreloaded } = useImagePreloader(
    getAllOver
      .map((img) => {
        return `/images/${img}-highlight.png`;
      })
      .concat(
        getAllOver.map((img) => {
          if (img !== 'all-over') return `/images/${img}-active.png`;
          return '/images/all-over-highlight.png';
        })
      )
  );

  const highlightLoader = ({
    src,
    width,
    quality,
  }: {
    src: string;
    width: number;
    quality?: number;
  }) => {
    return `/images/${src}-highlight.png`;
  };

  const activeLoader = ({
    src,
    width,
    quality,
  }: {
    src: string;
    width: number;
    quality?: number;
  }) => {
    return `/images/${src}-active.png`;
  };

  const renderHighlight = () => {
    if (selected !== 'all-over' && selected) {
      return (
        <div key={selected}>
          <Image
            width={500}
            height={500}
            src={selected}
            alt={selected}
            className="absolute h-auto w-full animate-[fadeIn_0.3s_ease-in-out] select-none transition-opacity"
            loader={highlightLoader}
          />
        </div>
      );
    } else if (selected === 'all-over') {
      return getAllOver.map((img, idx) => {
        return (
          <div key={img}>
            <Image
              key={idx}
              width={500}
              height={500}
              id="highlight"
              src={img}
              alt={img}
              className="absolute h-auto w-full animate-[fadeIn_0.3s_ease-in-out] select-none transition-opacity"
              loader={highlightLoader}
            />
          </div>
        );
      });
    }
  };

  const renderActive = () => {
    if (!selected.includes('all-over') && selected !== '') {
      return (
        <div>
          <Image
            width={500}
            height={500}
            src={selected}
            alt={selected}
            className="absolute h-auto w-full animate-[fadeIn_0.3s_ease-in-out] select-none transition-opacity"
            loader={activeLoader}
          />
        </div>
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
