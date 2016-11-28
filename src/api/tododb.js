const baseUrl = 'http://beta.json-generator.com/api/json/get/NkTRl4rfM';

export function getTodoCategories() {
  return fetch(baseUrl)
    .then(res => res.json());
}
