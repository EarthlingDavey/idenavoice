import styled from 'styled-components';

const CheckboxInputStyles = styled.label`
  color: #afafaf;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  padding-left: 1em;
  line-height: 0.8;
  margin-bottom: 0.3em;

  /* i {
    display: inline !important;
  } */

  input {
    position: relative;
    width: 0;
    right: -5px;
    opacity: 0;

    ~ i.checkbox {
      position: absolute;
      display: block;
      /* margin-left: 0.1em; */
      left: 0;
      top: 0;
      height: 1em;
      width: 1em;
      font-size: 0.8em;
      border: 5px solid #afafaf;

      @media (max-width: 1000px) {
        height: 1em;
        width: 1em;
        font-size: 1em;
        border: 3px solid #afafaf;
      }

      &:after {
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        content: 'L';
        font-family: arial;
        opacity: 0;
        transform: translate(-50%, -50%) scaleX(-1) rotate(-35deg);
        text-shadow: -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff,
          2px 2px 0 #fff;
        @media (max-width: 1000px) {
          text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
            1px 1px 0 #fff;
        }
      }
    }

    &:focus ~ i.checkbox {
      box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
      box-shadow: 0 0 0 3px -moz-mac-focusring;
      &:after {
        opacity: 0.1;
      }
    }
    &:checked ~ i.checkbox {
      &:after {
        opacity: 1;
      }
    }
  }
`;

module.exports = { CheckboxInputStyles };
