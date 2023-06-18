const useTheme = () => {
  const themeColor = [
    [
      { color: "#e96443", stop: 0 },
      { color: "#904e95", stop: 100 },
    ],
    [
      { color: "#A6FFCB", stop: 0 },
      { color: "#12D8FA", stop: 50 },
      { color: "#1FA2FF", stop: 100 },
    ],
    [
      { color: "#003973", stop: 0 },
      { color: "#E5E5BE", stop: 100 },
    ],
    [
      { color: "#485563", stop: 0 },
      { color: "#29323c", stop: 100 },
    ],
    [
      { color: "#8815bf", stop: 0 },
      { color: "#AA076B", stop: 50 },
      { color: "#ed0940", stop: 100 },
    ],
  ];
  return themeColor;
};

export default useTheme;
