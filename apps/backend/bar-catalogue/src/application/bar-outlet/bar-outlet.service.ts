import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address, Bar, BarOutlet, Photo } from '@catalogue/domain/entities';
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

  mapEntriesToIds(
    outlets: readonly BarOutlet[],
    outletsIds: readonly number[],
    relation: keyof BarOutlet,
  ) {
    const entriesMap = new Map(outlets.map((bar) => [bar.id, bar[relation]]));

    return outletsIds.map((id) => entriesMap.get(id));
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

    return this.mapEntriesToIds(
      outletsWithAddress,
      outletIds,
      'address',
    ) as Address[];
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

    return this.mapEntriesToIds(outletsWithBar, outletIds, 'bar') as Bar[];
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

    return this.mapEntriesToIds(outletPhotos, outletIds, 'photos') as Photo[][];
  }
}
