import { Injectable } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class AppService {
  async getHello(i81n: I18nContext) {
    return await i81n.t('main.hello');
  }
}
