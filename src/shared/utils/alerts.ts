import Swal, { type SweetAlertIcon } from 'sweetalert2';


export const sweetAlert = (title: string, text: string, icon: SweetAlertIcon) => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonColor: '#0B4D6C', // Adaptado a tus colores
  });
};


export const sweetAlertInfo = (text: string) => {
  return sweetAlert('Información', text, 'info');
};


export const sweetAlertSuccess = (text: string) => {
  return sweetAlert('Exitoso', text, 'success');
};


export const sweetAlertError = (text: string) => {
  return sweetAlert('Error', text, 'error');
};


export const sweetToast = (title: string, icon: SweetAlertIcon, timer: number = 3000) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  return Toast.fire({
    icon,
    title
  });
};


export const sweetImageUrl = (title: string, text: string, imageUrl: string) => {
  return Swal.fire({
    title,
    text,
    imageUrl,
    imageWidth: 400,
    imageHeight: 400,
    confirmButtonColor: '#0B4D6C',
    customClass: {
      image: 'rounded-full object-cover shadow-lg border border-gray-200' 
    }
  });
};


export const sweetConfirm = async (title: string, text: string, confirmText: string = 'Sí, continuar') => {
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#0B4D6C',
    cancelButtonColor: '#d33',
    confirmButtonText: confirmText,
    cancelButtonText: 'Cancelar'
  });
};