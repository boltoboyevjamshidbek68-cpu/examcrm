import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(private dataSource: DataSource) {}

  async getStats() {
    const totalStudents = await this.dataSource.getRepository('student').count().catch(()=>0);
    const totalPayments = await this.dataSource.getRepository('payment').count().catch(()=>0);
    const sumPayments = await this.dataSource.query("SELECT COALESCE(SUM(amount),0) as total FROM payment").catch(()=>[{total:0}]);
    const totalInvoices = await this.dataSource.getRepository('invoice').count().catch(()=>0);
    return {
      totalStudents,
      totalPayments,
      sumPayments: sumPayments[0]?.total || 0,
      totalInvoices,
    };
  }
}
