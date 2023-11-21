export interface UseCase<I, O> {
  execute(dto: I): Promise<O>;
}
