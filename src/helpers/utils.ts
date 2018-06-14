import { LoadingController, Loading, ToastController } from 'ionic-angular';

export class Utils {

  static getLoading(k: LoadingController): Loading {
    let loading = k.create({
      content: 'Please wait...'
    });
    loading.present();
    return loading;
  }

  static showToast(msg: string, k: ToastController) {
    const toast = k.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}