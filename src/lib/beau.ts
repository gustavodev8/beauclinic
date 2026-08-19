export const TRINKS_URL = "https://www.trinks.com/a-beau-clinic-";
export const INSTAGRAM_URL = "https://instagram.com/beauclinc";
export const WHATSAPP_URL = "https://wa.me/5571997230824";
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Rua+Marcelo+L.+Pereira,+50,+Alagoinhas+-+BA";

export const procedures = [
  { title: ["Micropigmentação", "de sobrancelhas"] },
  { title: ["Micropigmentação", "labial"] },
  { title: ["Sobrancelhas"] },
  { title: ["Estética facial"] },
];

export function openBooking() {
  window.dispatchEvent(new CustomEvent("beau:open-booking"));
}
