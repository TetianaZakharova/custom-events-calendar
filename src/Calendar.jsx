import { useState, useEffect } from "react";
import { Daysgrid } from "./components/Daysgrid";
import { EventForm } from "./components/EventForm";
import { ModalPopup } from "./components/ModalPopup";
import { EventPopup } from "./components/EventPopup";
import { DatePicker } from "./components/DatePicker";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { months } from "./constants/names";
import axios from "axios";
import uuid4 from "uuid4";
import "./calendar.scss";

import { getFormattedDate } from "./constants/methods";

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(
    new Date(localStorage.getItem("current_date"))
  );
  const [currentMonth, setCurrentMonth] = useState();
  const [currentYear, setCurrentYear] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [eventOpen, setEventOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventInfo, setEventInfo] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });
  const [modalId, setModalId] = useState(0);
  const [infoForEdit, setInfoForEdit] = useState({});
  const id = uuid4();
  const eventForEdit = events.filter((event) => event.id === modalId)[0];

  useEffect(() => {
    setInfoForEdit({
      id: modalId,
      title: eventForEdit?.title,
      description: eventForEdit?.description,
      date: eventForEdit?.date,
      time: eventForEdit?.time,
      created: eventForEdit?.created,
      updated: "",
    });
  }, [eventForEdit]);

  useEffect(() => {
    currentDate.toString() ===
    "Thu Jan 01 1970 03:00:00 GMT+0300 (Eastern European Standard Time)"
      ? setCurrentDate(new Date())
      : setCurrentDate(new Date(localStorage.getItem("current_date")));

    getEvents("http://localhost:3016/events");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("current_date", currentDate?.toJSON());
    setCurrentMonth(currentDate?.getMonth());
    setCurrentYear(currentDate?.getFullYear());
  }, [currentDate]);

  const changeCurrentDay = (day) => {
    setCurrentDate(new Date(day.year, day.month, day.number));
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate?.setMonth(currentDate?.getMonth() + 1))
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate?.setMonth(currentDate?.getMonth() - 1))
    );
  };

  const nextYear = () => {
    setShowPopup(false);
    setCurrentDate(
      new Date(currentDate?.setFullYear(currentDate?.getFullYear() + 1))
    );
  };

  const prevYear = () => {
    setShowPopup(false);
    setCurrentDate(
      new Date(currentDate?.setFullYear(currentDate?.getFullYear() - 1))
    );
  };

  const togglePopupHandler = () => {
    setShowPopup((prevState) => {
      return !prevState;
    });
  };

  const eventPopupHandler = () => {
    setEventOpen(true);
  };

  const selectMonthHandler = (month) => {
    const selectedMonth = new Date(
      currentDate?.setMonth(parseInt(months.indexOf(month)))
    );
    setCurrentDate(selectedMonth);
    setShowPopup(true);
  };

  const eventInfoHandler = (e) => {
    const { name, value } = e.target;
    setEventInfo((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const getEvents = (url) => {
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const postEvent = (url, newEvent) => {
    axios
      .post(url, newEvent)
      .then((res) => {
        console.log(res);
        // setEvents(res.data);
      })
      .then(() => {
        getEvents(url);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deleteEvent = () => {
    let url = "http://localhost:3016/events";
    axios
      .delete(`${url}/${modalId}`)
      .then((res) => {
        console.log(res);
      })
      .then(() => {
        setEventOpen(!eventOpen);
        setModalId(0);
        getEvents(url);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSubmit = async () => {
    let newEvent = {
      id: id,
      title: eventInfo.title,
      description: eventInfo.description,
      date: eventInfo.date,
      time: eventInfo.time,
      created: getFormattedDate(new Date()),
      updated: "",
    };
    const url = "http://localhost:3016/events";

    let editedEvent = {
      id: modalId,
      title: infoForEdit.title,
      description: infoForEdit.description,
      date: infoForEdit.date,
      time: infoForEdit.time,
      created: infoForEdit.created,
      updated: getFormattedDate(new Date()),
    };

    modalId === 0
      ? postEvent(url, newEvent)
      : await axios
          .put(`${url}/${modalId}`, editedEvent)
          .then((res) => {
            console.log(res);
            setEventInfo(res?.data);
          })
          .then(() => {
            getEvents(url);
          })
          .catch((err) => {
            console.log(err.message);
          });

    setModalId(0);
    setEventOpen(false);
    setEventInfo({
      title: "",
      description: "",
      date: "",
      time: "",
      created: "",
      updated: "",
    });
  };

  return (
    <div className="main-container">
      <h1>Carendar events</h1>
      <div className="date-filter">
        <div className="open-form" onClick={eventPopupHandler}>
          <FiPlusCircle size={30} color={"white"} fill="#439d9d" />
        </div>
        {eventOpen && (
          <EventPopup
            active={eventOpen}
            setActive={setEventOpen}
            handleSubmit={handleSubmit}
            modalId={modalId}
            setModalId={setModalId}
            deleteEvent={deleteEvent}
            eventInfo={eventInfo}
            setEventInfo={setEventInfo}
            infoForEdit={infoForEdit}
          >
            <div className="middleBoxPopup">
              <EventForm
                eventInfo={eventInfo}
                events={events}
                eventInfoHandler={eventInfoHandler}
                modalId={modalId}
                infoForEdit={infoForEdit}
                setInfoForEdit={setInfoForEdit}
              />
            </div>
          </EventPopup>
        )}
        <div className="filter-control" onClick={prevMonth}>
          <IoIosArrowBack size={20} />
        </div>
        <div className="current-month">
          {months[currentMonth]} {currentYear}
        </div>
        <div className="filter-control" onClick={nextMonth}>
          <IoIosArrowForward size={20} />
        </div>
        <div className="datepicker-wrap" onClick={togglePopupHandler}>
          <MdDateRange size={20} />

          {showPopup && (
            <ModalPopup
              date={currentDate}
              // year={currentYear}
              setShowPopup={setShowPopup}
              showPopup={showPopup}
            >
              <DatePicker
                prevYear={prevYear}
                currentYear={currentYear}
                nextYear={nextYear}
                currentMonth={currentMonth}
                selectMonthHandler={selectMonthHandler}
              />
            </ModalPopup>
          )}
        </div>
      </div>
      <Daysgrid
        date={currentDate}
        changeCurrentDay={changeCurrentDay}
        events={events}
        setEventOpen={setEventOpen}
        setModalId={setModalId}
      />
    </div>
  );
};
