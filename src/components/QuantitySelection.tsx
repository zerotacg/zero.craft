import React from 'react';
import { useTranslation } from 'react-i18next';

const QuantitySelection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div
      id="ui:interface:quantity_selection"
      style={{
        width: '187px',
        height: '105px',
        top: '0px',
        zIndex: 1,
        position: 'absolute',
        display: 'none',
        border: '1px solid',
        backgroundColor: '#333333'
      }}
    >
      <div className="text">{t('uiSelectQuantity')}</div>
      <div
        id="ui:interface:quantity_selection:sheet"
        style={{
          position: 'absolute',
          left: '43px',
          top: '30px'
        }}
      ></div>

      <input
        id="ui:interface:quantity_selection:txt_quantity"
        type="text"
        maxLength={3}
        size={2}
        style={{
          position: 'absolute',
          left: '103px',
          top: '40px'
        }}
      />

      <input
        id="ui:interface:quantity_selection:button_remove"
        type="button"
        value="remove"
        style={{
          position: 'absolute',
          left: '3px',
          top: '80px'
        }}
      />

      <input
        id="ui:interface:quantity_selection:button_ok"
        type="button"
        value="ok"
        style={{
          position: 'absolute',
          left: '83px',
          top: '80px'
        }}
      />

      <input
        id="ui:interface:quantity_selection:button_cancel"
        type="button"
        value="cancel"
        style={{
          position: 'absolute',
          left: '123px',
          top: '80px'
        }}
        onClick={() => {
          (window as any).ah_hide('ui:interface:quantity_selection');
        }}
      />
    </div>
  );
};

export default QuantitySelection;
