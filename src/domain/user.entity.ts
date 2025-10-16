import { IsString } from 'class-validator';
import { nanoid } from 'nanoid';
import { UserProfile } from './user-profile.entity';

type RestoreUser = {
  id: string;
  username: string;
  password: string;
};

type CreateUser = Omit<RestoreUser, 'id'>;

export class User {
  @IsString()
  id: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  profile: UserProfile | null = null;

  private constructor(user: RestoreUser) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;

    this.initProfile();
  }

  static create(user: CreateUser) {
    return new User({
      id: nanoid(),
      username: user.username,
      password: user.password,
    });
  }

  static from(user: RestoreUser) {
    return new User({
      id: user.id,
      username: user.username,
      password: user.password,
    });
  }

  public toJSON() {
    return {
      id: this.id,
      username: this.username,
      profile: this.profile?.toJSON(),
    };
  }

  public changeUsername(other: string): void {
    this.username = other;
  }

  public changeProfileData(other: { displayName?: string; summary?: string }) {
    if (this.profile) {
      this.profile.displayName = other.displayName ?? this.profile.displayName;
      this.profile.summary = other.summary ?? this.profile.summary;
    }
  }

  private initProfile(): void {
    const profile = UserProfile.create({
      displayName: this.username,
      summary: `Hello, I'm ${this.username}! Welcome to my profile!`,
    });

    this.profile = profile;
  }
}
