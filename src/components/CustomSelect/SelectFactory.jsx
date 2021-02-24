import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { AiFillCaretDown } from "react-icons/ai";


import './styles.css';


const factory = (SelectComponent) => {

  class Select extends PureComponent {

    

    render() {
      
      const {
        className,
        title,
        isClearable,
        isSearchable,
        components,
        isLoading,
        style,
        label,
        variant,
        placeholder,
        hint,
        DropdownIndicator,

        ...rest

      } = this.props;
      
      return (

        <div className="select-block">
          <SelectComponent
            variant={variant}
            placeholder={placeholder}
            className='react-select-container'
            classNamePrefix='react-select'
            isClearable={isClearable}
            isLoading={isLoading}
            isSearchable={isSearchable}
            menuShouldScrollIntoView={this.props.menuShouldScrollIntoView}
            noOptionsMessage={() => "Sem registros"}
            components={{ DropdownIndicator: AiFillCaretDown , IndicatorSeparator:() => null }}
            {...rest}
          />        
        </div>
      );
    }
  }

  /* overrides some of the default props */
  Select.propTypes = {
    isClearable: PropTypes.bool,
    isSearchable: PropTypes.bool,
    isLoading: PropTypes.bool,
    components: PropTypes.shape({}),
  };

  Select.defaultProps = {
    isClearable: false,
    isSearchable: false,
    isLoading: false,
    components: {},
  };

  return Select;
};

export default factory;
