import { watch } from "browser-sync";

const render = (req, res) => {
  res.render("meat");
};

export default { render };
