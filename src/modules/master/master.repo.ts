import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { CouponDto } from './dtos/coupon.dto';
import { Connect } from './entities/connect.entity';
import { Coupon } from './entities/coupon.entity';
import { Referral } from './entities/referral.entity';

@Injectable()
export class MasterRepo {
  constructor(
    @InjectRepository(Connect)
    private readonly connectRepo: Repository<Connect>,
    @InjectRepository(Coupon)
    private readonly couponRepo: Repository<Coupon>,
    @InjectRepository(Referral)
    private readonly referralRepo: Repository<Referral>,
  ) {}
  async getCountries() {
    const entityManager = getManager();
    const rawQuery = `SELECT * FROM countries;`;
    const countries = await entityManager.query(rawQuery);
    return countries;
  }

  async getStates(countryId: number) {
    const entityManager = getManager();
    const rawQuery = `SELECT * FROM states s WHERE s.countryId = ${countryId};`;
    const states = await entityManager.query(rawQuery);
    return states;
  }

  async getCities(stateId: number) {
    const entityManager = getManager();
    const rawQuery = `SELECT * FROM cities c WHERE c.stateId = ${stateId};`;
    const cities = await entityManager.query(rawQuery);
    return cities;
  }

  async getCountry(countryId: number) {
    const entityManager = getManager();
    const rawQuery = `SELECT * FROM countries WHERE id = ${countryId}`;
    const countries = await entityManager.query(rawQuery);
    return countries[0];
  }

  async getState(stateId: number) {
    const entityManager = getManager();
    const rawQuery = `SELECT * FROM states s WHERE s.id = ${stateId};`;
    const states = await entityManager.query(rawQuery);
    return states[0];
  }

  async getCity(cityId: number) {
    const entityManager = getManager();
    const rawQuery = `SELECT * FROM cities c WHERE c.id = ${cityId};`;
    const cities = await entityManager.query(rawQuery);
    return cities[0];
  }

  async getConnectById(id: string) {
    return await this.connectRepo.findOne(id);
  }

  async getReferralById(id: string) {
    return await this.referralRepo.findOne(id);
  }

  async getCouponById(id: string) {
    return await this.couponRepo.findOne(id);
  }

  async createConnect(connectObj: Connect) {
    return await this.connectRepo.save(connectObj);
  }

  async createCoupon(couponObj: Coupon) {
    return await this.couponRepo.save(couponObj);
  }

  async createReferral(referralObj: Referral) {
    return await this.referralRepo.save(referralObj);
  }

  async updateConnect(connectObj: Connect) {
    return await this.connectRepo.save({ ...connectObj });
  }

  async updateCoupon(couponObj: Coupon) {
    return await this.couponRepo.save({ ...couponObj });
  }
  async deleteCoupon(couponObj: CouponDto) {
    return await this.couponRepo.delete(couponObj)
  }

  async getReferrals() {
    return await this.referralRepo.find();
  }

  async getConnects() {
    return await this.connectRepo.find({
      order: {
        createdAt: 'DESC'
      }
    });
  }

  async getCoupons() {
    return await this.couponRepo.find(
      {
        where: {
          isActive: 1
        }
      }
    );
  }

  async getCoupon(couponCode: string) {
    return await this.couponRepo.findOne({ where: { couponCode: couponCode } });
  }

  async updateReferral(referralObj: Referral) {
    return await this.referralRepo.save({ ...referralObj });
  }
}
