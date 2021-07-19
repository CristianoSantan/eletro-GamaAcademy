const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let nome = document.getElementById('nome').value;
  let email = document.getElementById('email').value;
  let data = {
    nome,
    email,
  };

  let convertData = JSON.stringify(data);

  localStorage.setItem('lead', convertData);

  let content = document.getElementById('form');

  let carregando = `<p>carregando...</p>`;

  let pronto = `<p>pronto...</p>`;

  content.innerHTML = carregando;

  setTimeout(() => {
    content.innerHTML = pronto;
  }, 2000);
});

// products

function createCard(data) {
  var html = data
    .map(
      (item) => `
      <div class="card">
          <div class="img-card">
            <img src="./img/${item.image}" alt="product" />
          </div>
          <div class="descricao">
            <p>${item.title}</p>
            <p>${item.description}</p>
            <p><span>De R$ ${item.oldPrice},00</span> Por R$ ${item.price},00</p>
            
            <button class="btn">Comprar</button>
          </div>
        </div>`
    )
    .join('');
  document.querySelector('#cards').innerHTML += html;
}

// -------------------------------- Get Products
const getProducts = async () => {
  try {
    const results = await fetch('./data/products.json');
    const data = await results.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const main = async () => {
  let data = await getProducts();
  createCard(data.products);
};

main();
