import { toast } from 'react-toastify';

const notifyWallet = (toasts) => {
  if (!toast.isActive(toasts.confirm)) {
    toasts.confirm = toast('Confirm and send the 0DNA transaction.');
  } else if (!toast.isActive(toasts.faq)) {
    toasts.faq = toast('If you are having issues, please see the FAQ');
  }
  setTimeout(function () {
    if (!toast.isActive(toasts.time)) {
      toasts.time = toast(
        'Your question can take up to 60s to show on the website.'
      );
    }
  }, 5000);
  return toasts;
};

module.exports = { notifyWallet };
