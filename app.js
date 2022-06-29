require('colors');
// console.clear();

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {
    inquirerMenu,
    pausar,
    leerInput,
    listadoTareasBorra,
    confirmar,
    mostrarListadoCheckList
} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
// const { mostrarMenu, pausar } = require('./helpers/mensajes');

const main = async () => {
    console.log('Starting app...'.green);
    let option = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }


    do {
        // imprime un menu
        option = await inquirerMenu();
        switch (option) {
            case '1':
                // Crear opciones
                const desc = await leerInput('Descripción: ');
                tareas.createTask(desc);
                break;
            case '2':
                tareas.listadoCompleto()
                break;
            case '3':
                tareas.listarPendientesCompletadas(true)
            break;
            case '4':
                tareas.listarPendientesCompletadas(false)
            break;
            case '5':
                
                const ids = await mostrarListadoCheckList(tareas.listadoArr)
                tareas.toggleCompletadas(ids)

            break;
            case '6':
                const id = await listadoTareasBorra(tareas.listadoArr)
                if (id !== '0'){
                    const ok = await confirmar('Estas seguro?')
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada!')
                    }
                }
            break;
        }

        guardarDB(tareas.listadoArr)

        await pausar();
    } while (option !== '0');
}


main();