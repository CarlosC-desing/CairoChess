export const WHATSAPP_NUMBER = '584125550142';

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const INSTAGRAM_URL = 'https://www.instagram.com/academiachees7?igsh=MXR5cTIxbHEwZ3JubQ==';

export const ACADEMY_ADDRESS = 'Carrera 7 entre calles 16 y 17, Yaritagua, Yaracuy';

export const ACADEMY_SCHEDULE = [
  { day: 'Lunes', short: 'L', morning: true, afternoon: true },
  { day: 'Martes', short: 'M', morning: true, afternoon: true },
  { day: 'Miércoles', short: 'X', morning: false, afternoon: false },
  { day: 'Jueves', short: 'J', morning: true, afternoon: true },
  { day: 'Viernes', short: 'V', morning: true, afternoon: true },
  { day: 'Sábado', short: 'S', morning: false, afternoon: false },
  { day: 'Domingo', short: 'D', morning: false, afternoon: false },
] as const;
