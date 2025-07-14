import React, { useEffect, useState } from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar, Edit } from '@syncfusion/ej2-react-grids';

import { employeesData, employeesGrid } from '../data/dummy';
import { Header } from '../components';

const LOCAL_STORAGE_KEY = 'employeesData';

const Employees = () => {
  const [data, setData] = useState([]);

  const toolbarOptions = ['Search', 'Add', 'Edit', 'Delete'];
  const editing = { allowAdding: true, allowDeleting: true, allowEditing: true };

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    setData(storedData ? JSON.parse(storedData) : employeesData);
  }, []);

  const handleActionComplete = (args) => {
    if (['save', 'delete'].includes(args.requestType)) {
      const updatedData = args.data instanceof Array ? args.data : [args.data];
      let newData = [...data];

      if (args.requestType === 'save') {
        updatedData.forEach((item) => {
          const index = newData.findIndex((d) => d.EmployeeID === item.EmployeeID);
          if (index !== -1) newData[index] = item;
          else newData.push(item); // new entry
        });
      }

      if (args.requestType === 'delete') {
        newData = newData.filter((d) => !updatedData.some((item) => item.EmployeeID === d.EmployeeID));
      }

      setData(newData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employees" />
      <GridComponent
        dataSource={data}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
        actionComplete={handleActionComplete}
      >
        <ColumnsDirective>
          {employeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page, Toolbar, Edit]} />
      </GridComponent>
    </div>
  );
};

export default Employees;
