const CheckAuth = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user : null;
};

export { CheckAuth };
