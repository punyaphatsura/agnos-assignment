import React, { FC } from 'react';

interface Props {
  setPosition: (pos: number[]) => void;
}

const positionCanvas: FC<Props> = ({ setPosition }) => {
  return (
    <div
      className="absolute z-50 h-full w-full"
      onClick={(e) => {
        setPosition([e.clientX, e.clientY]);
        // console.log('clicked', e.clientX, e.clientY);
      }}
    />
  );
};

export default positionCanvas;
