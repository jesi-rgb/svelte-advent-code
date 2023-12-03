export type Present = {
  id: number;
  name: string;
  weight: number;
  isChecked: boolean;
};

export async function load({ fetch }) {
  let url = 'https://advent.sveltesociety.dev/data/2023/day-three.json';

  let promise: Promise<Present[]> = await fetch(url);
  let data: Present[] = await promise.json();
  data.map((p: Present) => (p.isChecked = false));
  data.map((p: Present, i) => (p.id = i));
  return { data };
}
