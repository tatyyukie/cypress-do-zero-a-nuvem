describe("Central de Atendimento ao Cliente TAT", () => {
    beforeEach(() => {
        cy.visit("./src/index.html");
    });

    it("verifica o título da aplicação", () => {
        cy.title().should("be.eq", "Central de Atendimento ao Cliente TAT");
    });

    it("preenche os campos obrigatórios e envia o formulário", () => {
        cy.get('[name="firstName"]').type("Tatiana");
        cy.get('[name="lastName"]').type("Motoyama");
        cy.get('[type="email"]').type("tatiana@teste.com");
        cy.get('[name="open-text-area"]').type("Teste");
        cy.contains("button", "Enviar").click();
        cy.get(".success").should("be.visible");
    });

    it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
        cy.get('[name="firstName"]').type("Tatiana");
        cy.get('[name="lastName"]').type("Motoyama");
        cy.get('[type="email"]').type("tatiana@teste,com");
        cy.get('[name="open-text-area"]').type("Teste");
        cy.contains("button", "Enviar").click();
        cy.get(".error").should("be.visible");
    });

    it("campo de telefone continua vazio quando preenchido com um valor não-numérico", () => {
        cy.get(':nth-child(2) > [name="phone"]')
            .type("abcde")
            .should("not.have.value", "abcde");
    });

    it.only("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
        cy.get('[name="firstName"]').type("Tatiana");
        cy.get('[name="lastName"]').type("Motoyama");
        cy.get('[type="email"]').type("tatiana@teste.com");
        cy.get('[name="open-text-area"]').type("Teste");
        cy.get('#check > [name="phone"]').check();
        cy.contains("button", "Enviar").click();
        cy.get(".error").should("be.visible");
    });

    it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
        cy.get('[name="firstName"]')
            .type("Tatiana")
            .should("have.value", "Tatiana")
            .clear()
            .should("have.value", "");
        cy.get('[name="lastName"]')
            .type("Motoyama")
            .should("have.value", "Motoyama")
            .clear()
            .should("have.value", "");
        cy.get('[type="email"]')
            .type("tatiana@teste.com")
            .should("have.value", "tatiana@teste.com")
            .clear()
            .should("have.value", "");
        cy.get(':nth-child(2) > [name="phone"]')
            .type("999999999")
            .should("have.value", "999999999")
            .clear()
            .should("have.value", "");
    });

    it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
        cy.contains("button", "Enviar").click();
        cy.get(".error").should("be.visible");
    });

    it("envia o formuário com sucesso usando um comando customizado", () => {
        cy.fillMandatoryFieldsAndSubmit();
        cy.get(".success").should("be.visible");
    });

    it("seleciona um produto (YouTube) por seu texto", () => {
        cy.get("#product").select("YouTube").should("have.value", "youtube");
    });

    it("seleciona um produto (Mentoria) por seu valor (value)", () => {
        cy.get("#product").select("mentoria").should("have.value", "mentoria");
    });

    it("seleciona um produto (Blog) por seu índice", () => {
        cy.get("#product").select(1).should("have.value", "blog");
    });

    it("marca o tipo de atendimento 'Feedback'", () => {
        cy.get('input[type="radio"][value="feedback"]').check();
    });

    it("marca cada tipo de atendimento", () => {
        cy.get('input[type="radio"]').each((tipoServico) => {
            cy.wrap(tipoServico).check().should("be.checked");
        });
    });

    it("marca ambos checkboxes, depois desmarca o último", () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should("be.checked")
            .last()
            .uncheck()
            .should("not.be.checked");
    });
});
