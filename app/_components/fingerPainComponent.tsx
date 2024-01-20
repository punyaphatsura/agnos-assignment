'use client';

import React, { FC } from 'react';
import Image from 'next/image';
import useImagePreloader from '../_hook/useImagePreloader';

interface Props {
  selected: string;
}

const FingerPainComponent: FC<Props> = ({ selected }) => {
  const getAllOver = ['others', 'pip', 'mcp', 'pip'];

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
    if (selected !== 'others' && selected) {
      return (
        <Image
          width={500}
          height={500}
          src={selected}
          alt={selected}
          className="absolute h-auto w-full select-none"
          loader={highlightLoader}
        />
      );
    } else if (selected === 'others') {
      return getAllOver.map((img, idx) => {
        return (
          <Image
            key={idx}
            width={500}
            height={500}
            src={img}
            alt={img}
            className="absolute h-auto w-full select-none"
            loader={highlightLoader}
          />
        );
      });
    }
  };

  const renderActive = () => {
    if (!selected.includes('others') && selected !== '') {
      return (
        <Image
          width={500}
          height={500}
          src={selected}
          alt={selected}
          className="absolute h-auto w-full select-none"
          loader={activeLoader}
        />
      );
    }
  };

  return (
    <div className="relative z-20 -ml-px h-auto w-full max-w-[500px]">
      {!imagesPreloaded ? (
        <p>Preloading Assets</p>
      ) : (
        <>
          {renderActive()}
          {renderHighlight()}
        </>
      )}
    </div>
  );
};

export default FingerPainComponent;
