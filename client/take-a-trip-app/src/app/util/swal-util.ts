import Swal from 'sweetalert2';

export function swalSuccess(message: string) {
    Swal.fire({
        text: message,
        title: "Success",
        type: "success"
    });
}

export function swalError(message: string) {
    Swal.fire({
        text: message,
        title: "Error",
        type: "error"
    });
}

export function swalSuccessWithTimer(message: string, callback: any, timer = 2500) {
    Swal.fire({
        title: 'Success',
        type: 'success',
        text: message,
        timer: timer,
        onClose: () => {
            callback();
        }
    });
}