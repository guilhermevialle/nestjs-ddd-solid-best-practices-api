import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { nanoid } from 'nanoid';

type RestoreProps = {
  id: string;
  displayName: string;
  summary: string;
};

type CreateProps = Omit<RestoreProps, 'id'>;

export class UserProfile {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  displayName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(600)
  summary: string;

  private constructor(props: RestoreProps) {
    this.id = props.id;
    this.displayName = props.displayName;
    this.summary = props.summary;
  }

  static create(props: CreateProps): UserProfile {
    return new UserProfile({
      id: nanoid(21),
      displayName: props.displayName,
      summary: props.summary,
    });
  }

  static from(props: RestoreProps): UserProfile {
    return new UserProfile({
      id: props.id,
      displayName: props.displayName,
      summary: props.summary,
    });
  }

  public toJSON() {
    return {
      displayName: this.displayName,
      summary: this.summary,
    };
  }
}
