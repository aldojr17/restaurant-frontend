const useIsLogged = () => {
  const isLogged = localStorage.getItem("sessionId");

  return isLogged !== null;
};

export default useIsLogged;
