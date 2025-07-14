import React, { useEffect, useRef } from 'react';
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';
import { Header } from '../components';

const LOCAL_STORAGE_KEY = 'selectedColor';

const ColorPicker = () => {
  const paletteRef = useRef(null);
  const pickerRef = useRef(null);

  const handleChange = (args) => {
    const selectedColor = args.currentValue.hex;
    document.getElementById('preview').style.backgroundColor = selectedColor;
    localStorage.setItem(LOCAL_STORAGE_KEY, selectedColor);
  };

  useEffect(() => {
    const savedColor = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedColor) {
      document.getElementById('preview').style.backgroundColor = savedColor;

      if (paletteRef.current) paletteRef.current.setProperties({ value: savedColor }, true);
      if (pickerRef.current) pickerRef.current.setProperties({ value: savedColor }, true);
    }
  }, []);

  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category="App" title="Color-Picker" />
      <div className='text-center'>
        <div
          id='preview'
          className='w-full h-24 mb-10 rounded-xl border-2 border-gray-200'
        />
        <div className='flex justify-center items-center flex-wrap gap-20'>
          <div>
            <p className='text-2xl font-semibold mt-2 mb-4'>Inline Palette</p>
            <ColorPickerComponent
              id='inline-palette'
              ref={paletteRef}
              mode='Palette'
              modeSwitcher={false}
              inline
              showButtons={false}
              change={handleChange}
            />
          </div>
          <div>
            <p className='text-2xl font-semibold mt-2 mb-4'>Inline Picker</p>
            <ColorPickerComponent
              id='inline-picker'
              ref={pickerRef}
              mode='Picker'
              modeSwitcher={false}
              inline
              showButtons={false}
              change={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
