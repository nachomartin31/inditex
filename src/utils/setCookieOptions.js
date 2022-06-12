export default function setCookieOptions() {
  const date = new Date();
  const time = date.getTime();
  const expiration = time + (1000 * 3600);
  date.setTime(expiration);
  return { path: `/`, expires: date };
}
