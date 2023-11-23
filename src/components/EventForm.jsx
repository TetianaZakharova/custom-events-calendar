import TextField from "@mui/material/TextField";
import "./eventForm.scss";

export const EventForm = ({
  events,
  eventInfo,
  eventInfoHandler,
  handleSubmit,
  modalId,
  infoForEdit,
  setInfoForEdit,
}) => {
  const editInforHandler = (e) => {
    const { name, value } = e.target;
    setInfoForEdit((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const updatedTime = events.filter((event) => event?.id === infoForEdit?.id)[0]
    ?.updated;

  return (
    <div>
      <form onSubmit={handleSubmit} className="event-form" id={modalId}>
        <h4 className="event-title">
          {modalId === 0 ? "Add new idea item" : "Edit idea item"}
        </h4>
        {modalId !== 0 && (
          <p className="edit-time">
            {updatedTime === ""
              ? `Created at ${infoForEdit.created}`
              : `Updated at ${updatedTime}`}
          </p>
        )}
        <TextField
          required
          id="title"
          name="title"
          label="Title:"
          placeholder="Title goes here"
          value={modalId === 0 ? eventInfo.title : infoForEdit.title}
          onChange={(e) => {
            modalId === 0 ? eventInfoHandler(e) : editInforHandler(e);
          }}
          variant="standard"
          fullWidth
        />
        <TextField
          id="description"
          name="description"
          label="Description"
          value={
            modalId === 0 ? eventInfo.description : infoForEdit.description
          }
          onChange={(e) => {
            modalId === 0 ? eventInfoHandler(e) : editInforHandler(e);
          }}
          variant="standard"
          multiline
          rows={2}
          fullWidth
        />
        <label className="eventdate-label">
          Date*
          <input
            className="date"
            required
            id="date"
            type="date"
            name="date"
            value={modalId === 0 ? eventInfo.date : infoForEdit.date}
            onChange={(e) => {
              modalId === 0 ? eventInfoHandler(e) : editInforHandler(e);
            }}
          />
        </label>
        <label className="eventdate-label ">
          Begin time
          <input
            id="time"
            type="time"
            name="time"
            onChange={(e) => {
              modalId === 0 ? eventInfoHandler(e) : editInforHandler(e);
            }}
            value={modalId === 0 ? eventInfo.time : infoForEdit.time}
          />
        </label>
      </form>
    </div>
  );
};
