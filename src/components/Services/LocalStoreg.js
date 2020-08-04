export const sendStoregData = (data) => {
  localStorage.setItem("storege", JSON.stringify(data));
};

export const getStoregData = () => {
  if (JSON.parse(localStorage.getItem("storege")) !== null) {
    return JSON.parse(localStorage.getItem("storege"));
  } else {
    return [];
  }
};
