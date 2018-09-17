import { Injectable } from '@nestjs/common';
import { ClientUserDto, DataUserDto } from './user.dto';

// 模拟获取数据时的延时状态
const getDataDelay = <T>(data: T, delay = 500): Promise<T> => new Promise((resolve) => {
  setTimeout(() => resolve(data), delay);
});

@Injectable()
export class UserService {

  private users: DataUserDto[] = [{
    id: 1,
    name: 'gogo',
    password: '123456'
  }];

  getAllUsers() {
    return getDataDelay(this.users);
  };

  getUser(id: number) {
    return getDataDelay(this.users.find(user => {
      return user.id === id;
    }));
  };

  async createUser(user: ClientUserDto) {
    const id = await this.getNewUserId();
    this.users.push({ id, ...user });
    return `${user.name} created!`;
  };

  async getNewUserId() {
    const allUsers = await this.getAllUsers();
    return allUsers[allUsers.length - 1].id + 1;
  }
}
