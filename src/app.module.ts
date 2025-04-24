import { Module } from '@nestjs/common';
import { BasicModule } from './presentation/basic/basic.module';

@Module({
  imports: [BasicModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
