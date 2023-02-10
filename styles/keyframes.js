import { keyframes, css } from "@emotion/react";

export const fadeInUp = keyframes`
from {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
to {
  opacity: 1;
  transform: translateZ(0);
}`;
export const fadeOutDown = keyframes`
from {
  opacity: 1;
  transform: translateZ(0);
}
to {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
`;

export const fadeIn = keyframes`
from {
  opacity: 0;
  transform: scale(0.88);
}
to {
  opacity: 1;
  transform: scale(1);
}
`;
export const fadeOut = keyframes`
from {
  opacity: 1;
  transform: scale(1);
}
to {
  opacity: 0;
  transform: scale(0.88);
}
`;

export const semiFadeInUp = keyframes`
from {
  opacity: 0;
  transform: translateY(40px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;

export const fadeInUp_OutDown = (visible) => css`
  visibility: ${visible ? "visible" : "hidden"};
  z-index: 15;
  animation: ${visible ? fadeInUp : fadeOutDown} 0.3s ease-in-out;
  transition: visibility 0.3s ease-in-out;
`;

export const fadeIn_Down = (visible) => css`
  visibility: ${visible ? "visible" : "hidden"};
  z-index: 15;
  animation: ${visible ? fadeIn : fadeOut} 0.3s ease-in-out;
  transition: visibility 0.3s ease-in-out;
`;

export const animation_fadeInUp_view = css`
  animation: ${semiFadeInUp} 0.56s ease-in-out;
`;
