//Funcionalidade da janela de perfil
const menuPerfil = document.getElementById('windowUser')
function openPerfil(){
    menuPerfil.classList.add('ativeUser')
}
menuPerfil.addEventListener('click', (element) => {
    if(element.target.id === 'close'){
        menuPerfil.classList.remove('ativeUser')
    }
})
