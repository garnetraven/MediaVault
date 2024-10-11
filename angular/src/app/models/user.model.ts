import { Media } from '../models/media.model';

export interface User {
  id: number;
  username: string;
  password: string;
  media?: Media[]
}
