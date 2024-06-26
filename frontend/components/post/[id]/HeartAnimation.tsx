// components/HeartAnimation.tsx
import * as React from 'react';
import Image from 'next/image';

interface HeartAnimationProps {
  visible: boolean;
}

const HeartAnimation: React.FC<HeartAnimationProps> = ({ visible }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      } pointer-events-none`}
    >
      <Image
        src="/icons/heart.svg"
        alt="Heart"
        width={150}
        height={150}
        className="w-96 h-96"
      />
    </div>
  );
};

export default HeartAnimation;
