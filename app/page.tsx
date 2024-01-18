'use client';

import AbsPain from './_components/absPain';
import FingerPain from './_components/fingerPain';
import PositionCanvas from './_components/positionCanvas';
import absPosition from './_config/abs-position.json';
import fingerPosition from './_config/finger-position.json';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [page, setPage] = useState<'abs' | 'finger'>('abs');
  const [position, setPosition] = useState<number[]>([0, 0]);
  const [absSelected, setAbsSelected] = useState<string>('');
  const [fingerSelected, setFingerSelected] = useState<string>('');

  const absPainArea = absPosition.data;
  const fingerPainArea = fingerPosition.data;

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
    if (page === 'abs') {
      absPainArea.forEach((area) => {
        if (
          isPointInPoly(
            area.points[0],
            {
              x: position[0] - parent.offsetLeft,
              y: position[1] - parent.offsetTop,
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
    } else {
      fingerPainArea.forEach((area) => {
        area.points.forEach((point) => {
          if (
            isPointInPoly(
              point,
              {
                x: position[0] - parent.offsetLeft,
                y: position[1] - parent.offsetTop,
              },
              [parent.getBoundingClientRect().width, parent.getBoundingClientRect().height]
            )
          ) {
            console.log(area.name);
            setFingerSelected((prevSelected) => {
              if (!prevSelected.includes(area.name)) {
                return area.name;
              } else {
                return '';
              }
            });
          }
        });
      });
    }
  }, [absPainArea, fingerPainArea, page, position]);

  const clickHandle = () => {
    console.log('clicked');
    if (page === 'abs') {
      setAbsSelected('');
      setPage('finger');
    } else {
      setFingerSelected('');
      setPage('abs');
    }
    setPosition([0, 0]);
  };

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
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
      <div
        id="card"
        className="relative mb-4 h-auto w-[300px] rounded-2xl bg-white shadow-2xl sm:mb-6 sm:h-[589px] sm:w-[500px]">
        <PositionCanvas setPosition={setPosition} />
        <div className="absolute w-full pt-1 text-center text-sm font-semibold sm:pt-4 sm:text-xl">
          จุดไหนที่คุณปวด{page === 'abs' ? 'ท้อง' : 'นิ้ว'}มากที่สุด
        </div>
        {page === 'abs' && <AbsPain selected={absSelected} />}
        {page === 'finger' && <FingerPain selected={fingerSelected} />}
      </div>
      <div
        className={`z-10 flex h-10 w-[300px] items-center justify-center rounded-xl text-sm font-semibold transition-all active:scale-95 sm:h-12 sm:w-[500px] sm:text-xl
        ${absSelected !== '' || fingerSelected !== '' ? 'cursor-pointer bg-gradient-to-b from-blue-600 to-cyan-400 text-white hover:opacity-50' : 'bg-gray-200 text-gray-400'}`}
        onClick={() => {
          if (page === 'abs' && absSelected !== '') clickHandle();
          if (page === 'finger' && fingerSelected !== '') clickHandle();
        }}>
        <p className="select-none">ต่อไป</p>
      </div>
    </div>
  );
}
