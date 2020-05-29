import styled from 'styled-components';

// ref:  https://www.filamentgroup.com/lab/select-css.html

const SelectStyles = styled.select`
  /* class applies to select element itself, not a wrapper element */

  display: block;
  font-size: 16px;
  /* font-family: sans-serif; */
  font-weight: inherit;
  color: #afafaf;
  line-height: 1;
  padding: 0.05em 1.4em 0.12em 0.2em;
  width: 100%;
  max-width: 100%; /* useful when width is set to anything other than 100% */
  box-sizing: border-box;
  margin: 0;
  border: 5px solid #afafaf;
  @media (max-width: 1000px) {
    border: 3px solid #afafaf;
  }
  font-family: inherit;
  box-shadow: none;
  border-radius: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  cursor: pointer;
  /* note: bg image below uses 2 urls. The first is an svg data uri for the arrow icon, and the second is the gradient. 
		for the icon, if you want to change the color, be sure to use %23 instead of #, since it's a url. You can also swap in a different svg icon or an external image reference
		
<svg height="1024" width="640" xmlns="http://www.w3.org/2000/svg">
  <path d="M512 320L320 512 128 320 0 448l320 320 320-320L512 320z" />
</svg>


	*/
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20height%3D%221024%22%20width%3D%22640%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%3Cpath%20fill%3D%22%23afafaf%22%20d%3D%22M512%20320L320%20512%20128%20320%200%20448l320%20320%20320-320L512%20320z%22%20%2F%3E%0A%3C%2Fsvg%3E'),
    linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
  background-repeat: no-repeat, repeat;
  /* arrow icon position (1em from the right, 50% vertical) , then gradient position*/
  background-position: right 0.7em top 50%, 0 0;
  /* icon size, then gradient */
  background-size: 0.45em auto, 100%;

  /* Hide arrow icon in IE browsers */
  ::-ms-expand {
    display: none;
  }
  /* Hover style */
  :hover {
    border-color: #888;
  }
  /* Focus style */
  :focus {
    border-color: #aaa;
    /* It'd be nice to use -webkit-focus-ring-color here but it doesn't work on box-shadow */
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    /* color: #222; */
    outline: none;
  }

  /* Set options to normal weight */
  option {
    font-weight: normal;
  }

  /* Support for rtl text, explicit support for Arabic and Hebrew */
  /* *[dir='rtl'] .select-css,
  :root:lang(ar) .select-css,
  :root:lang(iw) .select-css {
    background-position: left 0.7em top 50%, 0 0;
    padding: 0.6em 0.8em 0.5em 1.4em;
  } */

  /* Disabled styles */
  :disabled,
  [aria-disabled='true'] {
    color: graytext;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22graytext%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
      linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  }

  :disabled:hover,
  [aria-disabled='true'] {
    border-color: #aaa;
  }
`;

module.exports = { SelectStyles };
