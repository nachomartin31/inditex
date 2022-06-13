export default function checkExpiration() {
  Object.entries(localStorage).forEach((entry) => {
    const { expiration } = (JSON.parse(entry[1]));

    const date = new Date();
    const parsedExpiration = Date.parse(expiration);
    const parsedCurrentDate = Date.parse(date.toUTCString());
    if (parsedCurrentDate >= parsedExpiration) localStorage.removeItem(entry[0]);
  });
}
