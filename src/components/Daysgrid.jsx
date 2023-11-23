import { weekdays } from "../constants/names";
import { addZero } from '../constants/methods'
import "./daysgrid.scss";

export const Daysgrid = ({
  date,
  changeCurrentDay,
  events,
  setEventOpen,
  setModalId,
}) => {
  const eventPopupHandler = (e) => {
    setEventOpen(true);
    setModalId(e.target.id);
  };
  const firstDayOfMonth = new Date(date?.getFullYear(), date?.getMonth(), 1);
//   const weekdayOfFirstDay = firstDayOfMonth?.getDay();
const weekdayOfFirstDay = firstDayOfMonth?.getDay()-1;
  let currentDays = [];
  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() + (day - weekdayOfFirstDay)
      );
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    let calendarDay = {
      currentMonth: firstDayOfMonth?.getMonth() === date?.getMonth(),
      date: new Date(firstDayOfMonth),
      weekday: weekdays[firstDayOfMonth.getDay()],
      month: firstDayOfMonth?.getMonth(),
      number: firstDayOfMonth?.getDate(),
      selected: firstDayOfMonth?.toDateString() === date?.toDateString(),
      year: firstDayOfMonth?.getFullYear(),
    };

    currentDays.push(calendarDay);
  }

  const updatedCurrentDays = currentDays.map((day) => {
    const yyyy = day.date.getFullYear();
    const mm = addZero(day?.date?.getMonth() + 1);
    const dd = addZero(day?.date?.getDate());
    const selectedDate = `${yyyy}-${mm}-${dd}`;
    return {
      ...day,
      dateFormat: selectedDate,
    };
  });

  return (
    <div>
      <div className="calendar-grid">
        {updatedCurrentDays.map((day, index) => {
          return (
            <div
              key={index}
              className={`day-cell ${day.selected ? "selected-day" : ""} ${
                !day.currentMonth ? "other-month" : "current-month"
              } `}
              onClick={() => changeCurrentDay(day)}
            >
              <div className="day-data">
                <p>{day.weekday}</p>
                <p>{day.number}</p>
              </div>
              <ul className="event-list">
                {events
                  ?.filter((event) => event.date === day.dateFormat)
                  ?.map((item) => {
                    return (
                      <li
                        id={item.id}
                        name={item.id}
                        key={item.id}
                        onClick={eventPopupHandler}
                      >
                        {item.title}
                      </li>
                    );
                  })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};
