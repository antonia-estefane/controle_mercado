INSERT INTO clientes (nome, slug, cpf, endereco, telefone, createdAt, updatedAt) VALUES
    ('Cliente 1', 'cliente-1', '111.111.111-11', 'Rua Cliente 1, Cidade 1', '(11) 1111-1111', NOW(), NOW()),
    ('Cliente 2', 'cliente-2', '222.222.222-22', 'Rua Cliente 2, Cidade 2', '(22) 2222-2222', NOW(), NOW()),
    ('Cliente 3', 'cliente-3', '333.333.333-33', 'Rua Cliente 3, Cidade 3', '(33) 3333-3333', NOW(), NOW()),
    ('Cliente 4', 'cliente-4', '444.444.444-44', 'Rua Cliente 4, Cidade 4', '(44) 4444-4444', NOW(), NOW()),
    ('Cliente 5', 'cliente-5', '555.555.555-55', 'Rua Cliente 5, Cidade 5', '(55) 5555-5555', NOW(), NOW()),
    ('Cliente 6', 'cliente-6', '666.666.666-66', 'Rua Cliente 6, Cidade 6', '(66) 6666-6666', NOW(), NOW()),
    ('Cliente 7', 'cliente-7', '777.777.777-77', 'Rua Cliente 7, Cidade 7', '(77) 7777-7777', NOW(), NOW()),
    ('Cliente 8', 'cliente-8', '888.888.888-88', 'Rua Cliente 8, Cidade 8', '(88) 8888-8888', NOW(), NOW()),
    ('Cliente 9', 'cliente-9', '999.999.999-99', 'Rua Cliente 9, Cidade 9', '(99) 9999-9999', NOW(), NOW()),
    ('Cliente 10', 'cliente-10', '101.010.101-00', 'Rua Cliente 10, Cidade 10', '(10) 1010-1010', NOW(), NOW());

INSERT INTO produtos (nome_produto, slug, preco_venda, preco_custo, qtd_estoque, categoriaId, fornecedor, createdAt, updatedAt) VALUES
    ('Produto 1', 'produto-1', 19.99, 9.99, 100, '1', 'Fornecedor 1', NOW(), NOW()),
    ('Produto 2', 'produto-2', 29.99, 14.99, 50, '1', 'Fornecedor 2', NOW(), NOW()),
    ('Produto 3', 'produto-3', 49.99, 24.99, 75, '1', 'Fornecedor 3', NOW(), NOW()),
    ('Produto 4', 'produto-4', 39.99, 19.99, 120, '1', 'Fornecedor 4', NOW(), NOW()),
    ('Produto 5', 'produto-5', 59.99, 29.99, 60, '1', 'Fornecedor 5', NOW(), NOW()),
    ('Produto 6', 'produto-6', 69.99, 34.99, 90, '1', 'Fornecedor 6', NOW(), NOW()),
    ('Produto 7', 'produto-7', 24.99, 12.99, 80, '1', 'Fornecedor 7', NOW(), NOW()),
    ('Produto 8', 'produto-8', 34.99, 16.99, 70, '2', 'Fornecedor 8', NOW(), NOW()),
    ('Produto 9', 'produto-9', 44.99, 22.99, 55, '2', 'Fornecedor 9', NOW(), NOW()),
    ('Produto 10', 'produto-10', 54.99, 27.99, 95, '2', 'Fornecedor 10', NOW(), NOW());