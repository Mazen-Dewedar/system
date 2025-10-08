

if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify([]))
}
let finalProducts = JSON.parse(localStorage.getItem('products'))

let table = document.querySelector('.container table tbody')
let button = document.querySelector('#button1')
let indexProducts = null;
let open = true;
let showProducts = () => {
    if (open == true) {
        table.innerHTML = '';
        finalProducts.forEach((el, index) => {
            let row = ` 
                <tr>
                    <th>${index + 1}</th>
                    <th>${el.name}</th>
                    <th>${el.price}</th>
                    <th>${el.qty}</th>
                    <th>
                        <button class="btn btn-warning" onclick="openWindow2(${index})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteItem(${index})">Delete</button>
                    </th>
                </tr>
                `
            table.innerHTML += row;
        });
        button.innerText = 'close Products';
        open = false;
    } else {
        button.innerText = 'show Products';
        table.innerHTML = '';
        open = true;
    }

}

let deleteItem = (index) => {
    Swal.fire({
        title: "Do you want to delete this product ?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: "Yes",
        CancelButtonColor: "red"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("Deleted", "", "success");
            finalProducts.splice(index, 1);
            localStorage.setItem('products', finalProducts);
            open = true;
            showProducts();
        }
    });
}

let Name = document.querySelector('#name')
let Price = document.querySelector('#price')
let Qty = document.querySelector('#qty')
let modal = document.querySelector('.modall')

let openWindow = () => {
    modal.classList.replace("d-none", "d-flex")
}

let closeWindow = () => {
    modal.classList.replace("d-flex", "d-none")
}
let addProducts = () => {
    let newProduct = {
        name: Name.value,
        price: +Price.value,
        qty: +Qty.value,
    }
    Name.value = '';
    Price.value = '';
    Qty.value = '';
    finalProducts.push(newProduct);
    localStorage.setItem('products', JSON.stringify(finalProducts))
    swal.fire({
        title: 'product was added successfully',
        icon: 'success',
    })
    closeWindow();
    open = true;
    showProducts();
}

let Name2 = document.querySelector('#name2')
let Price2 = document.querySelector('#price2')
let Qty2 = document.querySelector('#qty2')
let modal2 = document.querySelector('.modall2')
let openWindow2 = (index) => {
    indexProducts = index;
    modal2.classList.replace("d-none", "d-flex")
    Name2.value = finalProducts[index].name
    Price2.value = finalProducts[index].price
    Qty2.value = finalProducts[index].qty
}

let closeWindow2 = () => {
    modal2.classList.replace("d-flex", "d-none")
}

let editProducts2 = () => {
    let newww = {
        name: Name2.value,
        price: Price2.value,
        qty: Qty2.value,
    }
    Name.value = '';
    Price.value = '';
    Qty.value = '';
    swal.fire({
        title: 'product was edited successfully',
        icon: 'success',
    })
    finalProducts[indexProducts] = newww;
    localStorage.setItem('products', JSON.stringify(finalProducts))
    closeWindow2();
    open = true;
    showProducts();
}