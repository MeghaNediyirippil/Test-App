import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, signal } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';
import { Draggable } from '@fullcalendar/interaction';
import { createEventId, INITIAL_EVENTS } from '../event-utils';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements AfterViewInit {

  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    droppable: true
  });


  externalEvents = signal<string[]>([
    'My Event 1',
    'My Event 2',
    'My Event 3',
    'My Event 4',
    'My Event 5',
    'My Event 6',
    'My Event 7',
    'My Event 8',
    'My Event 9',
    'My Event 10',
    'My Event 11',
    'My Event 12',
    'My Event 13',
    'My Event 14',
    'My Event 15',
  ]);

  currentEvents = signal<EventApi[]>([]);
  removeAfterDrop = signal<boolean>(false);

  private draggableInstances: Draggable[] = [];


  constructor() { }

  ngAfterViewInit() {
    this.initDraggableEvents();
  }

  initDraggableEvents() {
    // Remove existing draggable instances
    this.draggableInstances.forEach(instance => instance.destroy());
    this.draggableInstances = [];

    // Use setTimeout to ensure elements are available in the DOM
    setTimeout(() => {
      const externalEvents = document.querySelectorAll('.external-event');

      externalEvents.forEach((el) => {
        const element = el as HTMLElement; // Cast Element to HTMLElement

        const draggable = new Draggable(element, {
          itemSelector: '.external-event',
          eventData: {
            title: element.innerText,
            id: element.innerText,
          }
        });

        // Store the draggable instance
        this.draggableInstances.push(draggable);
      });
    });
  }

  onCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.removeAfterDrop.set(checkbox.checked);
  }

  removeDraggedEvents() {
    if (this.removeAfterDrop()) {
      const draggedEvents = this.currentEvents().map(e => e.title);
      const updatedEvents = this.externalEvents().filter(eventTitle => !draggedEvents.includes(eventTitle));
      this.externalEvents.set(updatedEvents);
    }
    this.initDraggableEvents();
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    if (this.removeAfterDrop()) {
      this.removeDraggedEvents();
    }
  }

  calendarVisible() {
    return true;
  }

}