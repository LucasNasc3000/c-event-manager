export function DateTime() {
  const date = new Date();
  const dateTime: string[] = [];

  const loginTime = date.toLocaleTimeString('pt-BR', {
    hour12: false,
  });

  const loginDate = date.toLocaleDateString('pt-BR', {
    dateStyle: 'short',
  });

  dateTime.push(loginDate, loginTime);

  return dateTime;
}
