import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Bar, BarOutlet, BarType, Franchise } from '../../domain/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedDto } from '@bar-map/shared';
import { BarQuery } from '@catalogue/application/bar/ports/bar.query';
import { isEmpty } from 'lodash';

@Injectable()
export class BarService {
  constructor(
    @InjectRepository(Bar)
    private readonly barRepository: Repository<Bar>,
  ) {}

  async findAll(barQueryParams: BarQuery) {
    const { typeIds, skip, ...paginatedParams } = barQueryParams;
    const { pageSize, order } = paginatedParams;

    const queryBuilder = this.barRepository
      .createQueryBuilder('bar')
      .skip(skip)
      .take(pageSize)
      .orderBy('bar.id', order);

    if (typeIds && !isEmpty(typeIds)) {
      queryBuilder
        .leftJoin('bar.types', 'type')
        .groupBy('bar.id')
        .having(
          `array_agg(type.id)::INTEGER[] @> ARRAY[:...typeIds]::INTEGER[]`,
          {
            typeIds: typeIds,
          },
        );
    }

    const [bars, itemCount] = await queryBuilder.getManyAndCount();

    return new PaginatedDto(bars, { itemCount, paginatedParams });
  }

  async findById(id: number) {
    return this.barRepository.findOneBy({
      id,
    });
  }

  mapEntriesToIds(
    bars: readonly Bar[],
    barIds: readonly number[],
    relation: keyof Bar,
  ) {
    const entriesMap = new Map(bars.map((bar) => [bar.id, bar[relation]]));

    return barIds.map((id) => entriesMap.get(id));
  }

  async findBarOutletsByBatch(barIds: readonly number[]) {
    const barsWithOutlets = await this.barRepository.find({
      select: {
        id: true,
      },
      relations: [
        'outlets',
        'outlets.address',
        'outlets.address.state',
        'outlets.photos',
      ],
      where: {
        id: In(barIds),
      },
    });

    return this.mapEntriesToIds(
      barsWithOutlets,
      barIds,
      'outlets',
    ) as BarOutlet[][];
  }

  async findBarTypesByBatch(barIds: readonly number[]) {
    const barsWithTypes = await this.barRepository.find({
      select: {
        id: true,
      },
      relations: ['types', 'types.category'],
      where: {
        id: In(barIds),
      },
    });

    return this.mapEntriesToIds(barsWithTypes, barIds, 'types') as BarType[][];
  }

  async findBarFranchiseByBatch(barIds: readonly number[]) {
    const barsWithFranchise = await this.barRepository.find({
      select: {
        id: true,
      },
      relations: ['franchise'],
      where: {
        id: In(barIds),
      },
    });

    return this.mapEntriesToIds(
      barsWithFranchise,
      barIds,
      'franchise',
    ) as Franchise[];
  }
}
