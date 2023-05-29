import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }
  sweetAlertSuccess(message:string): void {
    Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        popup: 'colored-toast'
      },
    }).fire({
      icon: 'success',
      title: message
    });
    
}
sweetAlertError(message:string): void {
  Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      popup: 'colored-toast'
    },
  
  }).fire({
    icon: 'error',
    title: message
  });
  
}
}
