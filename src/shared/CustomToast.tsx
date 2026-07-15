import { toast } from 'sonner';

type ToastType = 'success' | 'error';

const CustomToast = (type: ToastType, title: string, description?: string) => {
  if (type === 'success') {
    toast.success(title, {
      description,
      className:
        'bg-primary-light border border-primary/20 text-primary-dark font-heading shadow-sm',
      descriptionClassName: 'text-primary-dark/80 font-body text-sm',
    });
  }

  if (type === 'error') {
    toast.error(title, {
      description,
      className:
        'bg-danger-light border border-danger/20 text-danger-dark font-heading shadow-sm',
      descriptionClassName: 'text-danger-dark/80 font-body text-sm',
    });
  }
};

export default CustomToast;
