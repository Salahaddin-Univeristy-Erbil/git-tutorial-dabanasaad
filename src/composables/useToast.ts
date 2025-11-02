import { ref } from 'vue';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

const toasts = ref<Toast[]>([]);
let id = 0;

export function useToast() {
  const show = (message: string, type: Toast['type'] = 'info') => {
    const toast: Toast = { id: id++, message, type };
    toasts.value.push(toast);

    setTimeout(() => {
      remove(toast.id);
    }, 3000);
  };

  const success = (message: string) => show(message, 'success');
  const error = (message: string) => show(message, 'error');
  const info = (message: string) => show(message, 'info');

  const remove = (id: number) => {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  return {
    toasts,
    show,
    success,
    error,
    info,
    remove,
  };
}
