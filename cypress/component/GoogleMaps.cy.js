import store from "@/store/index";
import GoogleMaps from "@/components/GoogleMaps";
describe("Goole maps", () => {
  beforeEach(() => {
    cy.mount(GoogleMaps, {
      store,
    });
  });

  const inputArea = ".inputs-areas";
  const map = "#gmap";
  const drawBtn = "#draw-btn";
  const saveArea = "#save_area";
  it("check all buttons on the component", () => {
    const geoLocate = "#geo-locate";
    cy.get(drawBtn).should("have.text", " Draw area");
    cy.get(geoLocate).should("be.visible");
  });

  it("check visible input for search", () => {
    const input = "#input_maps>input";
    cy.get(input).should("be.visible");
  });

  it("check visible input for area", () => {
    cy.get(drawBtn).click({
      timeout: 500,
    });
    cy.get(map).click();
    cy.get(inputArea).should("be.visible");
  });

  it("disabled button save name area", () => {
    cy.get(drawBtn).click();
    cy.get(map).click({
      timeout: 500,
    });
    cy.get(saveArea).should("be.disabled");
  });
});
