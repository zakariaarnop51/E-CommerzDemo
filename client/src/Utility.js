import Swalow from 'sweetalert2';
export const isValidObjectId = (id) => typeof id === 'string' && id.trim().length === 24;
export const unauthorized=(code)=>{
    if(code === 401){
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = '/login';
    }
   
}
export const setEmail = (email) => {
    sessionStorage.setItem('email', email);
};

export const getEmail = () => {
    return sessionStorage.getItem('email');
}
export const showAlert = (title, text, icon) => {
    Swalow.fire({
        title: ,
        text: text,
        icon: icon,
        confirmButtonText: 'OK',
        customClass: {
            confirmButton: 'btn btn-primary'
        }
    });
}
