import $ from "jquery";
const createState = (stateObj) => {
  return new Proxy(stateObj, {
    set(target, property, value) {
      target[property] = value;
      render();
      return true;
    },
  });
};

const state = createState({
  name: "",
});

const listeners = document.querySelectorAll("[bit-data]");

listeners.forEach((element) => {
  const name = element.getAttribute("bit-data");
  console.log(
    "here",
    element.getAttribute("bit-data"),
    JSON.stringify(element.dataset)
  );
  element.addEventListener("keyup", (event) => {
    state[name] = element.value;
    console.log(state);
  });
});

const render = () => {
  const bindings = Array.from(
    document.querySelectorAll("[bit-data-binding]")
  ).map((e) => {
    return e.getAttribute("bit-data-binding");
  });

  (bindings ?? []).forEach((binding) => {
    document.querySelector(`[bit-data-binding=${binding}]`).innerHTML =
      state[binding];
    document.querySelector(`[bit-data=${binding}]`).value = state[binding];
  });
};
