import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { addMilliseconds, differenceInMilliseconds } from 'date-fns';
import { nanoid } from 'nanoid';

type RestorePadProps = {
  id: string;
  userId?: string;
  content: string;
  expiresIn: number; // milliseconds
  createdAt: Date;
};

type CreatePadProps = Omit<RestorePadProps, 'id' | 'createdAt'>;

export class Pad {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  @MaxLength(1000)
  content: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  expiresIn: number;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  private constructor(props: RestorePadProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.content = props.content;
    this.expiresIn = props.expiresIn;
    this.createdAt = props.createdAt;
  }

  static create(props: CreatePadProps): Pad {
    return new Pad({
      id: nanoid(21),
      userId: props.userId,
      content: props.content,
      expiresIn: props.expiresIn,
      createdAt: new Date(),
    });
  }

  static from(props: RestorePadProps): Pad {
    return new Pad(props);
  }

  get msUntilExpiration() {
    const today = new Date();
    return Math.max(differenceInMilliseconds(this.endAt, today), 0);
  }

  get endAt() {
    return addMilliseconds(this.createdAt, this.expiresIn);
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      content: this.content,
      expiresIn: this.expiresIn,
    };
  }
}
