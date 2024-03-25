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
    const outletsWithAddresses = await this.outletRepository.find({
      select: {
        id: true,
      },
      relations: ['address', 'address.state'],
      where: {
        id: In(outletIds),
      },
    });

    return outletsWithAddresses.map((outlet) => outlet.address);
  }
}
