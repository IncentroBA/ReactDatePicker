import "./ui/ReactDatePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { createElement, useEffect, useState } from "react";
import DatePicker from "react-date-picker";

export function ReactDatePicker({
    autoFocus,
    autoSelectToday,
    dateAttr,
    dayPlaceholder,
    monthPlaceholder,
    onChangeAction,
    readOnlyStyle,
    showLeadingZeros,
    yearPlaceholder,
    ...rest
}) {
    const id = rest.id || "";
    const style = rest.class || "";
    const widgetName = rest.name || "";
    const [currentValue, setCurrentValue] = useState(() => {
        if (dateAttr.status === "available" && dateAttr.displayValue) {
            return dateAttr.displayValue;
        }
        return autoSelectToday ? new Date() : null;
    });
    const [disabledValue, setDisabledValue] = useState(false);

    useEffect(() => {
        if (dateAttr.status === "available") {
            if (currentValue) {
                dateAttr.setValue(new Date(currentValue));
            } else if (dateAttr.displayValue) {
                setCurrentValue(dateAttr.displayValue);
            }

            if (dateAttr.readOnly === true) {
                setDisabledValue(true);
            }

            if (dateAttr.readOnly === true) {
                setDisabledValue(true);
            }
        }
    }, [autoFocus, currentValue, dateAttr]);

    function onChangeInputAction(event) {
        if (onChangeAction && onChangeAction.canExecute) {
            onChangeAction.execute();
        }
    }

    if (disabledValue && disabledValue === true && readOnlyStyle === "text") {
        return (
            <div className={`react-date-picker ${style}`}>
                <p className={`${widgetName} form-control-static`}>{currentValue || dateAttr.displayValue}</p>
            </div>
        );
    } else {
        return (
            <div className={`react-date-picker ${style}`}>
                {autoFocus === false && <button className="react-date-picker-faux-btn"></button>}
                <DatePicker
                    autoFocus={autoFocus}
                    showLeadingZeros={showLeadingZeros}
                    isOpen={autoFocus}
                    calendarAriaLabel="Toggle calendar"
                    className="form-control"
                    clearAriaLabel="Clear value"
                    disableCalendar={disabledValue}
                    disabled={disabledValue}
                    id={id}
                    onChange={date => {
                        onChangeInputAction();
                        setCurrentValue(date ? new Date(date) : "");
                    }}
                    value={currentValue}
                    dayPlaceholder={dayPlaceholder}
                    monthPlaceholder={monthPlaceholder}
                    yearPlaceholder={yearPlaceholder}
                />
            </div>
        );
    }
}
