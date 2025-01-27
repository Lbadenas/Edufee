import { Module } from '@nestjs/common';
import { FilesUserService } from './filesUser.service';
import { FilesUserController } from './filesUser.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Institution } from '../institution/institution.entity';
import { FilesInstitutionService } from './filesInstitution.service';
import { FilesInstitutionController } from './filesInsitution.controller';

import { FilesRepository } from './files.repository';
import { CloudinaryConfig } from 'src/config/cloudinary';

@Module({
  imports: [TypeOrmModule.forFeature([User, Institution])],
  providers: [
    FilesUserService,
    FilesInstitutionService,
    FilesRepository,
    CloudinaryConfig,
  ],
  controllers: [FilesUserController, FilesInstitutionController],
})
export class FilesModule {}
