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
            const precoTotal = document.querySelector('#precoTotal');
  
            // Preencher os elementos na modal com os dados retornados
            dataElement.innerHTML = `<strong>Data:</strong> ${data.sales.data}`;
            clienteElement.innerHTML = `<strong>Cliente:</strong> ${data.sales.cliente.nome}`;
  
            // Limpar a tabela de produtos
            produtosTable.innerHTML = `
              <tr>
                <th>Produtos comprados</th>
                <th>Quantidade</th>
              </tr>
            `;
  
            // Adicionar linhas à tabela para os produtos comprados
            data.itens.forEach(item => {
              if(item.saleId == vendaId) {
                console.log(item)
                produtosTable.innerHTML += `
                <tr>
                  <td>${item.produto.nome_produto}</td>
                  <td>${item.quantity}</td>
                </tr>
              `;
              }
            });
            
            precoTotal.innerHTML = `<strong>Total:</strong> R$ ${data.sales. preco_venda}`;

            // Abrir a modal
            document.getElementById('detalhesModal').modal('show');
          })
          .catch(error => {
            console.error('Erro ao obter detalhes da venda', error);
          });
      });
    });
  });
  