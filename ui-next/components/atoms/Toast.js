import React from 'react';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

const StyledToastContainer = styled(ToastContainer).attrs({
  className: 'toast-container',
  toastClassName: 'toast',
  bodyClassName: 'body',
  progressClassName: 'progress',
  closeClassName: 'close',
  enterClassName: 'enter',
  exitClassName: 'exit',
})`
  /* copy/pasted from node_modules/react-toastify/dist/ReactToastify.css */

  /* .toast-container */
  width: 100%;
  z-index: 9999;
  -webkit-transform: translate3d(0, 0, 9999px);
  position: fixed;
  padding: 4px;
  width: 320px;
  box-sizing: border-box;
  color: #000;

  /* top right */
  top: 0.5em;
  right: 0.5em;

  @media only screen and (max-width: 480px) {
    width: 100vw;
    padding: 0;
    left: 0;
    margin: 0;

    top: 0;
    transform: translateX(0);
  }

  @keyframes Toastify__trackProgress {
    0% {
      transform: scaleX(1);
    }
    to {
      transform: scaleX(0);
    }
  }
  .Toastify__progress-bar {
    animation: Toastify__trackProgress linear 1 forwards;
  }

  /* .toast is passed to toastClassName */
  .toast {
    position: relative;
    background-color: #fff;
    border: 3px solid #ddd;
    box-shadow: 3px 3px 0 #000;
    padding: 1em;
    margin-bottom: 1em;
    @media only screen and (max-width: 480px) {
      .Toastify__toast {
        margin-bottom: 0;
      }
    }
  }

  button[aria-label='close'] {
    display: none;
  }

  /* .body is passed to bodyClassName */
  .body {
  }

  /* .progress is passed to progressClassName */
  .progress {
    animation: Toastify__trackProgress linear 1 forwards;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    z-index: 9999;
    opacity: 0.7;
    background-color: #ddd;
    transform-origin: left;
  }

  @keyframes Toastify__bounceInRight {
    from,
    60%,
    75%,
    90%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    from {
      opacity: 0;
      transform: translate3d(3000px, 0, 0);
    }
    60% {
      opacity: 1;
      transform: translate3d(-25px, 0, 0);
    }
    75% {
      transform: translate3d(10px, 0, 0);
    }
    90% {
      transform: translate3d(-5px, 0, 0);
    }
    to {
      transform: none;
    }
  }

  @keyframes Toastify__bounceOutRight {
    20% {
      opacity: 1;
      transform: translate3d(-20px, 0, 0);
    }
    to {
      opacity: 0;
      transform: translate3d(2000px, 0, 0);
    }
  }

  .Toastify__bounce-enter--top-right {
    animation-name: Toastify__bounceInRight;
  }
  .Toastify__bounce-exit--top-right {
    animation-name: Toastify__bounceOutRight;
  }
`;

module.exports = { StyledToastContainer };
