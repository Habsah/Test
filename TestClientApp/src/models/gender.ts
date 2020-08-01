import { Pipe, PipeTransform } from '@angular/core';

export enum Gender {
    unspecified,
    male,
    female
}

@Pipe({ name: 'gender' })
export class GenderPipe implements PipeTransform {
    transform(value: number): string {
        switch (value) {
            case Gender.unspecified:
                return "غير محدد";
            case Gender.male:
                return "ذكر";
            case Gender.female:
                return "أنثى";
            default:
                return '';
        }
    }
} 
