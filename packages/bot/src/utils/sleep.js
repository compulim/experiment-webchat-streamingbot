export default function sleep(intervalInMilliseconds = 10) {
  return new Promise(resolve => setTimeout(resolve, intervalInMilliseconds));
}
