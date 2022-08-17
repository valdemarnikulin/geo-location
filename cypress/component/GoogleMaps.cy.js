// import GoogleMaps from "@/components/GoogleMaps";
// describe("GoogleMaps.cy.js", () => {
//   it("my unit test", () => {
//     // Arrange
//     cy.mount(GoogleMaps);
//     // Assert
//   });
//   //   it("has loading, newTodo and todos properties", () => {
//   //     const getStore = () => cy.window().its("app.$store");
//   //     getStore().its("state").should("have.keys", ["status"]);
//   //   });
// });
import store from "@/store/index";
import GoogleMaps from "@/components/GoogleMaps";
describe("Goole maps", () => {
  beforeEach(() => {});
  const drawBtn = "#draw-btn";
  //   it.only("mount google maps component", () => {
  //     cy.mount(GoogleMaps, {
  //       store,
  //     });
  //   });
  it("check button draw", () => {
    cy.mount(GoogleMaps, {
      store,
    });

    cy.get(drawBtn).should("have.text", " Draw area");
  });
});
