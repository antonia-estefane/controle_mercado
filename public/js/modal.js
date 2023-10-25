document.addEventListener('DOMContentLoaded', function() {
    const abrirModalButtons = document.querySelectorAll('.abrir-modal');
  
    abrirModalButtons.forEach(button => {
      button.addEventListener('click', function() {
        const vendaId = button.getAttribute('data-venda-id');
        console.log('botao clicado')
  
        // Solicitar os detalhes da venda em JSON usando a nova rota
        fetch(`/admin/sale/${vendaId}`)
          .then(response => response.json())
          .then(data => {
            console.log(data)

            const clienteElement = document.querySelector('#clienteNome');
            const dataElement = document.querySelector('#dataVenda');
            const produtosTable = document.querySelector('#produtosTable');
  
            // Preencher os elementos na modal com os dados retornados
            clienteElement.innerHTML = `Cliente: ${data.sales.cliente.nome}`;
            dataElement.innerHTML = `Data: ${data.sales.data}`;
  
            // Limpar a tabela de produtos
            produtosTable.innerHTML = `
              <tr>
                <th>Produtos comprados</th>
                <th>Quantidade</th>
              </tr>
            `;
  
            // Adicionar linhas à tabela para os produtos comprados
            data.itens.forEach(item => {
              produtosTable.innerHTML += `
                <tr>
                  <td>${item.produto.nome_produto}</td>
                  <td>${item.quantity}</td>
                </tr>
              `;
            });
  
            // Abrir a modal
            $('#detalhesModal').modal('show');
          })
          .catch(error => {
            console.error('Erro ao obter detalhes da venda', error);
          });
      });
    });
  });
  