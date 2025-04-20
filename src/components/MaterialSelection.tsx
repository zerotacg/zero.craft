import React from 'react';

const MaterialSelection: React.FC = () => {
  return (
    <div
      id="ui:interface:material_selection"
      style={{
        top: '0px',
        position: 'absolute',
        display: 'none',
        minWidth: '10px',
        minHeight: '10px',
        border: '1px solid',
        backgroundColor: '#333333'
      }}
    >
      {/* This div will be populated by the existing JavaScript function generateMaterialList */}
    </div>
  );
};

export default MaterialSelection;
