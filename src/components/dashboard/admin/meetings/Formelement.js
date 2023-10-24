import React from 'react'

export default function Formelement({currmeeting, setcurrmeeting}) {

  const handleButtonClick = (e) => {
    e.stopPropagation();
  };


  const handletitle = (e) => {
    setcurrmeeting({
      ...currmeeting,
      title: e.target.value,
    });
  };

  const handledate = (e) => {
    setcurrmeeting({
      ...currmeeting,
      date: e.target.value,
    });
  };

  const handletime = (e) => {
    setcurrmeeting({
      ...currmeeting,
      time: e.target.value,
    });
  };

  const handleattendees = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setcurrmeeting((prevDetails) => {
      if (isChecked) {
        return {
          ...prevDetails,
          attendees: [...prevDetails.attendees, value],
        };
      } else {
        return {
          ...prevDetails,
          attendees: prevDetails.attendees.filter((attendee) => attendee !== value),
        };
      }
    });
  };


  return (
    <div>
      <div className="modal-body">
        <div className="form-group">
            <label htmlFor="meetingTitle">Title</label>
            <input type="text" value = {currmeeting.title} onChange={handletitle} className="form-control" id="meetingTitle" placeholder="Enter meeting title" />
        </div>
        <div className="form-group">
            <label htmlFor="meetingDate">Date</label>
            <input type="date" value = {currmeeting.date} onChange={handledate} className="form-control" id="meetingDate" />
        </div>
        <div className="form-group mb-3">
            <label htmlFor="meetingTime">Time</label>
            <input type="time" value = {currmeeting.time} onChange = {handletime} className="form-control" id="meetingTime" />
        </div>

        <div className="accordion mb-3" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button btn-sm" onClick = {handleButtonClick} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Attendees
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
              <div className="accordion-body" >
                <div className="form-check">
                  <input className="form-check-input" onChange = {handleattendees} checked = {currmeeting.attendees.includes('Mentors')} type="checkbox" value="Mentors" id="mentorCheck" />
                  <label className="form-check-label" htmlFor="mentorCheck">
                    Mentors
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" onChange={handleattendees} checked = {currmeeting.attendees.includes('Mentees')} type="checkbox" value="Mentees" id="menteeCheck" />
                  <label className="form-check-label" htmlFor="menteeCheck">
                    Mentees
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
