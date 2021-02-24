import styled, { css } from "styled-components";
import ReactSelect from "react-select";
import ReactSelectAsync from "react-select/async";
import ReactSelectCreatable from "react-select/creatable";
import ReactSelectAsyncCreatable from "react-select/async-creatable";
import SetaSelect from "../../assets/images/seta-select.svg"

const defaultStyles = css`
  .select-block {    
    width: 28.1rem;
    height: 4.1rem;
    margin:0 auto;

    display: flex;
    align-items: left;
    justify-content: left;
   
  }
  .select-block select{
    
    
   }

  .select-block + .select-block {
    margin-top: 2.4rem;
  }
  .select-block select{
    background-color: #94CC09 ;
  }

  &.react-select-container {
    width: 100%;
    height: 4.4rem;
    border-radius: 2.5rem;
    font: 400 14px Roboto;
   
  }

  
  .react-select__control {
    height: 4.1rem;
    background: #FFFFFF ;
    border-radius: 4px ;
    border: none !important;
    box-shadow: 0px 3px 6px #00000029;
    color: #8E8E8D !important;
    opacity:100% ;
    padding: 8px 8px 8px 8px;
    
    &:hover {
      border: 5px ;
    }
    
    &.react_select__indicatorContainer{
      color: #94CC09 !important;
    }

    &.react-select__control--is-disabled {
      background-color: #FFFFFF;
      box-shadow:  0px 3px 6px #00000029;
      border: none !important;
      color:#8E8E8D !important;

      .react-select__placeholder {
        color: #8E8E8D ;
      }
    }
    
  }

  .react-select__control--menu-is-open {
    height: 4.1rem;
    background: #FFFFFF ;
    border-radius: 8px; ;
    border: none !important;
    box-shadow: 0px 3px 6px #00000029;
    color: #FFFFFF ;
    opacity: 100% ;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .react-select__value-container {
    display: grid ;
    text-align: left ;
    justify-items: left ;
  }

  .react-select__placeholder {
    color: #8E8E8D;
    
  }

  .react-select__input {
    color: #8E8E8D;
  }

  .react-select__single-value {
    color: #8E8E8D;
    
  }

  .react-select__menu {
    margin-top: -0.2rem ;
    background: #FFFFFF ;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    color: #8E8E8D;
    opacity: 100% ;
  }

  .react-select__option {
    color: #8E8E8D;
    text-align: left ;
    justify-items: left ;

    &:hover {
      background-color: #94CC09 ;
    }

    &:active {
      background-color: #8BC540 ;
    }

    &.react-select__option--is-selected {
      background-color: #8BC540 ;
    }

    &.react-select__option--is-focused {
      color: #FFFFFF !important;
      background-color: #8BC540 ;
      border: 0;
    }
  }

  /* Scroll Bar */
  .react-select__menu-list::-webkit-scrollbar {
    width: 1px;
    height: 0px;
  }
  .react-select__menu-list::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  .react-select__menu-list::-webkit-scrollbar-thumb {
    background: #888;
  }
  .react-select__menu-list::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  .react-select__control svg {
    color: #94cc09;
    font-size: 18px;
}

  .react-select__menu-notice {
    
  }
`;

export const Select = styled(ReactSelect)`
  ${defaultStyles}
`;

export const SelectAsync = styled(ReactSelectAsync)`
  ${defaultStyles}
`;

export const SelectCreatable = styled(ReactSelectCreatable)`
  ${defaultStyles}
`;

export const SelectAsyncCreatable = styled(ReactSelectAsyncCreatable)`
  ${defaultStyles}
`;
