import { EventItem } from "@/dummy-data";

export async function getAllEvents(): Promise<EventItem[]> {
  const response = await fetch('https://next-course-20a0d-default-rtdb.firebaseio.com/events.json');
  const data = await response.json();
  const events: EventItem[] = [];

  for(const key in data) {
    events.push({
      id: key,
      ...data[key]
    });
  }

  return events;
}

export async function getFeaturedEvents(): Promise<EventItem[]> {
  const allEvents = await getAllEvents();
  return allEvents.filter(event => event.isFeatured);
}


export async function getEventById(id: string): Promise<EventItem | undefined> {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter: {year: number, month: number}): EventItem[] {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();
  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}