import PropTypes from 'prop-types';
import filterCss from './Filter.module.css';
export const Filter = ({ onChange }) => {
  return (
    <div className={filterCss.filter}>
      <label className={filterCss.label}>
        Find contacts by name
        <input type="text" onChange={onChange} className={filterCss.input} />
      </label>
    </div>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};
