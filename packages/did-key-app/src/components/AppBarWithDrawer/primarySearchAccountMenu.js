import history from "../../store/history";

const primarySearchAccountMenu = [
  {
    label: "Home",
    onClick: () => {
      history.push("/");
    }
  },
  {
    label: "Keystore",
    onClick: () => {
      history.push("/keystore");
    }
  },
  {
    label: "Source Code",
    onClick: () => {
      window.open("https://github.com/transmute-industries/did-key", "_blank");
    }
  }
];

export default primarySearchAccountMenu;
