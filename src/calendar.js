import PropTypes from "prop-types";
import classNames from "classnames";
import { useState } from "react";
import {
  daysOfWeek,
  createDaysForCurrentMonth,
  createDaysForNextMonth,
  createDaysForPreviousMonth,
  isWeekendDay,
  getMonthDropdownOptions,
  getYearDropdownOptions
} from "./helpers";

Calendar.propTypes = {
  className: PropTypes.string,
  yearAndMonth: PropTypes.arrayOf(PropTypes.number).isRequired, // e.g. [2021, 6] for June 2021
  onYearAndMonthChange: PropTypes.func.isRequired,
  renderDay: PropTypes.func
};
export default function Calendar({
  className = "",
  starM,
  starY,
  stars = [],
  yearAndMonth = [2021, 6],
  onYearAndMonthChange,
  renderDay = () => null
}) {
  const [someThing, setSomeThing] = useState();
  const [year, month] = yearAndMonth;
  const starObjectMonth = stars.find((star) => star.Star_Centre === starM);
  const starObjectYear = stars.find((star) => star.Star_Centre === starY);
  console.log(starObjectMonth);
  console.log(starObjectYear);
  let currentMonthDays = createDaysForCurrentMonth(year, month);
  let previousMonthDays = createDaysForPreviousMonth(
    year,
    month,
    currentMonthDays
  );
  let nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays);
  let calendarGridDayObjects = [
    ...previousMonthDays,
    ...currentMonthDays,
    ...nextMonthDays
  ];

  const handleMonthNavBackButtonClick = () => {
    let nextYear = year;
    let nextMonth = month - 1;
    if (nextMonth === 0) {
      nextMonth = 12;
      nextYear = year - 1;
    }
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  const handleMonthNavForwardButtonClick = () => {
    let nextYear = year;
    let nextMonth = month + 1;
    if (nextMonth === 13) {
      nextMonth = 1;
      nextYear = year + 1;
    }
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  const handleMonthSelect = (evt) => {
    let nextYear = year;
    let nextMonth = parseInt(evt.target.value, 10);
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  const handleYearSelect = (evt) => {
    let nextMonth = month;
    let nextYear = parseInt(evt.target.value, 10);
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  const handleStarClick = () => {

  }

  return (
    <div className="calendar-root">
      <div className="navigation-header">
        <div className="month-nav-arrow-buttons">
          <button onClick={handleMonthNavBackButtonClick}> prev </button>
          <button onClick={handleMonthNavForwardButtonClick}>next</button>
        </div>
        <select
          className="month-select"
          value={month}
          onChange={handleMonthSelect}
        >
          {getMonthDropdownOptions().map(({ label, value }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          className="year-select"
          value={year}
          onChange={handleYearSelect}
        >
          {getYearDropdownOptions(year).map(({ label, value }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="calendar-header">
                <h1>BAZICHIC’S GOOD DATES PLANNER</h1>
                <h1>APRIL 2022</h1>
                <h2>甲辰 WOOD DRAGON</h2>
            </div>
      <div className="calendar-container">
        <div className="calendar-main">
            <div className="days-of-week">
                {daysOfWeek.map((day, index) => (
                <div
                    key={day}
                    className={classNames("day-of-week-header-cell", {
                    "weekend-day": [6, 0].includes(index)
                    })}
                >
                    {day}
                </div>
                ))}
            </div>
            <div className="days-grid">
                {calendarGridDayObjects.map((day) => (
                <div
                    key={day.dateString}
                    className={classNames("day-grid-item-container", {
                    "weekend-day": isWeekendDay(day.dateString),
                    "current-month": day.isCurrentMonth
                    })}
                    onClick={() => setSomeThing(day.dateString)}
                >
                    <div className="day-content-wrapper">{renderDay(day)}</div>
                </div>
                ))}
            </div>
        </div>
        <div className="calendar-sidebar">
            <h3>Flying Stars</h3>
            <h3>April 5 - May 4</h3>
            <div className="c-box-container">
            <div className="c-box">
                <h4 className="c-box-title">SE</h4>
                <h4 className="c-box-title"></h4>
                <h4 className="c-box-title">S</h4>
                <h4 className="c-box-title"></h4>
                <h4 className="c-box-title">SW</h4>

                <h4 className="c-box-title"></h4>
                <h4>{starObjectYear?.SE}<sup>{starObjectMonth?.SE}</sup></h4>
                <h4>{starObjectYear?.S}<sup>{starObjectMonth?.S}</sup></h4>
                <h4>{starObjectYear?.SW}<sup>{starObjectMonth?.S}</sup></h4>
                <h4 className="c-box-title"></h4>

                <h4 className="c-box-title">E</h4>
                <h4>{starObjectYear?.E}<sup>{starObjectMonth?.E}</sup></h4>
                <h4>{starObjectYear?.Star_Centre}<sup>{starObjectMonth?.Star_Centre}</sup></h4>
                <h4>{starObjectYear?.W}<sup>{starObjectMonth?.W}</sup></h4>
                <h4 className="c-box-title">W</h4>

                <h4 className="c-box-title"></h4>
                <h4>{starObjectYear?.NE}<sup>{starObjectMonth?.NE}</sup></h4>
                <h4>{starObjectYear?.N}<sup>{starObjectMonth?.N}</sup></h4>
                <h4>{starObjectYear?.NW}<sup>{starObjectMonth?.NW}</sup></h4>
                <h4 className="c-box-title"></h4>

                <h4 className="c-box-title">NE</h4>
                <h4 className="c-box-title"></h4>
                <h4 className="c-box-title">N</h4>
                <h4 className="c-box-title"></h4>
                <h4 className="c-box-title">NW</h4>
            </div>
            </div>
            <h3>董公择日</h3>
            <h3>Dong Gong Rating</h3>
            <div className="c-rating">
                <h4 className="c-rating-1"></h4>
                <h4>Excellent</h4>
                <h4 className="c-rating-2"></h4>
                <h4>Auspicious</h4>
                <h4 className="c-rating-3"></h4>
                <h4>Fail</h4>
                <h4 className="c-rating-4"></h4>
                <h4>Bad</h4>
            </div>
        </div>
      </div>
    </div>
  );
}

CalendarDayHeader.propTypes = {
  calendarDayObject: PropTypes.object.isRequired
};
export function CalendarDayHeader({ calendarDayObject }) {
  return (
    <div className="day-grid-item-header">{calendarDayObject.dayOfMonth}</div>
  );
}
