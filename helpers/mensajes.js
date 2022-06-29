require('colors');

const mostrarMenu = () => {

    return new Promise((resolve) => {
        console.clear();
        console.log('==================='.green)
        console.log('  Select an option:'.green)
        console.log('===================\n'.green)
    
        console.log(`  ${ '1.'.green } Create task`)
        console.log(`  ${ '2.'.green } List task`)
        console.log(`  ${ '3.'.green } List task completed`)
        console.log(`  ${ '4.'.green } List task pending`)
        console.log(`  ${ '5.'.green } Complete task`)
        console.log(`  ${ '6.'.green } Delete task`)
        console.log(`  ${ '0.'.green } Exit\n`)
    
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question('Select an option: ', (option) => {
            readLine.close();
            resolve(option);
        })

    })

}


const pausar = () => {
    return new Promise((resolve) => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question(`Press ${'ENTER'} to continue`, (option) => {
            console.log(option)
            readLine.close();
            resolve();
        })

    })

}
module.exports = {
    mostrarMenu,
    pausar
}