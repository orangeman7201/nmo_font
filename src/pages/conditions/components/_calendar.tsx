
import dayjs, { Dayjs } from "dayjs";


// 日付を配列で保存する関数
const calendarByWeek = (targetMonth: string) => {
  const startDate: Dayjs = dayjs(targetMonth);
  const endDate = startDate.endOf('month');
  const monthDates = [];
  let currentDate = startDate;

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'date')) {
    monthDates.push(currentDate);
    currentDate = currentDate.add(1, 'day');
  }

  // 日曜日始まりの週ごとに分割する
  const calendarByWeek: Dayjs[][] = [];
  let currentWeek: Dayjs[] = [];
  monthDates.forEach((date) => {
    if (date.day() === 0) {
      // 日曜日の場合は新しい週を作成
      calendarByWeek.push(currentWeek);
      currentWeek = [date];
    } else {
      // 日曜日以外の場合は既存の週に日付を追加
      currentWeek.push(date);
    }
  });
  calendarByWeek.push(currentWeek);

  // 日曜日始まりの週の最初の週に前月の日付を追加
  const firstWeek = calendarByWeek[0];
  const daysToFill = 7 - firstWeek.length;
  for (let i = 1; i <= daysToFill; i++) {
    firstWeek.unshift(startDate.subtract(i, 'day'));
  }

  // 日曜日始まりの週の最後の週に翌月の日付を追加
  const lastWeek = calendarByWeek[calendarByWeek.length - 1];
  const lastDate = lastWeek[lastWeek.length - 1];
  const daysToFillLast = 7 - lastWeek.length;
  for (let i = 1; i <= daysToFillLast; i++) {
    lastWeek.push(lastDate.add(i, 'day'));
  }

  return calendarByWeek;
}

export default function Calendar({ targetMonth }: { targetMonth: string }) {
  return (
    <div>
      <div className="mb-8">カレンダーです</div>
      <div>targetMonth: {targetMonth}</div>
      <div>calendar:
        {calendarByWeek(targetMonth).map((week, index) => (
          <div key={index}>
            {week.map(date => (
              <div key={date.format('YYYY-MM-DD')}>{date.format('YYYY-MM-DD')}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
