const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnZapatos = document.querySelector('.zapatos');
const btnConjuntos = document.querySelector('.conjuntos');
const btnGorras = document.querySelector('.gorras');
const contenedorProductos = document.querySelector('.productos');

document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    productos();
})

const eventos = () =>{
    menu.addEventListener('click', abrirMenu);
}

const abrirMenu = () =>{
    navegacion.classList.remove('ocultar');
    botonCerrar();
}

const botonCerrar = ()=>{
    const btnCerrar = document.createElement('p');
    if(document.querySelectorAll('pantalla-completa').length > 0)return;
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');
    
    while(navegacion.children[5]){
        navegacion.removeChild(navegacion.children[5]);
    }
    
    navegacion.appendChild(btnCerrar);
    cerrarMenu(btnCerrar);
}

const observer = new IntersectionObserver((entries, observer)=>{
   entries.forEach(entry=>{
      if(entry.isIntersecting){
          const imagen = entry.target;
		  imagen.src = imagen.dataset.src;
          observer.unobserve(imagen);
      }
   }); 
});


imagenes.forEach(imagen=>{
   observer.observe(imagen);
});

const cerrarMenu = (boton) =>{
    boton.addEventListener('click',()=>{
        navegacion.classList.add('ocultar');
       
    });  
}

const productos = () =>{
    let productosArreglo = [];
    const productos = document.querySelectorAll('.producto');
    
    productos.forEach(producto=> productosArreglo = [...productosArreglo,producto]);
    
    const zapatos = productosArreglo.filter(zapato=> zapato.getAttribute('data-producto') === 'zapato');
    const conjuntos = productosArreglo.filter(conjunto=> conjunto.getAttribute('data-producto') === 'conjunto');
    const gorras = productosArreglo.filter(gorra=> gorra.getAttribute('data-producto') === 'gorra');
    
    mostrarProductos(zapatos, conjuntos, gorras, productosArreglo);
}

const mostrarProductos = (zapatos, conjuntos, gorras, todos) =>{
    btnZapatos.addEventListener('click', ()=>{
       limpiarHtml(contenedorProductos);
       zapatos.forEach(zapato=> contenedorProductos.appendChild(zapato)); 
    });
	   btnConjuntos.addEventListener('click', ()=>{
       limpiarHtml(contenedorProductos);
       conjuntos.forEach(conjunto=> contenedorProductos.appendChild(conjunto)); 
    });
	   btnGorras.addEventListener('click', ()=>{
       limpiarHtml(contenedorProductos);
       gorras.forEach(gorra=> contenedorProductos.appendChild(gorra)); 
    });
	btnTodos.addEventListener('click',()=>{
		limpiarHtml(contenedorProductos);
		todos.forEach(todo=> contenedorProductos.appendChild(todo));
	});
}

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}






