import NavHeader from "@/components/NavHeader";
import store from "@/store/index";

describe("NavHeader.cy.js", () => {
  beforeEach(() => {
    cy.mount(NavHeader, {
      store,
    });
  });
  const avatar = ".b-avatar";
  const userName = "#user-name>b";

  it("visible elements", () => {
    cy.get(avatar).should("be.visible");
    cy.get(userName).should("be.visible");
    cy.get(userName).should("have.text", "no name");
  });
});
