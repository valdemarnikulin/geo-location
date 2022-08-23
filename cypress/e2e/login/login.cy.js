import AuthorizationPage from "./src/pages/AuthorizationPage";
import store from "@/store/index";
// import signUpData from "../fixtures/user.json";

describe("NavHeader.cy.js", () => {
  beforeEach(() => {
    cy.mount(AuthorizationPage, {
      store,
    });
  });

  //   it("Should create user", () => {
  //     cy.visit("https://localhost:8080");

  //     cy.get("#email").type(signUpData.email);

  //     cy.get("#password").type(signUpData.password);

  //     cy.get("#btn-submit").click();
  //   });
});
