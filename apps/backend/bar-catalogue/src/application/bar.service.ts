import { Injectable } from '@nestjs/common';
import { BarRepository } from './ports/bar.repository';

@Injectable()
export class BarService {
  constructor(private readonly barRepository: BarRepository) {}

  findAll() {
    return this.barRepository.findAll();
  }
}
