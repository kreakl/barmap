import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BarOutlet } from '@catalogue/domain/entities';
import { In, Repository } from 'typeorm';

@Injectable()
export class BarOutletService {
  constructor(
    @InjectRepository(BarOutlet)
    private readonly outletRepository: Repository<BarOutlet>,
  ) {}

  async findAll() {
    return this.outletRepository.find();
  }

  async findById(id: number) {
    return this.outletRepository.findOneBy({
      id,
    });
  }

  async findOutletAddressByBatch(outletIds: readonly number[]) {
    const outletsWithAddress = await this.outletRepository.find({
      select: {
        id: true,
      },
      relations: ['address', 'address.state'],
      where: {
        id: In(outletIds),
      },
    });

    return outletsWithAddress.map((outlet) => outlet.address);
  }

  async findOutletBarByBatch(outletIds: readonly number[]) {
    const outletsWithBar = await this.outletRepository.find({
      select: {
        id: true,
      },
      relations: ['bar', 'bar.types', 'bar.franchise'],
      where: {
        id: In(outletIds),
      },
    });

    return outletsWithBar.map((outlet) => outlet.bar);
  }

  async findOutletPhotosByBatch(outletIds: readonly number[]) {
    const outletPhotos = await this.outletRepository.find({
      select: {
        id: true,
      },
      relations: ['photos'],
      where: {
        id: In(outletIds),
      },
    });

    return outletPhotos.map((outlet) => outlet.photos);
  }
}
