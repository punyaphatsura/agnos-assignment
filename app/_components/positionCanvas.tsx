'use client';

import React, { FC, useRef } from 'react';

interface Props {
  setPosition: (pos: number[]) => void;
}

const PositionCanvas: FC<Props> = ({ setPosition }) => {
  const ref = useRef<HTMLDivElement>(null);

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (ref.current === null) return;
    const posX = Math.floor(e.clientX - ref.current?.getBoundingClientRect().left);
    const posY = Math.floor(e.clientY - ref.current?.getBoundingClientRect().top);
    setPosition([posX, posY]);
  };

  return <div className="absolute z-50 h-full w-full" ref={ref} onClick={onClick} />;
};

export default PositionCanvas;
