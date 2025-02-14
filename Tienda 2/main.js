window.onload = function(){

    let BI, RDR, HMCC, GOW;

    let baseDeDatos = [
        {
            id : 1,
            nombre: 'Bioshock Infinite (X360)',
            precio: 350.00,
            imagen: 'img/Bio.jpg'
        },
        {
            id: 2,
            nombre: 'Read Dead Redemption II',
            precio: 1900.00,
            imagen: 'img/RDR2.jpg'
        },
        {
            id: 3,
            nombre: 'Halo Master Chief Collection',
            precio: 1500.00,
            imagen: 'img/Halo.jpg'
        },
        {
            id: 4,
            nombre: 'God of War',
            precio: 500.00,
            imagen: 'img/GOW.jpg'
        }
    ]

    let $items = document.querySelector('#items');
    let carrito = [];
    let total = 0;
    let $carrito = document.querySelector('#carrito');
    let $total = document.querySelector('#total');

    function renderItems (){
        for (let info of baseDeDatos){

            let miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');

            let miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-doby');

            let miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info['nombre'];

            let miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('imgs');
            miNodoImagen.setAttribute('src', info['imagen']);

            let miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = '$' + info['precio'];

            let miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info['id']);
            miNodoBoton.addEventListener('click', aniadirCarrito);

            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            $items.appendChild(miNodo);
        }
    }

    function aniadirCarrito(){
        carrito.push(this.getAttribute('marcador'))
        calcularTotal();
        renderizarCarrito();
    }

    function renderizarCarrito(){

        $carrito.textContent = '';
        let carritoSinDuplicados = [...new Set(carrito)];

        carritoSinDuplicados.forEach(function (item, indice){
            let miItem = baseDeDatos.filter(function(itemBaseDatos){
                return itemBaseDatos['id'] == item
            });

            let numeroUnidadesItem = carrito.reduce(function (total, itemId){
                return itemId === item ? total += 1 : total;
            }, 0);

            let miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0]['nombre']} -> $${miItem[0]['precio']}`;

            let miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.setAttribute('item', item);
            miBoton.addEventListener('click', borrarItemCarrito);

            miNodo.appendChild(miBoton);
            $carrito.appendChild(miNodo);
        })
    }

    function borrarItemCarrito(){
        console.log()
        let id = this.getAttribute('item');

        carrito = carrito.filter(function (carritoId){
            return carritoId !== id;
        });

        renderizarCarrito();
        calcularTotal();
    }

    function calcularTotal(){
        total = 0;

        for(let item of carrito){
            let miItem = baseDeDatos.filter(function(itemBaseDatos){
                return itemBaseDatos['id'] == item;
            });
            total = total + miItem[0]['precio'];
        }

        let totalDosDecimales = total.toFixed(2);
        $total.textContent = totalDosDecimales;

        if (total == 350) {
            BI = 350;
        }
        else if (total == 700) {
            BI = 700;
        }

        else if (total == 1900) {
            RDR = 1900;
        }
        else if (total == 3800) {
            RDR = 3800;
        }

        else if (total == 1500) {
            HMCC = 1500;
        }
        else if (total == 3000) {
            HMCC = 3000;
        }

        else if (total == 500) {
            GOW = 500;
        }
        else if (total == 1000){
            GOW = 1000;
        }

        else if (total == 4250) {
            BI = 350;
            RDR = 1900;
            HMCC = 1500;
            GOW = 500;
        }
        else if (total == 8500) {
            BI = 700;
            RDR = 3800;
            HMCC = 3000;
            GOW = 1000;
        }

        else if (total == 2250) {
            BI = 350;
            RDR = 1900;
        }

        else if (total == 1850) {
            BI = 350;
            HMCC = 1500;
        }

        else if (total == 850) {
            BI = 350;
            GOW = 500;
        }

        else if (total == 3400) {
            RDR = 1900;
            HMCC = 1500;
        }
    }

    renderItems();

    $(".graficar").click(function(){
        let Graficas = document.getElementById("Grafica");
    
        var chart = new Chart(Graficas,{
            type:"bar",
            data:{
                labels:["Bioshock Infinite (X360)","Red Dead Redemption II", "Halo Master Chief Collection", "God of War"],
                datasets:[
                    {
                        label:"Gráfica de Productos",
                        backgroundcolor:"rgb(0,0,0)",
                        data:[BI, RDR, HMCC, GOW]
                    }
                ]
            }
        })
    });
}

