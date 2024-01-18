'use client';

import AbsPain from '../_components/absPain';
import PositionCanvas from '../_components/positionCanvas';
import absPosition from '../_config/abs-position.json';

import React, { useState, useEffect } from 'react';

const Page = () => {
  const [position, setPosition] = useState<number[]>([0, 0]);
  const [absSelected, setAbsSelected] = useState<string>('');

  const absPainArea = absPosition.data;

  useEffect(() => {
    const parent = document.getElementById('card');
    if (!parent) return;
    // console.log(
    //   '{"x":',
    //   Math.round(((position[0] - parent.offsetLeft) / parent.getBoundingClientRect().width) * 500),
    //   ',"y":',
    //   Math.round(((position[1] - parent.offsetTop) / parent.getBoundingClientRect().height) * 589),
    //   '},'
    // );
    const relativePosition = {
      x: position[0] - parent.offsetLeft,
      y: position[1] - parent.offsetTop,
    };
    absPainArea.forEach((area) => {
      if (
        isPointInPoly(
          area.points[0],
          {
            x: relativePosition.x,
            y: relativePosition.y,
          },
          [parent.getBoundingClientRect().width, parent.getBoundingClientRect().height]
        )
      ) {
        console.log(area.name);
        setAbsSelected((prevSelected) => {
          if (!prevSelected.includes(area.name)) {
            return area.name;
          } else {
            return '';
          }
        });
      }
    });
  }, [absPainArea, position]);

  const clickHandler = () => console.log('clicked');

  const isPointInPoly = (
    poly: { x: number; y: number }[],
    pt: { x: number; y: number },
    bnd: number[]
  ) => {
    for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i) {
      (((poly[i].y * bnd[1]) / 589 <= pt.y && pt.y < (poly[j].y * bnd[1]) / 589) ||
        ((poly[j].y * bnd[1]) / 589 <= pt.y && pt.y < (poly[i].y * bnd[1]) / 589)) &&
        pt.x <
          (((poly[j].x * bnd[0]) / 500 - (poly[i].x * bnd[0]) / 500) *
            (pt.y - (poly[i].y * bnd[1]) / 589)) /
            ((poly[j].y * bnd[1]) / 589 - (poly[i].y * bnd[1]) / 589) +
            (poly[i].x * bnd[0]) / 500 &&
        (c = !c);
    }
    return c;
  };
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <div
        id="card"
        className="relative mb-4 h-auto w-[300px] rounded-2xl bg-white shadow-2xl transition-all sm:mb-6 sm:h-[589px] sm:w-[500px]">
        <PositionCanvas setPosition={setPosition} />
        <div className="absolute w-full pt-1 text-center text-sm font-semibold sm:pt-4 sm:text-xl">
          จุดไหนที่คุณปวดท้องมากที่สุด
        </div>
        <AbsPain selected={absSelected} />
      </div>
      <div
        className={`z-10 flex h-10 w-[300px] items-center justify-center rounded-xl text-sm font-semibold transition-all active:scale-95 sm:h-12 sm:w-[500px] sm:text-xl
        ${absSelected !== '' ? 'cursor-pointer bg-gradient-to-b from-blue-600 to-cyan-400 text-white hover:opacity-50' : 'bg-gray-200 text-gray-400'}`}
        onClick={() => {
          if (absSelected !== '') clickHandler();
        }}>
        <p className="select-none">ต่อไป</p>
      </div>
    </div>
  );
};

export default Page;
