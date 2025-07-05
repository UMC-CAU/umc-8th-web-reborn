describe("todo 통합 테스트", () => {
  it("할 일을 추가하고, 체크박스를 클릭해서, 완료여부를 바꾸자.", () => {
    // 1. 메인 페이지 접속
    cy.visit("/");

    // 2. 리스트 로딩을 기다리자.
    cy.findAllByRole("checkbox").should("have.length", 2);

    // 3. 할 일 추가한다.
    cy.findByRole("textbox").as("todoInput");
    cy.get("@todoInput").type("할 일 추가");
    cy.findByRole("button", { name: "추가" }).click();
    cy.get("@todoInput").should("have.value", "");

    // 4. 체크박스가 잘 동작하는지.
    cy.findByText("할 일 추가").should("exist").as("todoItem");
    cy.get("@todoItem").click();
    cy.findByLabelText("할 일 추가").should("be.checked");

    // 5. 삭제하는 로직
    // cy.findByText("할 일 추가").parent().find("button").click();
    cy.findByTestId("delete-button-1").click();
    cy.findAllByRole("checkbox").should("have.length", 2);
  });
});
