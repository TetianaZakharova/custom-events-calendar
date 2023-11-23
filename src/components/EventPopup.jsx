import { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import "./eventPopup.scss";

export const EventPopup = ({
  children,
  active,
  setActive,
  handleSubmit,
  deleteEvent,
  modalId,
  setModalId,
  eventInfo,
  setEventInfo,
  infoForEdit,
}) => {
  const [disableBtn, setDisableBtn] = useState(true);

  const closeModal = () => {
    setActive(!active);
    setModalId(0);
    setEventInfo({
      title: null,
      description: "",
      date: "",
      time: "",
    });
  };

  useEffect(() => {
    modalId === 0 && eventInfo.title !== "" && eventInfo.date !== ""
      ? setDisableBtn(false)
      : setDisableBtn(true);
  }, [eventInfo.title, eventInfo.date, modalId]);

  useEffect(() => {
    modalId !== 0 && infoForEdit.title !== "" && infoForEdit.date !== ""
      ? setDisableBtn(false)
      : setDisableBtn(true);
  }, [infoForEdit.title, infoForEdit.date, modalId]);

  return (
    <div className="event-popup">
      <div className="popup-header">
        <span className="close-btn">
          <IoCloseOutline size={20} onClick={closeModal} />
        </span>
      </div>
      {children}
      <div className="popup-footer">
        {modalId !== 0 && (
          <div
            className="delete_btn" 
            onClick={deleteEvent}
          >
            <MdDelete size={18} color="white" />
          </div>
        )}
        <button
          className="save_btn"
          type="button"
          onClick={handleSubmit}
          name="createconnector"
          disabled={disableBtn}
        >
          {modalId === 0 ? "SAVE" : "UPDATE"}
        </button>
      </div>
    </div>
  );
};
