const getUser = () => JSON.parse(localStorage.getItem("user") ?? "");
const logOut = () => localStorage.clear();

export { getUser, logOut };
