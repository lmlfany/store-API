const FilterItem = ({ onChange, checked, filter }) => {
    return (
      <div className="flex flex-row justify-end items-center">
        <input  
          type="checkbox" 
          onChange={onChange} 
          checked={checked} 
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"  
        />
        <label className="ms-2 text-sm font-medium text-gray-500">{filter}</label>
      </div>
    );
  };
  
  export default FilterItem;