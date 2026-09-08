import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ADDRESSBOOK_NAME_MAX_LENGTH } from './upsert-contact.dto';

/**
 * DTO for the phone-number-keyed upsert route. The caller supplies a bare MSISDN number
 * (no `@c.us`, no leading `+`) and the addressbook name; the controller qualifies the
 * number before it reaches the engine.
 */
export class UpsertContactByNumberDto {
  @ApiProperty({
    description: 'MSISDN digits without a leading `+` or any separators (min 5 digits).',
    example: '628123456789',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{5,}$/, {
    message: 'number must be at least 5 digits with no separators',
  })
  number!: string;

  @ApiProperty({
    description: "The contact's first name.",
    maxLength: ADDRESSBOOK_NAME_MAX_LENGTH,
    example: 'Jane',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(ADDRESSBOOK_NAME_MAX_LENGTH)
  firstName!: string;

  @ApiPropertyOptional({
    description: "The contact's last name. Omit for a single-name contact.",
    maxLength: ADDRESSBOOK_NAME_MAX_LENGTH,
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(ADDRESSBOOK_NAME_MAX_LENGTH)
  lastName?: string;
}
