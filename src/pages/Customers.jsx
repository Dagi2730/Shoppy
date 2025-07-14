import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';

const LOCAL_STORAGE_KEY = 'customersData';

const Customers = () => {
  const [data, setData] = useState([]);

  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    setData(storedData ? JSON.parse(storedData) : customersData);
  }, []);

  const handleActionComplete = (args) => {
    if (['save', 'delete'].includes(args.requestType)) {
      const updatedData = args.data instanceof Array ? args.data : [args.data];
      let newData = [...data];

      if (args.requestType === 'save') {
        updatedData.forEach((item) => {
          const index = newData.findIndex((d) => d.CustomerID === item.CustomerID);
          if (index !== -1) newData[index] = item;
          else newData.push(item);
        });
      }

      if (args.requestType === 'delete') {
        newData = newData.filter((d) => !updatedData.some((item) => item.CustomerID === d.CustomerID));
      }

      setData(newData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <GridComponent
        dataSource={data}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
        actionComplete={handleActionComplete}
      >
        <ColumnsDirective>
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Customers;
