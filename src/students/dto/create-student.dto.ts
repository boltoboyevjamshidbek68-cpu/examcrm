export class CreateStudentDto {
  readonly firstName!: string;
  readonly lastName?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly groupId?: number;
}
