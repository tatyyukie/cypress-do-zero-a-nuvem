Cypress.Commands.add("fillMandatoryFieldsAndSubmit", (data = { 
    firstName: "Batata", 
    lastName: "Teste", 
    email: "batata@teste.com", 
    text: "Teste"
}) => {
    cy.get('[name="firstName"]').type(data.firstName);
    cy.get('[name="lastName"]').type(data.lastName);
    cy.get('[type="email"]').type(data.email);
    cy.get('[name="open-text-area"]').type(data.text);
    cy.contains("button", "Enviar").click();
});