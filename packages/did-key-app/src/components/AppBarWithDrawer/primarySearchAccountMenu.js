import history from "../../store/history";

const primarySearchAccountMenu = [
  {
    label: "Keystore",
    onClick: () => {
      history.push("/keystore");
    }
  },

  {
    label: "Home",
    onClick: () => {
      history.push("/");
    }
  }
];

export default primarySearchAccountMenu;
