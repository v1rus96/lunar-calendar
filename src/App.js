import "./styles.css";
import { useState, useEffect } from "react";
import Calendar, { CalendarDayHeader } from "./calendar.js";
import * as XLSX from "xlsx";
import { getJsDateFromExcel } from "excel-date-to-js";

export default function App() {
  const [yearAndMonth, setYearAndMonth] = useState([2022, 9]);
  const [items, setItems] = useState([]);
  const [stars, setStars] = useState([]);
  const [startM, setStarM] = useState();
  const [dayElement, setDayElement] = useState();
  const [startY, setStarY] = useState();
  let foundData;
  let color;

  //on init load the excel file

  useEffect(() => {
    var file = new File([""], window.location.origin + "/DataLunar.xlsx", { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    fetch(window.location.origin + "/DataLunar.xlsx")
      .then((res) => res.arrayBuffer())
      .then((data1) => {
        const workbook = XLSX.read(data1, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        const workbook2 = XLSX.read(data1, { type: "buffer" });
        const sheetStars = workbook2.SheetNames[1];
        const worksheetStars = workbook2.Sheets[sheetStars];
        const dataStars = XLSX.utils.sheet_to_json(worksheetStars);
        setStars(dataStars);
        setItems(data);
      });
  });

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
        console.log(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    const promise2 = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[1];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });

    promise2.then((b) => {
      setStars(b);
    });
  };

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  function ExcelDateToJSDate(serial) {
    console.log(serial);
    var utc_days  = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;                                        
    var date_info = new Date(utc_value * 1000);
 
    var fractional_day = serial - Math.floor(serial) + 0.0000001;
 
    var total_seconds = Math.floor(86400 * fractional_day);
 
    var seconds = total_seconds % 60;
 
    total_seconds -= seconds;
 
    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;
 
    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
 }

  const findItem = (date) => {
    const item = items.find((i) => formatDate(getJsDateFromExcel(i.Date)) === date);
    item ? foundData = item : foundData = null;
    return item ? formatDate(getJsDateFromExcel(item?.Date)) : "";
  }

  return (
    <div className="App">
      {/* <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          console.log(file);
          readExcel(file);
        }}
      /> */}
      <Calendar
        yearAndMonth={yearAndMonth}
        onYearAndMonthChange={setYearAndMonth}
        starM={startM}
        starY={startY}
        dayElement={dayElement}
        stars={stars}
        renderDay={(calendarDayObject) => (

                <div className="c-top-container">
                  
                    {findItem(calendarDayObject.dateString) === calendarDayObject.dateString && (
                      <div className={`c-container ${foundData.Dong_Gong}`}>
                        {setStarM(foundData.Month_Star_Centre)}
                        {setStarY(foundData.Year_Star_Centre)}
                        {setDayElement(foundData.Year_Stem + foundData.Year_Branch + " " + foundData.Year_Element)}
                      <div className="c-item">
                        <CalendarDayHeader calendarDayObject={calendarDayObject} />
                      <div className="c-child-items">
                      <h4 className={`${foundData.Officers}`}>{foundData.Officers}</h4>
                      <h4>{foundData.Breaker}</h4>
                      </div>
                      <h4 className="lunar">{foundData.Lunar}</h4>
                      <h4 className="addon">{foundData.Day_Stem}</h4>
                      <h4 className="day-element">{foundData.Day_Element}</h4>
                      <h4 className="addon">{foundData.Day_Branch}</h4>
               
                    
                      </div>
                      </div>
                   )}

                  

          </div>
        )}
      />
    </div>
  );
}