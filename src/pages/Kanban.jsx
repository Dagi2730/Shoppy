import React, { useEffect, useState } from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import { kanbanData, kanbanGrid } from '../data/dummy';
import { Header } from '../components';

const LOCAL_STORAGE_KEY = 'kanbanTasks';

const Kanban = () => {
  const [tasks, setTasks] = useState([]);

  // Load from localStorage or fallback to dummy data
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    setTasks(stored ? JSON.parse(stored) : kanbanData);
  }, []);

  // Handle any card update
  const handleActionComplete = (args) => {
    if (['cardChanged', 'cardCreated', 'cardRemoved'].includes(args.requestType)) {
      const updated = args.changedRecords || args.addedRecords || args.deletedRecords || [];
      let updatedTasks = [...tasks];

      if (args.requestType === 'cardCreated') {
        updatedTasks = [...updatedTasks, ...updated];
      }

      if (args.requestType === 'cardChanged') {
        updated.forEach((card) => {
          const index = updatedTasks.findIndex((t) => t.Id === card.Id);
          if (index !== -1) updatedTasks[index] = card;
        });
      }

      if (args.requestType === 'cardRemoved') {
        updatedTasks = updatedTasks.filter(task => !updated.some(c => c.Id === task.Id));
      }

      setTasks(updatedTasks);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
    }
  };

  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category="App" title="Kanban" />
      <KanbanComponent
        id='kanban'
        dataSource={tasks}
        cardSettings={{ contentField: 'Summary', headerField: 'Id' }}
        keyField="Status"
        actionComplete={handleActionComplete}
      >
        <ColumnsDirective>
          {kanbanGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
      </KanbanComponent>
    </div>
  );
};

export default Kanban;
