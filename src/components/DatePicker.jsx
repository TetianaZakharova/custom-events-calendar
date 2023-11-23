
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { months } from "../constants/names";
import './datePicker.scss'

export const DatePicker = ({prevYear, currentYear, nextYear, currentMonth, selectMonthHandler}) => {
  return (
    <div>
      <div className="date-filter date-filter__year">
        <div className="filter-control" onClick={prevYear}>
          <IoIosArrowBack size={20} />
        </div>
        <div>{currentYear}</div>
        <div className="filter-control" onClick={nextYear}>
          <IoIosArrowForward size={20} />
        </div>
      </div>
      <div className="months-grid">
        {months.map((month) => {
          return (
            <div
              className={`month-cell ${
                currentMonth === months.indexOf(month) ? "selected-month" : ""
              }`}
              key={month}
              name={month}
              onClick={() => selectMonthHandler(month)}
            >
              {month.slice(0, 3)}
            </div>
          );
        })}
      </div>
    </div>
  );
};
