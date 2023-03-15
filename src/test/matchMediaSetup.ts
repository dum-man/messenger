const matchMediaSetup = () => {
  return (window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {},
      };
    });
};

export default matchMediaSetup;
