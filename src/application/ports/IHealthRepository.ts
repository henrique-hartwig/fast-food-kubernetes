
export interface IHealthRepository {
  ping(): Promise<boolean>;
}
