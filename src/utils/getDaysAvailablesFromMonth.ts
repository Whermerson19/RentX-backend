import { getDaysInMonth, isWithinInterval } from "date-fns";

export default function getDaysAvailablesFromMonth(
  vDate: Date,
  startDate: Date,
  endDate: Date
) {
  const teste = isWithinInterval(vDate, { start: startDate, end: endDate });

  console.log(teste)
  console.log({
    'vDate': vDate,
    'start': startDate,
    'end': endDate
  })
}
