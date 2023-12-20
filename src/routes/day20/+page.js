export async function load({ fetch }) {
  const promise = await fetch('https://advent.sveltesociety.dev/data/2023/day-twenty.json');
  const jokes = await promise.json();

  return { jokes };
}
