
'use strict'

document.addEventListener('DOMContentLoaded', async () => {

    await cargarPagina('./resources/views/inicio.html', '#contenido')

    const menu = document.querySelector('#menu-desplegable + ul')
    const opciones = document.querySelectorAll('#menu-desplegable + ul > li') //Selecciona todos los elementos li que son hijos de ul.
    opciones.forEach(opcion => opcion.addEventListener('click', e => cargarOpcion(e)))

    document.querySelector('#menu-desplegable').addEventListener('click', e => {
        menu.classList.toggle('flex-column')
    })
})

async function cargarOpcion(e) {
    e.preventDefault() // Permite prevenir la ejecución del evento clic por defecto. 

    switch (e.target.textContent.toLowerCase()) {
        case 'empresas transportadoras':
            await cargarPagina('./resources/views/empresas.html', '#contenido')
            break
        case 'destinos de la terminal':
            await cargarPagina('./resources/views/destinosT.html', '#contenido')
            break
        case 'destinos de las empresas':
            await cargarPagina('./resources/views/destinosE.html', '#contenido')
            await loadDestinosEmpresas()
            
            break
        case 'conductores de las empresas':
            await cargarPagina('./resources/views/conductores.html', '#contenido')
            break
        case 'vehículos de las empresas':
            await cargarPagina('./resources/views/vehiculos.html', '#contenido')
            break
        case 'salidas de los vehículos':
            await cargarPagina('./resources/views/salidaV.html', '#contenido')
            break
        case 'venta online':
            await cargarPagina('./resources/views/ventaOn.html', '#contenido')
            break
        case 'venta en taquilla':
            await cargarPagina('./resources/views/ventaOff.html', '#contenido')
            break
        case 'iniciar sesión':
            await cargarPagina('./resources/views/login.html', '#contenido')
            break

        default:
            await cargarPagina('./resources/views/inicio.html', '#contenido')
    }

}

async function cargarPagina(url, contenedor) {
    const respuesta = await fetch(url)

    if (respuesta.ok) {
        const html = await respuesta.text()
        document.querySelector(contenedor).innerHTML = html
        return
    }
    console.log("Tenemos problemas Houston");
    throw new Error(`${respuesta.status} - ${respuesta.statusText}`)
    
}

async function fetchData(url, data = {}) {

    if (Object.entries(data).length > 0) {
        if (!('headers' in data)) {
            data.headers = {
                'Content-Type': 'application/json'
            }
        }

        if ('body' in data) {
            data.body = JSON.stringify(data.body)
        }
    }

    const respuesta = await fetch(url, data)

    if (!respuesta.ok) {
        throw new Error(`${respuesta.status} - ${respuesta.statusText}`)
    }

    return await respuesta.json()

}

function llenarSelect(selector, items = [], value = '', text = '') {
    let list = document.querySelector(selector)
    list.options.length = 0
    items.forEach(item => list.add(new Option(item[text], item[value])))
    return list // Se retorna para generar encadenamiento
}

async function loadDestinosEmpresas() {
    const destinos = await fetchData('./data/destEmpresas.json')
    llenarSelect('#destinosT', destinos, 'code', 'destino')

    const empresas = await fetchData('/data/empresas.json')
    const empresasList = llenarSelect('#nombre-empresa', empresas, 'code', 'nombre')
}
