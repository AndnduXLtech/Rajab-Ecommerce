export function FormToJson(e) {
  if (typeof e?.preventDefault == "function") {
    e.preventDefault();
  }
  const formData = new FormData(e.target);
  const json = {};
  formData.forEach((value, key) => {
    if (value) {
      json[key] = value;
    }
  });
  return json;
}
