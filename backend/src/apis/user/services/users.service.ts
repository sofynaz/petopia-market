import { ConflictError } from '@repo/core';
import { inject, singleton } from 'tsyringe';
import { checkPassword } from '@/shared/utils';
import { USER_KEY, type UserModel } from '@/models';
import { NotFoundError, UnauthorizedError } from '@repo/core';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { Messages } from '@/constants';

@singleton()
export class UserService {
  constructor(
    @inject(USER_KEY)
    private userModel: UserModel,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userModel.findOne({
      $or: [{ email: username }, { username }],
    });
    // if user not found throw error
    if (!user) throw new NotFoundError(Messages.USER_NOT_REGISTER);

    // if user password not match throw error
    if (!checkPassword(password, user.password))
      throw new UnauthorizedError(Messages.INVALID_CREDENTIALS);

    return user;
  }

  async create(createDto: CreateUserDto) {
    const { username, email } = createDto;
    // find user using phone and email
    const user = await this.userModel.findOne({
      $or: [{ email }, { username }],
    });

    // if user account already exit
    if (user) throw new ConflictError(Messages.USER_ALREADY_REGISTER);

    // now create new user
    return await this.userModel.create(createDto);
  }

  async findAll(query: string, size: number, page: number) {
    const users = await this.userModel
      .find({
        $or: [{ username: query }, { email: query }],
      })
      .limit(size)
      .skip((page - 1) * size);
    // return users
    return users;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    // check user account exit or not
    if (!user) throw new NotFoundError(Messages.USER_NOT_FOUND);
    // return user account
    return user;
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);
    // check user account exit or not
    if (!user) throw new NotFoundError(Messages.USER_NOT_FOUND);
    // return user account
    return user;
  }

  async update(id: string, updateDto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    });
    // check user account exit or not
    if (!user) throw new NotFoundError('User account not found');
    // update user account
    return user;
  }
}
