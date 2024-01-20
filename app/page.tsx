'use client';

import React, { useState, useEffect } from 'react';

import AbsPain from './_components/absPain';
import FingerPain from './_components/fingerPain';
import PositionCanvas from './_components/positionCanvas';

import absPosition from './_config/abs-position.json';
import fingerPosition from './_config/finger-position.json';

export default function Page() {
  const [page, setPage] = useState<'abs' | 'finger'>('abs');
  const [position, setPosition] = useState<number[]>([0, 0]);
  const [absSelected, setAbsSelected] = useState<string>('');
  const [fingerSelected, setFingerSelected] = useState<string>('');

  const absPainArea = absPosition.data;
  const fingerPainArea = fingerPosition.data;

  useEffect(() => {
    const parent = document.getElementById('card');
    if (!parent) return;
    const relativePosition = {
      x: (position[0] * 500) / parent.getBoundingClientRect().width,
      y: (position[1] * 589) / parent.getBoundingClientRect().height,
    };
    console.log('{"x":', relativePosition.x, ',"y":', relativePosition.y, '},');
    if (page === 'abs') {
      absPainArea.forEach((area) => {
        if (
          isPointInPoly(area.points[0], {
            x: relativePosition.x,
            y: relativePosition.y,
          })
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
            isPointInPoly(point, {
              x: relativePosition.x,
              y: relativePosition.y,
            })
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
    }
    setPosition([0, 0]);
  };

  const isPointInPoly = (poly: { x: number; y: number }[], pt: { x: number; y: number }) => {
    for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i) {
      ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y)) &&
        pt.x <
          ((poly[j].x - poly[i].x) * (pt.y - poly[i].y)) / (poly[j].y - poly[i].y) + poly[i].x &&
        (c = !c);
    }
    return c;
  };
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <div
        id="card"
        className="relative mb-4 h-auto w-[300px] rounded-2xl bg-white shadow-2xl sm:mb-6 sm:h-[589px] sm:w-[500px]">
        <PositionCanvas setPosition={setPosition} />
        <div className="absolute w-full pt-1 text-center text-sm font-semibold sm:pt-4 sm:text-xl">
          จุดไหนที่คุณปวด{page === 'abs' ? 'ท้อง' : 'นิ้ว'}มากที่สุด
        </div>
        {page === 'abs' ? (
          <AbsPain selected={absSelected} />
        ) : (
          <FingerPain selected={fingerSelected} />
        )}
      </div>
      <div
        className={`z-10 flex h-10 w-[300px] items-center justify-center rounded-xl text-sm font-semibold transition-all active:scale-95 sm:h-12 sm:w-[500px] sm:text-xl
        ${absSelected !== '' || fingerSelected !== '' ? 'cursor-pointer bg-gradient-to-b from-blue-600 to-cyan-400 text-white hover:opacity-50' : 'bg-gray-200 text-gray-400'}`}
        onClick={() => {
          if (page === 'abs' && absSelected !== '') clickHandle();
        }}>
        <p className="select-none">{page === 'abs' ? 'ต่อไป' : 'ยืนยัน'}</p>
      </div>
    </div>
  );
}
