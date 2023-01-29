describe('My First Test', () => {
    it('login', () => {
        cy.visit('http://127.0.0.1:5173/')
        // 注册
        cy.get('.register').click()
        cy.get('.account').type('admin')
        cy.get('.password').type('123456')
        cy.get('.checkPassword').type('123456')
        cy.get('.ant-btn').click()
        // 登录
        cy.get('.account').type('admin')
        cy.get('.password').type('123456')
        cy.get('.ant-btn').click()
        // 增
        cy.get('.addTodo')
          .type('吃饭').type('{enter}')
          .type('睡觉').type('{enter}')
          .type('打豆豆').type('{enter}')
        // 切换状态
        cy.get('.list-wrapper .undone [type="checkbox"]').first().check()
        cy.get('.list-wrapper .undone [type="checkbox"]').first().check()
        cy.get('.list-wrapper .done [type="checkbox"]').first().uncheck()
        // 修改内容
        cy.get('.list-wrapper .undone .ant-input').first().type('abc').type('{enter}')
        // 查
        cy.get('.search input').type('a').clear()
        // 删
        cy.get('.list-wrapper .undone .del').first().click()
        // 退出
        cy.get('.exit').click()
    });
});
