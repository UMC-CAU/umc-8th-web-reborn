describe("로그인을 하지 않은 경우에 접근할 수 없는 ProtectedRoute 기능을 테스트합니다.", () => {
  it("로그인을 하지 않은 경우에 접근할 수 없는 ProtectedRoute 기능을 테스트합니다.", () => {
    cy.visit("/profile");
    cy.url().should("include", "/login");
  });

  it("로그인을 한 경우, 보호된 페이지에 접근하면, 해당 페이지로 이동합니다.", () => {
    // 로그인이 성공하는 케이스
    cy.login();

    cy.url().should("include", "/");
    cy.findByRole("link", { name: "프로필" }).click();

    cy.url().should("include", "/profile");

    // 로그인이 실패하는 케이스
    cy.visit("/profile");
    cy.url().should("include", "/login");
  });
});
