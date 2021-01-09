import User from '../../models/User';
import UsersRepository from '../../repositories/Users/UsersRepository';

import StorageProvider from '../../providers/StorageProvider';

interface IRequest {
  id: string;
  image: string;
}

export default class ChangeProfileImageService {
  public async run({id, image}: IRequest): Promise<User> {
    const usersRepository = new UsersRepository();
    const storageProvider = new StorageProvider();

    const user = await usersRepository.findById(id);
    if(!user) throw new Error("Invalid user");

    if(user.image) 
      await storageProvider.deleteFile(user.image);

    const changedImage = await storageProvider.saveFile(image);

    user.image = changedImage;

    return usersRepository.save(user);
  }
}