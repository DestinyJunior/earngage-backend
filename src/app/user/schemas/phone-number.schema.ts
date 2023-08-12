import { Prop } from '@nestjs/mongoose';

export class Country {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  shortCode: string;
}

export class PhoneNumberField {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  number: string;

  @Prop({ required: true })
  country: Country;
}
