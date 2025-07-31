const formatting = (val, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!val) return '';
  const date = new Date(val);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  let formatted = format;
  formatted = formatted.replace('YYYY', year);
  formatted = formatted.replace('MM', month);
  formatted = formatted.replace('DD', day);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  formatted = formatted.replace('HH', hours);
  formatted = formatted.replace('mm', minutes);
  formatted = formatted.replace('ss', seconds);
  return formatted;
};
export default {
  ASSETSURL: 'https://cdn1.vrupup.com/s/1549/img/',
  formatting,
};
