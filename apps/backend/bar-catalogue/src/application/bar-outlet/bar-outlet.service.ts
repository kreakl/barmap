import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address, Bar, BarOutlet, Photo } from '@catalogue/domain/entities';
import { In, Repository } from 'typeorm';
import { PaginatedDto } from '@bar-map/shared';
import { BarOutletQuery } from '@catalogue/application/bar-outlet/ports/bar-outlet.query';
import { isEmpty } from 'lodash';

@Injectable()
export class BarOutletService {
  constructor(
    @InjectRepository(BarOutlet)
    private readonly outletRepository: Repository<BarOutlet>,
  ) {}

  async findAll(outletQueryParams: BarOutletQuery) {
    const { skip, typeIds, ...paginatedParams } = outletQueryParams;
    const { pageSize, order } = paginatedParams;

    const queryBuilder = this.outletRepository
      .createQueryBuilder('outlet')
      .skip(skip)
      .take(pageSize)
      .orderBy('outlet.id', order);

    if (typeIds && !isEmpty(typeIds)) {
      queryBuilder
        .leftJoin('outlet.bar', 'bar')
        .leftJoin('bar.types', 'type')
        .groupBy('outlet.id')
        .having(
          `array_agg(type.id)::INTEGER[] @> ARRAY[:...typeIds]::INTEGER[]`,
          {
            typeIds: typeIds,
          },
        );
    }

    const [outlets, itemCount] = await queryBuilder.getManyAndCount();

    return new PaginatedDto(outlets, { itemCount, paginatedParams });
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
