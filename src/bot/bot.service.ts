import { Injectable } from '@nestjs/common';
import { AppConfigService } from 'src/config/config.service';
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { Item } from './interfaces/item.interface';

@Injectable()
export class BotService {
  constructor(private apConfigService: AppConfigService) {}

  async getAllRows(): Promise<GoogleSpreadsheetRow[]> {
    return await (await this.connectSheet()).getRows();
  }

  async addItem(item: Item) {
    const { amount, symbols, name, sum } = item;
    await (
      await this.connectSheet()
    ).addRow({
      date: new Date().toLocaleDateString(),
      amount,
      symbols,
      name,
      sum,
    });

    return symbols / 1000 * amount
  }

  private async connectSheet() {
    const doc = new GoogleSpreadsheet(this.apConfigService.sheet_id);
    try {
      await doc.useServiceAccountAuth({
        client_email: this.apConfigService.client_email,
        private_key: this.apConfigService.private_key,
      });
      await doc.loadInfo();
      const sheet = doc.sheetsByIndex[0];
      return sheet;

      //  await sheet.addRow({
      //    date: new Date().toLocaleDateString(),
      //    amount: 45,
      //    symbols: 3245,
      //    name: 'Тестовое еще раз',
      //  });
    } catch (error) {
      console.log('error', error);
    }
  }
}
