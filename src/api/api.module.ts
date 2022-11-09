import { Module } from '@nestjs/common';
import { OdataModule} from './odata/odata.module';
import { OrderModule} from './order/order.module';
import { UserModule} from './user/user.module';

@Module({
  imports: [OdataModule, OrderModule, UserModule],
})
export class ApiModule {}
