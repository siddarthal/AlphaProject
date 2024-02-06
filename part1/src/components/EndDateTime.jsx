import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function EndDateTime({ value, handelDateChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker ", "DatePicker "]}>
        <DatePicker
          label="Enter End date time"
          defaultValue={dayjs(new Date())}
          value={value}
          onChange={(newValue) => handelDateChange(newValue, "endDate")}
          sx={{ width: "100%" }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
