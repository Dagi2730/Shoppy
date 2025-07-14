import React, { useEffect, useState } from 'react';
import {
  ScheduleComponent, ViewDirective, ViewsDirective,
  Day, Week, WorkWeek, Month, Agenda,
  Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { scheduleData } from '../data/dummy';
import { Header } from '../components';

const LOCAL_STORAGE_KEY = 'calendarEvents';

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = localStorage.getItem(LOCAL_STORAGE_KEY);
    setEvents(storedEvents ? JSON.parse(storedEvents) : scheduleData);
  }, []);

  const handleActionComplete = (args) => {
    if (args.requestType === 'eventCreated' || args.requestType === 'eventChanged' || args.requestType === 'eventRemoved') {
      const updatedEvents = args.data instanceof Array ? args.data : [args.data];
      let newEventData = [...events];

      if (args.requestType === 'eventCreated') {
        newEventData = [...newEventData, ...updatedEvents];
      }

      if (args.requestType === 'eventChanged') {
        updatedEvents.forEach((changedEvent) => {
          const index = newEventData.findIndex((e) => e.Id === changedEvent.Id);
          if (index !== -1) {
            newEventData[index] = changedEvent;
          }
        });
      }

      if (args.requestType === 'eventRemoved') {
        updatedEvents.forEach((deletedEvent) => {
          newEventData = newEventData.filter((e) => e.Id !== deletedEvent.Id);
        });
      }

      setEvents(newEventData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newEventData));
    }
  };

  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category="App" title="Calendar" />
      <ScheduleComponent
        height="650px"
        eventSettings={{ dataSource: events }}
        selectedDate={new Date(2021, 0, 10)}
        actionComplete={handleActionComplete}
      >
        <ViewsDirective>
          <ViewDirective option='Day' />
          <ViewDirective option='Week' />
          <ViewDirective option='WorkWeek' />
          <ViewDirective option='Month' />
          <ViewDirective option='Agenda' />
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
    </div>
  );
};

export default Calendar;
